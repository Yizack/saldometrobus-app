class SaldometrobusAPI {
  constructor () {
    this.base = "https://saldometrobus.yizack.com";
    this.version = "v2";
    this.baseAPI = `${this.base}/api/${this.version}`;
    this.baseDB = `${this.base}/database/${this.version}`;
    this.tarjetasAPI = `${this.baseAPI}/tarjeta`;
    this.loginURL = `${this.baseDB}/login`;
    this.registroURL = `${this.baseDB}/registro`;
    this.addTarjetaURL = `${this.baseDB}/tarjetas_insert`;
    this.getTarjetasURL = `${this.baseDB}/tarjetas_get`;
    this.updateTarjetaURL = `${this.baseDB}/tarjetas_update`;
    this.deleteTarjetaURL = `${this.baseDB}/tarjetas_delete`;
    this.updateURL = `${this.baseDB}/update_password`;
    this.deleteAccountURL = `${this.baseDB}/delete_account`;
  }

  userLogin (payload) {
    return CAPACITOR.doPost(this.loginURL, payload);
  }

  userRegistro (payload) {
    return CAPACITOR.doPost(this.registroURL, payload);
  }

  userPassUpdate (payload) {
    return CAPACITOR.doPost(this.updateURL, payload);
  }

  addTarjeta (payload) {
    return CAPACITOR.doPost(this.addTarjetaURL, payload);
  }

  getTarjetas (payload) {
    return CAPACITOR.doPost(this.getTarjetasURL, payload);
  }

  async getTarjetaAPI (numero) {
    const { tarjeta, status, error, error_key } = await CAPACITOR.doGet(`${this.tarjetasAPI}/${numero}`);
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

  async getDetallesTarjetas (payload) {
    const { error, tarjetas } = await this.getTarjetas(payload);
    if (!error) {
      const arr = [];
      for (const tarjeta of tarjetas) {
        const data = await CAPACITOR.doGet(`${this.tarjetasAPI}/${tarjeta.numero}`);
        if (data.status === "ok") {
          Object.assign(data.tarjeta, tarjeta);
          arr.push(data.tarjeta);
        }
      }
      return arr;
    }
    else {
      return false;
    }
  }

  deleteTarjeta (payload) {
    return CAPACITOR.doPost(this.deleteTarjetaURL, payload);
  }

  updateTarjeta (payload) {
    return CAPACITOR.doPost(this.updateTarjetaURL, payload);
  }

  deleteAccount (payload) {
    return CAPACITOR.doPost(this.deleteAccountURL, payload);
  }
}

export const API = new SaldometrobusAPI();
