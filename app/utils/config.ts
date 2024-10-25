type AppConfig = { lang: Locale, dark: boolean };

class Config {
  config: AppConfig;
  constructor (config: AppConfig) {
    this.config = config;
  }

  async load () {
    this.config = {
      lang: await CAPACITOR.getPref("lang") || "es",
      dark: await CAPACITOR.getPref("dark") || false
    };
    await this.setLang(this.config.lang);
    await this.setDark(this.config.dark);
  }

  get lang () {
    return this.config.lang;
  }

  get dark () {
    return this.config.dark;
  }

  async setLang (lang: Locale) {
    this.config.lang = lang;
    LOCALE.setLanguage(lang);
    await CAPACITOR.setPref("lang", lang);
  }

  async setDark (dark: boolean) {
    this.config.dark = dark;
    useHead({ bodyAttrs: { "data-bs-theme": dark ? "dark" : "light" } });
    await CAPACITOR.setPref("dark", dark);
  }
}

export const CONFIG = new Config({ lang: "es", dark: false });
