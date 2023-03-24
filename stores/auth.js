export const Auth = defineStore("auth", {
  state: () => ({
    auth: {}
  }),
  getters: {
    user (state) {
      return state.auth;
    }
  },
  actions: {
    async login (payload) {
      const data = await API.userLogin(payload);
      if (!data.error) {
        this.auth = data.usuario;
        await CAPACITOR.setPref("auth", JSON.stringify(data.usuario));
      }
      return data;
    }
  }
});
