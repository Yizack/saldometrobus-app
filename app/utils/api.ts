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

  addTarjeta (payload: TarjetaAPI & { token: string }) {
    return CAPACITOR.doPost(this.addTarjetaURL, payload as unknown as Record<string, string>);
  }

  getTarjetas (payload: Record<string, string>): Promise<{ tarjetas: TarjetaAPI[], error: boolean, error_key: string }> {
    return CAPACITOR.doPost(this.getTarjetasURL, payload);
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
