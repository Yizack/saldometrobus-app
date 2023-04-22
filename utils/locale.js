import es from "~/strings/es.js";
import en from "~/strings/en.js";

const locales = { es, en };

class Locale {
  constructor (code) {
    this.code = String(code).toLowerCase();
  }

  get (key = "") {
    return locales[this.code][key] || locales.en[key];
  }

  setLanguage (code = "es") {
    this.code = String(code).toLowerCase();
  }
}

export const LOCALE = new Locale("es");

export const t = (key) => {
  return LOCALE.get(key);
};
