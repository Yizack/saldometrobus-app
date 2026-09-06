import { load } from "cheerio";
import { CapacitorHttp } from "@capacitor/core";

const formatSaldo = (amount: number | string) => (Number(amount) / 100).toFixed(2);

interface ApiTransaction {
  nombreTRX: string;
  fecha_trx: string;
  operador: string;
  estacion: string;
  montoAbono: number;
  montoDescuento: number;
  saldo: number;
}
const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://www.tarjetametrobus.com";
const scrapper2URL = import.meta.dev ? "/tarjetametrobus2" : "https://a2-20tarjetametrobus.com";
let scrapperToken: string | undefined;

const unknownError = {
  status: "error" as const,
  tarjeta: null,
  error_key: "error"
};

const getChallenge = async () => CapacitorHttp.get({
  url: scrapperURL + "/api/altcha",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
}).then(response => response.data as AltchaChallenge).catch(() => {});

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

const getCardResponse = async (numero: string, token: string) => {
  const challenge = await getChallenge();
  if (!challenge) return;
  const altcha = await solveAltcha(challenge);
  if (!altcha) return;

  return CapacitorHttp.post({
    url: scrapperURL + "/api/transacciones",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: JSON.stringify({
      altcha,
      tarjeta: numero,
      token,
      verificacion: ""
    })
  }).catch(() => {});
};

const scrapper1 = async (numero: string, shouldWait = false) => {
  let token = await getScrapperToken();
  if (!token) return;

  if (shouldWait) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  let response = await getCardResponse(numero, token);
  if (!response) return;
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
    if (!response || response.status !== 200) return;
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
      movimientos: cardResponse.transacciones?.map((t: ApiTransaction) => ({
        transaccion: t.operador,
        tipo: t.nombreTRX || "Desconocido",
        fecha_hora: t.fecha_trx,
        monto: formatSaldo(t.montoAbono || t.montoDescuento),
        saldo_tarjeta: formatSaldo(t.saldo),
        lugar: t.estacion
      })) ?? []
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
  if (cardResponse.saldo_tarjeta === null) {
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
