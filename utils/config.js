class Config {
  constructor (config) {
    this.config = config;
  }

  async load () {
    this.config = {
      lang: await CAPACITOR.getPref("lang") || "es",
      dark: await CAPACITOR.getPref("dark") || false
    };
    this.setLang(this.config.lang);
    this.setDark(this.config.dark);
  }

  get lang () {
    return this.config.lang;
  }

  get dark () {
    return this.config.dark;
  }

  async setLang (lang) {
    this.config.lang = lang;
    STRINGS.setLanguage(lang);
    await CAPACITOR.setPref("lang", lang);
  }

  async setDark (dark) {
    this.config.dark = dark;
    useHead({ bodyAttrs: { "data-bs-theme": dark ? "dark" : "light" } });
    await CAPACITOR.setPref("dark", dark);
  }
}

export const CONFIG = new Config({ lang: "es", dark: false });
