import { CapacitorHttp } from "@capacitor/core";

const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://a2-20tarjetametrobus.com";

export const scrapperTarjeta = async (numero: string) => {
  // Info
  const infoParams = new URLSearchParams({
    card_number: numero
  });

  const { sonda } = useRuntimeConfig().public;

  const ckeckBalance = await CapacitorHttp.get({
    url: `${scrapperURL}/api/v1/check_balance?${infoParams}`,
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
      estado: ckeckBalance.saldo_tarjeta === "Activa" ? "Contrato Activo" : "Contrato Inactivo",
      fecha: new Date().toLocaleString("es-PA", { timeZone: "America/Panama", hour12: false }),
      tipo: getCardType(numero),
      movimientos: []
    }
  };

  return output;
};
