import { load } from "cheerio";
import { CapacitorHttp } from "@capacitor/core";

const formatSaldo = (amount: number | string) => (Number(amount) / 100).toFixed(2);

type ApiTransaction = {
  operador?: string;
  nombreTRX?: string;
  fecha_trx?: string;
  montoAbono?: number | string | null;
  montoDescuento?: number | string | null;
  estacion?: string;
};

const getTransactionDelta = (transaction: ApiTransaction) => {
  const abono = Number(transaction.montoAbono);
  if (Number.isFinite(abono) && abono !== 0) return abono;

  const descuento = Number(transaction.montoDescuento);
  return Number.isFinite(descuento) ? -descuento : 0;
};

export const calculateMovementBalances = (transactions: ApiTransaction[], currentBalance: number | string): SaldometrobusMovimiento[] => {
  let balance = Number(currentBalance);

  return transactions.map((transaction) => {
    const delta = getTransactionDelta(transaction);
    const movement = {
      transaccion: transaction.operador ?? "",
      tipo: transaction.nombreTRX || "Desconocido",
      fecha_hora: transaction.fecha_trx ?? "",
      monto: formatSaldo(Math.abs(delta)),
      saldo_tarjeta: formatSaldo(balance),
      lugar: transaction.estacion ?? ""
    };

    balance -= delta;
    return movement;
  });
};

const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://www.tarjetametrobus.com";
const scrapper2URL = import.meta.dev ? "/tarjetametrobus2" : "https://a2-20tarjetametrobus.com";
let scrapperToken: string | undefined;

const unknownError = {
  status: "error" as const,
  tarjeta: null,
  error_key: "error"
};

const getScrapperToken = async (forceFetch = false) => {
  if (!forceFetch && scrapperToken) {
    return scrapperToken;
  }

  const html = await CapacitorHttp.get({
    url: scrapperURL,
    responseType: "text"
  }).then(response => response.data).catch(() => {});
  if (!html) return;

  const $ = load(html);
  const token = $("input[id='consultaToken']").val()?.toString().trim();
  if (!token) return;

  scrapperToken = token;
  await new Promise(resolve => setTimeout(resolve, 2000));

  return token;
};

const getCardResponse = (numero: string, token: string) => CapacitorHttp.post({
  url: scrapperURL + "/api/transacciones",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  data: JSON.stringify({
    tarjeta: numero,
    token,
    verificacion: ""
  })
}).catch(() => {});

const scrapper1 = async (numero: string, shouldWait = false) => {
  let token = await getScrapperToken();
  if (!token) return;

  if (shouldWait) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  let response = await getCardResponse(numero, token);
  if (!response) return unknownError;
  const retryAfter = response.headers["retry-after"];
  if (retryAfter) {
    return {
      status: "error" as const,
      tarjeta: null,
      error_key: t("retry_after", { s: retryAfter })
    };
  }

  if (response.status === 403) {
    scrapperToken = undefined;
    token = await getScrapperToken(true);
    if (!token) return unknownError;

    response = await getCardResponse(numero, token);
  }

  const cardResponse = response?.data;

  if (!cardResponse) return unknownError;
  if (!cardResponse?.saldo || cardResponse?.estadoCuenta !== "Activa") {
    return {
      status: "error" as const,
      tarjeta: null,
      error_key: "error_tarjeta"
    };
  }

  return {
    status: "ok" as const,
    tarjeta: {
      numero,
      saldo: formatSaldo(cardResponse.saldo),
      estado: cardResponse.estadoCuenta === "Activa" ? "Contrato Activo" : "Contrato Inactivo",
      fecha: formatFecha(Date.now()),
      tipo: getCardType(numero),
      movimientos: calculateMovementBalances(cardResponse.transacciones ?? [], cardResponse.saldo)
    }
  };
};

const scrapper2 = async (numero: string) => {
  const { sonda } = useRuntimeConfig().public;
  const cardResponse = await CapacitorHttp.get({
    url: `${scrapper2URL}/api/v1/check_balance`,
    responseType: "json",
    params: {
      card_number: numero
    },
    headers: {
      authorization: `Basic ${sonda.credential}`
    }
  }).then(response => response.data).catch(() => {});

  if (!cardResponse) return unknownError;
  if (!cardResponse?.successful) {
    return {
      status: "error" as const,
      tarjeta: null,
      error_key: "error_tarjeta"
    };
  }

  return {
    status: "ok" as const,
    tarjeta: {
      numero,
      saldo: Number(cardResponse.saldo_tarjeta).toFixed(2),
      estado: cardResponse.estado_contrato === "Activa" ? "Contrato Activo" : "Contrato Inactivo",
      fecha: formatFecha(Date.now()),
      tipo: getCardType(numero),
      movimientos: []
    }
  };
};

export const scrapperTarjeta = async (numero: string, shouldWait = false) => {
  const result = await scrapper1(numero, shouldWait);
  if (!result) return scrapper2(numero);

  return result;
};
