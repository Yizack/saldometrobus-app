import { version } from "./../../package.json";

export const CONST = {
  name: "Saldo Metrobús",
  version,
  dev: {
    name: "Yizack Rangel",
    legal_name: "Eliezer Rangel",
    url: "https://yizack.com",
    bgeneral: {
      numero: "0425978180593",
      tipo: "Cuenta de Ahorros"
    },
    paypal: "https://www.paypal.com/donate/?hosted_button_id=ZDRU9XGJHPN5U"
  },
  url: "https://saldometrobus.yizack.com",
  googlePlay: "https://play.google.com/store/apps/details?id=com.yizack.saldometrobus",
  appStore: "",
  email: "saldometrobus@yizack.com",
  privacy: (lang: string) => `https://yizack.com/legal/saldometrobus/${lang}/privacy.html`,
  database: "saldometrobus.db",
  mapsEmbedKey: "AIzaSyD_qEcAuuJ1Arg-MgaaphTlnG8CXVjHaII",
  dark: false,
  colors: {
    light: {
      primary: "#4E73DF",
      primaryDark: "#1f1f1f",
      text: "#5a5c69",
      dark: "#5D5F6C",
      dark_area: "#5D5F6C33",
      border: "#373737",
      success: "#1cc88a",
      success_area: "#1cc88a33",
      danger: "#E74A3B",
      danger_area: "#E74A3B33",
      tick: "#E5E5E5"
    },
    dark: {
      primary: "#4E73DF",
      primaryDark: "#405FB9",
      text: "#D5D5DB",
      dark: "#D5D5DB",
      dark_area: "#D5D5DB33",
      border: "#373737",
      success: "#1cc88a",
      success_area: "#1cc88a33",
      danger: "#FF6662",
      danger_area: "#FF666233",
      tick: "#373737"
    }
  }
};
