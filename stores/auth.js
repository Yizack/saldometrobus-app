const Auth = defineStore("auth", {
  state: () => ({
    auth: {}
  }),
  getters: {
    user (state) {
      return state.auth;
    },
    exists (state) {
      return Object.keys(state.auth).length > 0;
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
    },
    async logout () {
      this.auth = {};
      await CAPACITOR.removePref("auth");
    },
    async restore () {
      if (Object.keys(this.auth).length === 0) {
        const auth = await CAPACITOR.getPref("auth");
        if (auth) {
          this.auth = JSON.parse(auth);
        }
      }
    }
  }
});

export const AUTH = Auth();
