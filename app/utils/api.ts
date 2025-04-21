import { Preferences } from "@capacitor/preferences";

class SaldometrobusAPI {
  base = import.meta.dev ? "http://localhost:5174" : "https://saldometrobus.yizack.com";
  version = "v2";
  baseDB = `${this.base}/database/${this.version}`;
  loginURL = `${this.baseDB}/login`;
  registroURL = `${this.baseDB}/registro`;
  addTarjetaURL = `${this.baseDB}/tarjetas_insert`;
  getTarjetasURL = `${this.baseDB}/tarjetas_get`;
  updateTarjetaURL = `${this.baseDB}/tarjetas_update`;
  deleteTarjetaURL = `${this.baseDB}/tarjetas_delete`;
  updateURL = `${this.baseDB}/update_password`;
  deleteAccountURL = `${this.baseDB}/delete_account`;
  updateNameURL = `${this.baseDB}/update_name`;

  userLogin (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.loginURL, payload);
  }

  userRegistro (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.registroURL, payload);
  }

  userPassUpdate (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.updateURL, payload);
  }

  addTarjeta (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.addTarjetaURL, payload);
  }

  getTarjetas (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.getTarjetasURL, payload);
  }

  async getTarjetaAPI (n: string | number, cached = false): Promise<Partial<{ tarjeta: SaldometrobusTarjeta, error: boolean, error_key: string }>> {
    const numero = String(n);
    const currentTime = Date.now();
    if (cached) {
      const pref = (await Preferences.get({ key: numero })).value;
      const cachedResponse = pref ? JSON.parse(pref) : null;
      if (cachedResponse && cachedResponse.expires && currentTime < cachedResponse.expires) {
        return {
          error: true,
          error_key: `${t("tarjeta_actualizada")}: ${numero}`
        };
      }
    }

    const scrapped = await scrapperTarjeta(numero);
    if (!scrapped) return { error: true, error_key: "error" };

    const { tarjeta, status } = scrapped;

    if (status !== "ok" || !tarjeta) {
      return { error: true, error_key: "error_tarjeta_unknown" };
    }

    if (cached && parseInt(numero)) {
      const maxAge = 60; // 1 minuto
      const expiresTime = currentTime + (maxAge * 1000);
      await Preferences.set({ key: numero, value: JSON.stringify({ expires: expiresTime }) });
    }

    return { tarjeta } as unknown as { tarjeta: SaldometrobusTarjeta };
  }

  async getDetallesTarjetas (tarjetas: SaldometrobusTarjeta[]) {
    const arr = [];
    for (const tarjeta of tarjetas) {
      const scrapped = await scrapperTarjeta(tarjeta.numero);
      if (scrapped && scrapped.status === "ok" && scrapped.tarjeta) {
        Object.assign(scrapped.tarjeta, tarjeta); // needed for 1st time
        arr.push(scrapped.tarjeta);
      }
    }
    return arr;
  }

  deleteTarjeta (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.deleteTarjetaURL, payload);
  }

  updateTarjeta (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.updateTarjetaURL, payload);
  }

  deleteAccount (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.deleteAccountURL, payload);
  }

  updateName (payload: Record<string, string>) {
    return CAPACITOR.doPost(this.updateNameURL, payload);
  }
}

export const API = new SaldometrobusAPI();
