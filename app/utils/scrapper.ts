import { CapacitorHttp } from "@capacitor/core";

const loginURL = import.meta.dev ? "/login" : "https://us-south1-saldo-ya-metro.cloudfunctions.net/snd-login";
const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://recaudo.sondapay.com";

const getLogin = async (csid?: boolean) => CapacitorHttp.post({
  url: loginURL,
  responseType: "json",
  params: csid ? {
    csid: "1"
  } : undefined,
  headers: {
    "Content-Type": "application/json"
  }
}).then(r => r.data).catch(() => ({ data: undefined }));

const getCard = (numero: string, sessionId: string) => CapacitorHttp.post({
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
}).then(r => r.data).catch(() => ({ data: undefined }));

const formatSaldo = (amount: number | string) => (Number(amount) / 100).toFixed(2);

export const scrapperTarjeta = async (numero: string) => {
  let loginResponse = await getLogin();
  if (!loginResponse) return null;

  let cardResponse = await getCard(numero, loginResponse.sIdSesion);
  if (!cardResponse) return null;

  if (cardResponse.estado?.numeroError === 999) {
    loginResponse = await getLogin(true);
    if (!loginResponse) return null;

    cardResponse = await getCard(numero, loginResponse.sIdSesion);
    if (!cardResponse) return null;
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
      fecha: new Date().toLocaleString("es-PA", { timeZone: "America/Panama", hour12: false }),
      tipo: getCardType(numero),
      movimientos: cardResponse.servicio?.listaTransacciones.map(t => ({
        transaccion: t.operador,
        tipo: t.nombreTRX || "Desconocido",
        fecha_hora: t.fecha_trx,
        monto: formatSaldo(t.MONTO_ABONO || t.MONTO_DESCUENTO),
        saldo_tarjeta: formatSaldo(t.saldoTrx),
        lugar: t.estacion
      }))
    }
  };

  return output;
};
