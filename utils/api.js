const error_response = { error: true, error_key: "error" };

class SaldometrobusAPI {
  constructor () {
    this.baseURL = "https://saldometrobus.yizack.com";
    this.tarjetasAPI = `${this.baseURL}/api/tarjeta`;
    this.loginURL = `${this.baseURL}/database/v2/login`;
    this.registroURL = `${this.baseURL}/database/registro`;
    this.addTarjetaURL = `${this.baseURL}/database/v2/tarjetas_insert`;
    this.getTarjetasURL = `${this.baseURL}/database/v2/tarjetas_get`;
    this.updateTarjetaURL = `${this.baseURL}/database/tarjetas_update`;
    this.deleteTarjetaURL = `${this.baseURL}/database/tarjetas_delete`;
  }

  async userLogin (payload) {
    const response = await CAPACITOR.doPost(this.loginURL, payload);
    return response.status === 200 ? response.data : error_response;
  }

  async addTarjeta (payload) {
    const response = await CAPACITOR.doPost(this.addTarjetaURL, payload);
    return response.status === 200 ? response.data : error_response;
  }

  async getTarjetas (payload) {
    const response = await CAPACITOR.doPost(this.getTarjetasURL, payload);
    return response.status === 200 ? response.data : error_response;
  }

  async getTarjeta (numero) {
    const response = await CAPACITOR.doGet(`${this.tarjetasAPI}/${numero}`);
    if (response.status === 200) {
      const data = response.data;
      if (data.status === "ok") {
        if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
          data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
        }
        else if (data.tarjeta.tipo === "Tarjeta Rapipass") {
          data.tarjeta.tipo = STRINGS.get("tarjeta_rapipass");
        }
        if (data.tarjeta.estado === "Contrato Activo") {
          data.tarjeta.estado = STRINGS.get("contrato_activo");
        }
        return data;
      }
      return false;
    }
    else {
      return error_response;
    }
  }

  async getDetallesTarjetas (payload) {
    const { error, tarjetas } = await this.getTarjetas(payload);
    if (!error) {
      const arr = [];
      for (const tarjeta of tarjetas) {
        const response = await CAPACITOR.doGet(`${this.tarjetasAPI}/${tarjeta.numero}`);
        if (response.status === 200) {
          const data = response.data;
          if (data.status === "ok") {
            if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
              data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
            }
            else if (data.tarjeta.tipo === "Tarjeta Rapipass") {
              data.tarjeta.tipo = STRINGS.get("tarjeta_rapipass");
            }
            if (data.tarjeta.estado === "Contrato Activo") {
              data.tarjeta.estado = STRINGS.get("contrato_activo");
            }
            Object.assign(data.tarjeta, tarjeta);
            arr.push(data.tarjeta);
          }
        }
      }
      return arr;
    }
    else {
      return false;
    }
  }
}

export const API = new SaldometrobusAPI();
