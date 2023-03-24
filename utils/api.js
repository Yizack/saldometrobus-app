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
    try {
      const response = await _POST(this.loginURL, payload);
      const data = await response.json();
      return data;
    }
    catch {
      return error_response;
    }
  }

  async addTarjeta (payload) {
    try {
      const response = await _POST(this.addTarjetaURL, payload);
      const data = await response.json();
      return data;
    }
    catch {
      return error_response;
    }
  }

  async getTarjetas (payload) {
    const response = await _POST(this.getTarjetasURL, payload);
    try {
      const data = await response.json();
      return data;
    }
    catch (error) {
      return error_response;
    }
  }

  async getTarjeta (numero) {
    const response = await _GET(`${this.tarjetasAPI}/${numero}`);
    try {
      const data = await response.json();
      if (data.status === "ok") {
        if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
          data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
        }
        if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
          data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
        }
        return data;
      }
      return false;
    }
    catch {
      return error_response;
    }
  }

  async getDetallesTarjetas (payload) {
    try {
      const { error, tarjetas } = await this.getTarjetas(payload);
      if (!error) {
        const arr = [];
        for (const tarjeta of tarjetas) {
          const response = await _GET(`${this.tarjetasAPI}/${tarjeta.numero}`);
          const data = await response.json();
          if (data.status === "ok") {
            if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
              data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
            }
            if (data.tarjeta.tipo === "Tarjeta Normal al Portador b") {
              data.tarjeta.tipo = STRINGS.get("tarjeta_normal");
            }
            data.tarjeta.fecha_uso = data.tarjeta.fecha;
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
    catch {
      return false;
    }
  }
}

export const API = new SaldometrobusAPI();
