import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/collapse";
import OffCanvas from "bootstrap/js/dist/offcanvas";
import Modal from "bootstrap/js/dist/modal";

export const sha256 = async (message) => {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
  catch (e) {
    console.warn(e);
  }
};

export const convertToTime = (datetime) => {
  const [date, time] = datetime.split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`).getTime();
};

export const formatFecha = (fecha, format = "datetime", locale = "es") => {
  const date = new Date(fecha);
  switch (format) {
    case "datetime":
      return date.toLocaleDateString(locale, { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
    case "chart":
      return new Date(date.getTime() + timeOffSet).toLocaleString(locale, { month: "short", day: "numeric" });
    case "long":
      return date.toLocaleString(locale, { month: "long", day: "numeric", weekday: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: true });
  }
};

export const showModal = (id) => {
  const modal = new Modal("#" + id);
  modal.show();
};

export const hideModal = (id) => {
  const instance = Modal.getInstance("#" + id);
  if (instance) {
    instance.hide();
  }
};

export const closeOffCanvas = (id) => {
  const instance = OffCanvas.getInstance("#" + id);
  if (instance) {
    instance.hide();
  }
};

export const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export const fixed = (n = 0, d = 0) => {
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/,/g, "");
};

export const timeOffSet = new Date().getTimezoneOffset() * 60 * 1000;

export const PanamaDate = () => {
  const d = new Date();
  const localTime = d.getTime();
  const utc = localTime + timeOffSet;
  const offset = -5;
  const PA = utc + (3600000 * offset);
  return new Date(PA);
};

export const formatHour = (hour) => {
  return `${hour}h`;
};

export const openInNewTab = (url) => {
  window.open(url, "_blank");
};

export const getCardImage = (tipo, brand = false) => {
  switch (tipo) {
    case t("tarjeta_normal"):
      return brand ? "metro_metrobus_brand.webp" : "metro_metrobus.webp";
    case t("tarjeta_rapipass"):
      return brand ? "rapipass_brand.webp" : "rapipass.webp";
    case t("tarjeta_escolar"):
      return brand ? "escolar_brand.webp" : "escolar.webp";
    case t("tarjeta_jubilado"):
      return brand ? "jubilado_brand.webp" : "jubilado.webp";
    default:
      return brand ? "metrobus_brand.webp" : "metrobus.webp";
  }
};
