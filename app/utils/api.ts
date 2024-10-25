class SaldometrobusAPI {
  base = import.meta.dev ? "http://localhost:5173" : "https://saldometrobus.yizack.com";
  version = "v2";
  baseAPI = `${this.base}/api/${this.version}`;
  baseDB = `${this.base}/database/${this.version}`;
  tarjetasAPI = `${this.baseAPI}/tarjeta`;
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

  async getTarjetaAPI (numero: string, cached = false) {
    const { tarjeta, status, error, error_key } = await CAPACITOR.doGet(`${this.tarjetasAPI}/${numero}`, cached);
    if (!error && status === "ok" && tarjeta) {
      return { tarjeta };
    }
    else if (!error && status === "error") {
      return { error: true, error_key: "error_tarjeta_unknown" };
    }
    else {
      return { error, error_key };
    }
  }

  async getDetallesTarjetas (tarjetas: SaldometrobusTarjeta[]) {
    const arr = [];
    for (const tarjeta of tarjetas) {
      const data = await CAPACITOR.doGet(`${this.tarjetasAPI}/${tarjeta.numero}`).catch(() => ({}));
      if (data.status === "ok") {
        Object.assign(data.tarjeta, tarjeta);
        arr.push(data.tarjeta);
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

  getGoogleKey (payload: Record<string, string>) {
    return CAPACITOR.doPost(`${this.base}/maps/key`, payload);
  }
}

export const API = new SaldometrobusAPI();
