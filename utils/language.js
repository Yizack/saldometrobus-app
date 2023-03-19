import ES from "~/strings/es.js";
import EN from "~/strings/en.js";

class Strings {
  constructor (code) {
    this.code = String(code).toLowerCase();
    this.strings = {};
  }

  get (key) {
    return this.strings[key];
  }

  setLanguage (code) {
    this.code = String(code).toLowerCase();
    this.strings = this.code === "es" ? ES : EN;
  }
}

export const STRINGS = new Strings("es");
