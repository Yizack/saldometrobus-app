import en from "~/strings/en";
import es from "~/strings/es";

const strings: Record<Locale, Record<string, string>> = { en, es };

class Locales {
  code: Locale;
  constructor (code: Locale) {
    this.code = code;
  }

  get (key: string, values?: Record<string, unknown>): string {
    const text = strings[this.code][key] || strings.en[key] || key;
    if (!values) return text;
    return Object.keys(values).reduce((acc, key) => acc.replace(new RegExp(`{{\\s*${key}\\s*}}`, "gi"), String(values[key])), text);
  }

  setLanguage (code: Locale = "en") {
    this.code = code;
  }
}

export const LOCALE = new Locales("es");

export const t = (key: string, values?: Record<string, unknown>) => {
  return LOCALE.get(key, values);
};
