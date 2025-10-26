import { load } from "cheerio";
import { CapacitorHttp } from "@capacitor/core";

const scrapperURL = import.meta.dev ? "/tarjetametrobus" : "https://consultasaldomb.com";
const baseUrl = scrapperURL + "/PortalCAE-WAR-MODULE";

export const scrapperTarjeta = async (numero: string) => {
  // Info
  const infoParams = new URLSearchParams({
    accion: "6",
    NumDistribuidor: "99",
    NomUsuario: "usuInternet",
    NomHost: "AFT",
    NomDominio: "aft.cl",
    Trx: "",
    RutUsuario: "0",
    NumTarjeta: numero,
    bloqueable: ""
  });

  const infoHTML = await CapacitorHttp.get({ url: `${baseUrl}/SesionPortalServlet?${infoParams}`, responseType: "text" }).then(async response => response.data as string).catch(() => "");
  if (!infoHTML) return null;
  const $1 = load(infoHTML);
  const ksi = $1("input#KSI").eq(0).val() as string;

  if (!ksi) {
    // setResponseStatus(event, 400);
    return {
      status: "error",
      tarjeta: null,
      code: 400,
      message: "Número de tarjeta no válido"
    };
  }

  const td1 = $1("td[class=verdanabold-ckc]:eq(3), td[class=verdanabold-ckc]:eq(5), td[class=verdanabold-ckc]:eq(7), span[class=arial12-bold-azul]:eq(1)");
  const estado = td1.eq(0).text().trim();
  const saldo = td1.eq(1).text().trim();
  const fecha = td1.eq(2).text().trim();
  const tipoAltElement = td1.eq(3);
  const tipo_alt = tipoAltElement.length ? tipoAltElement.text().trim().split("Tipo de contrato:")[1]?.trim() : null;
  const tipo = saldo ? tipo_alt || getCardType(numero) : "";

  // Movimientos
  const movsParams = new URLSearchParams({
    KSI: ksi,
    accion: "1",
    itemms: "3000",
    item: "2",
    DiasMov: "28"
  });

  const movsHTML = await CapacitorHttp.get({ url: `${baseUrl}/ComercialesPortalServlet?${movsParams}`, responseType: "arraybuffer" }).then((response) => {
    const binaryString = atob(response.data);
    const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decoder = new TextDecoder("iso-8859-1");
    return decoder.decode(bytes);
  }).catch(() => "");
  const $2 = load(movsHTML);
  const movimientos: SaldometrobusMovimiento[] = [];

  const movs = $2(".arial12-azul td");
  for (let i = 0; i < movs.length; i += 7) {
    movimientos.push({
      transaccion: movs.eq(i + 1).text().trim(),
      tipo: movs.eq(i + 2).text().split("-")[1]?.trim() || "Desconocido",
      fecha_hora: movs.eq(i + 3).text().trim(),
      monto: movs.eq(i + 5).text().trim(),
      saldo_tarjeta: movs.eq(i + 6).text().trim(),
      lugar: movs.eq(i + 4).text().trim()
    });
  }

  const output = {
    status: "ok",
    tarjeta: {
      numero,
      ksi,
      saldo,
      estado,
      fecha,
      tipo,
      movimientos
    }
  };

  return output;
};
