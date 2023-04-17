class Strings {
  constructor (code) {
    this.code = String(code).toLowerCase();
  }

  get (key = "") {
    const { $locale } = useNuxtApp();
    return $locale(key, this.code);
  }

  setLanguage (code) {
    this.code = String(code).toLowerCase();
  }
}

export const STRINGS = new Strings("es");
