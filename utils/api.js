class SaldometrobusAPI {
  constructor () {
    this.baseURL = "https://saldometrobus.yizack.com";
    this.tarjetasAPI = `${this.baseURL}/api/tarjeta`;
    this.loginURL = `${this.baseURL}/database/v2/login`;
    this.registroURL = `${this.baseURL}/database/v2/registro`;
    this.addTarjetaURL = `${this.baseURL}/database/v2/tarjetas_insert`;
    this.getTarjetasURL = `${this.baseURL}/database/v2/tarjetas_get`;
    this.updateTarjetaURL = `${this.baseURL}/database/v2/tarjetas_update`;
    this.deleteTarjetaURL = `${this.baseURL}/database/v2/tarjetas_delete`;
    this.updateURL = `${this.baseURL}/database/v2/update_password`;
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
      return { error: true, error_key: "error" };
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
}

export const API = new SaldometrobusAPI();
