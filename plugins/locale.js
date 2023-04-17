import es from "~/strings/es.js";
import en from "~/strings/en.js";

export default defineNuxtPlugin(() => {
  const locales = { es, en };
  const locale = (message, code) => code ? locales[code][message] : locales.es[message];
  return {
    provide: { locale }
  };
});
