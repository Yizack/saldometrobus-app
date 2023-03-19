class SaldometrobusAPI {
  constructor () {
    this.baseURL = "https://saldometrobus.yizack.com";
    this.tarjetasAPI = `${this.baseURL}/api/tarjeta`;
    this.loginURL = `${this.baseURL}/database/login`;
    this.registroURL = `${this.baseURL}/database/registro`;
    this.addTarjetaURL = `${this.baseURL}/database/tarjetas_insert`;
    this.getTarjetasURL = `${this.baseURL}/database/v2/tarjetas_get`;
    this.updateTarjetaURL = `${this.baseURL}/database/tarjetas_update`;
    this.deleteTarjetaURL = `${this.baseURL}/database/tarjetas_delete`;
  }

  userLogin (payload) {
    return _POST(this.loginURL, payload);
  }

  async getTarjetas (payload) {
    const response = await _POST(this.getTarjetasURL, payload);
    try {
      const data = await response.json();
      if (!data.error) {
        return data.tarjeta;
      }
      return false;
    }
    catch (error) {
      return error;
    }
  }

  async getDetallesTarjetas (payload) {
    const response = await this.getTarjetas(payload);
    if (response) {
      const tarjetas = [];
      for (const tarjeta of response) {
        const api_response = await _GET(`${this.tarjetasAPI}/${tarjeta.numero}`);
        try {
          const data = await api_response.json();
          if (data.status === "ok") {
            data.tarjeta.fecha_uso = data.tarjeta.fecha;
            Object.assign(data.tarjeta, tarjeta);
            tarjetas.push(data.tarjeta);
          }
        }
        catch (error) {
          console.warn(error);
        }
      }
      return tarjetas;
    }
  }
}

export const API = new SaldometrobusAPI();
