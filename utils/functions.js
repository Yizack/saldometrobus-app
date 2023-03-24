import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";

export const sha256 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
};

export const _POST = (url, payload) => {
  return fetch(url, {
    method: "POST",
    body: new URLSearchParams(payload).toString(),
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const _GET = (url) => {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const formatFecha = (fecha, format = "short", locale = "es") => {
  if (format === "short") {
    return new Date(fecha).toLocaleDateString(locale);
  }
  else if (format === "long") {
    return new Date(fecha).toLocaleString(locale, { month: "long", day: "numeric", weekday: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: true });
  }
};

export const AUTH = Auth();

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

export const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
