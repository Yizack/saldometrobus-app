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
      return await API.userLogin(payload).then(async (response) => {
        const data = await response.json();
        this.auth = data.usuario;
        await CAPACITOR.setPref("auth", JSON.stringify(data.usuario));
        return !data.error;
      }).catch((error) => {
        return error;
      });
    }
  }
});
