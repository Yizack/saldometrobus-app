import { CapacitorHttp } from "@capacitor/core";

const loginURL = import.meta.dev ? "/login" : "https://us-south1-saldo-ya-metro.cloudfunctions.net/snd-login";
const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://recaudo.sondapay.com";
const scrapper2URL = import.meta.dev ? "/tarjetametrobus2" : "https://a2-20tarjetametrobus.com";

const getLogin = async (csid?: boolean) => {
  try {
    return CapacitorHttp.post({
      url: loginURL,
      responseType: "json",
      params: csid ? {
        csid: "1"
      } : undefined,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.data).catch(() => {});
  }
  catch {
    return;
  }
};

const getCard = (numero: string, sessionId: string) => {
  try {
    return CapacitorHttp.post({
      url: scrapperURL + "/RCAEBack/pocae/consulta/movimientos",
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json",
      data: JSON.stringify({
        sesion: {
          sIdSesion: sessionId,
          nIdUsuarioWeb: 139812,
          nIdEmpresa: 5,
          sHost: "127.0.0.1"
        },
        numExterno: numero,
        numeroDias: 28
      })
    }).then(r => r.data).catch(() => {});
  }
  catch {
    return;
  }
};

const formatSaldo = (amount: number | string) => (Number(amount) / 100).toFixed(2);

const scrapper2 = async (numero: string) => {
  const infoParams = new URLSearchParams({
    card_number: numero
  });

  const { sonda } = useRuntimeConfig().public;
  const ckeckBalance = await CapacitorHttp.get({
    url: `${scrapper2URL}/api/v1/check_balance?${infoParams}`,
    headers: {
      authorization: `Basic ${sonda.credential}`
    },
    responseType: "json"
  }).then(async response => response.data).catch(() => {});

  if (ckeckBalance.data && !ckeckBalance.data?.successful) {
    return {
      status: "error" as const,
      tarjeta: null,
      error_key: "error_tarjeta"
    };
  }

  const output = {
    status: "ok" as const,
    tarjeta: {
      numero,
      saldo: Number(ckeckBalance.saldo_tarjeta).toFixed(2),
      estado: ckeckBalance.estado_contrato === "Activa" ? "Contrato Activo" : "Contrato Inactivo",
      fecha: formatFecha(Date.now()),
      tipo: getCardType(numero),
      movimientos: []
    }
  };

  return output;
};

export const scrapperTarjeta = async (numero: string) => {
  let loginResponse = await getLogin();
  if (!loginResponse.sIdSesion) return scrapper2(numero);

  let cardResponse = await getCard(numero, loginResponse.sIdSesion);
  if (!cardResponse) return scrapper2(numero);

  if (cardResponse.estado?.numeroError === 999) {
    loginResponse = await getLogin(true);
    if (!loginResponse.sIdSesion) return scrapper2(numero);

    cardResponse = await getCard(numero, loginResponse.sIdSesion);
    if (!cardResponse) return scrapper2(numero);
  }

  if (cardResponse.servicio?.estado === -120) {
    return {
      status: "error" as const,
      tarjeta: null,
      error_key: "error_tarjeta"
    };
  }

  // TODO: type cardResponse properly
  const output = {
    status: "ok" as const,
    tarjeta: {
      numero,
      saldo: formatSaldo(cardResponse.servicio.saldo),
      estado: cardResponse.servicio.estadoCuenta === "Activa" ? "Contrato Activo" : "Contrato Inactivo",
      fecha: formatFecha(Date.now()),
      tipo: getCardType(numero),
      movimientos: cardResponse.servicio?.listaTransacciones?.map(t => ({
        transaccion: t.operador,
        tipo: t.nombreTRX || "Desconocido",
        fecha_hora: t.fecha_trx,
        monto: formatSaldo(t.MONTO_ABONO || t.MONTO_DESCUENTO),
        saldo_tarjeta: formatSaldo(t.saldoTrx),
        lugar: t.estacion
      })) ?? []
    }
  };

  return output;
};
