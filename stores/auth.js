export const Auth = defineStore("auth", {
  state: () => ({
    auth: {}
  }),
  getters: {
    user (state) {
      return state.auth;
    },
    exists (state) {
      return Object.keys(state.auth).length > 0;
    },
    isGuest (state) {
      return state.auth.guest;
    }
  },
  actions: {
    async login (payload) {
      const data = await API.userLogin(payload);
      if (!data.error) {
        this.auth = data.usuario;
        this.auth.updated = false;
        this.auth.guest = false;
        await CAPACITOR.setPref("auth", JSON.stringify(data.usuario));
      }
      return data;
    },
    async guestLogin () {
      this.auth = {
        email: t("invitado"),
        nombre: t("invitado"),
        updated: true,
        guest: true
      };
      await CAPACITOR.setPref("auth", JSON.stringify(this.auth));
    },
    async setUpdated () {
      this.auth.updated = true;
      await CAPACITOR.setPref("auth", JSON.stringify(this.auth));
    },
    async registro (payload) {
      const data = await API.userRegistro(payload);
      if (!data.error) {
        this.auth = data.usuario;
        this.auth.updated = true;
        this.auth.guest = false;
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
          this.auth.updated = false;
        }
      }
    },
    updateName (name) {
      this.auth.nombre = name;
      CAPACITOR.setPref("auth", JSON.stringify(this.auth));
    }
  }
});
