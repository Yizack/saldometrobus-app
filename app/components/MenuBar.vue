<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm">
    <div class="container-fluid">
      <a class="text-white pe-4 display-6 d-flex" data-bs-toggle="offcanvas" href="#menu" role="button" aria-controls="menu">
        <Icon name="menu" />
      </a>
      <span class="navbar-brand me-auto">{{ title }}</span>
      <div class="nav-item dropstart">
        <a class="text-white display-6 d-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Icon name="more" />
        </a>
        <ul class="dropdown-menu m-0 end-0">
          <li v-for="(option, index) of more" :key="index">
            <a v-if="option.external" class="dropdown-item py-3 px-4 hover d-flex align-items-center" role="button" @click="CAPACITOR.openBrowser(option.link)">
              <Icon :name="option.icon" />
              <span class="ms-1">{{ option.name }}</span>
            </a>
            <a v-else-if="option.modal" class="dropdown-item py-3 px-4 hover d-flex align-items-center" data-bs-toggle="modal" :data-bs-target="`#${option.modal}`" role="button">
              <Icon :name="option.icon" />
              <span class="ms-1">{{ option.name }}</span>
            </a>
            <NuxtLink v-else class="dropdown-item py-3 px-4 hover d-flex align-items-center" :to="option.link">
              <Icon :name="option.icon" />
              <span class="ms-1">{{ option.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="menu" ref="offcanvas" class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="menuLabel">
    <div class="offcanvas-header bg-primary align-items-start" data-bs-theme="dark">
      <div class="text-white">
        <img class="img-fluid rounded-circle bg-white" src="/images/logo2.webp" width="70" height="70">
        <h5 id="menuLabel" class="offcanvas-title">{{ Auth().user.nombre }}</h5>
        <div>{{ Auth().user.email }}</div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div class="offcanvas-body px-0 h-100 w-100 d-flex flex-column">
      <nav class="nav flex-column">
        <span v-for="(tab, index) in menu" :key="index" data-bs-dismiss="offcanvas">
          <NuxtLink v-if="!tab.external" class="nav-link text-dark-emphasis py-3" :to="tab.link">
            <Icon :name="tab.icon" class="me-4" /> {{ tab.name }}
          </NuxtLink>
          <a v-else class="nav-link text-dark-emphasis py-3" role="button" @click="CAPACITOR.openBrowser(tab.link)">
            <Icon :name="tab.icon" class="me-4" /> {{ tab.name }}
          </a>
        </span>
        <hr>
        <div class="px-3">{{ t("sesion") }}</div>
        <a class="nav-link text-dark-emphasis py-3" role="button" @click="logout()">
          <Icon name="logout" class="me-4" /> {{ t("salir") }}
        </a>
      </nav>
      <div class="mt-auto text-center small">
        <i>{{ t("version") }}: {{ CONST.version }}</i>
      </div>
    </div>
  </div>
  <AboutDialog />
</template>

<script>
export default {
  name: "MainNavbar",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menu: [
        {
          name: t("tarjetas"),
          icon: "card",
          link: "/app/",
          external: false
        },
        {
          name: t("perfil"),
          icon: "profile",
          link: "/app/perfil/",
          external: false
        },
        {
          name: t("rutas"),
          icon: "bus",
          link: "/app/mibus/",
          external: false
        },
        {
          name: t("direcciones"),
          icon: "directions",
          link: "/app/direcciones/",
          external: false
        },
        {
          name: t("estado"),
          icon: "status",
          link: CONST.status_url,
          external: true
        },
        {
          name: t("donar"),
          icon: "donate",
          link: "/app/donar/",
          external: false
        }
      ],
      more: [
        {
          name: t("config"),
          icon: "settings",
          link: "/app/prefs/config/",
          external: false
        },
        {
          name: t("acerca"),
          icon: "about",
          modal: "about",
          external: false
        },
        {
          name: t("privacidad"),
          icon: "privacy",
          link: CONST.privacy(t("lang_code")),
          external: true
        },
        {
          name: t("rate"),
          icon: "star",
          link: CONST.googlePlay,
          external: true
        },
        {
          name: t("creditos"),
          icon: "credits",
          link: "/app/prefs/creditos/",
          external: false
        }
      ],
      touch: {
        startX: 0,
        endX: 0
      }
    };
  },
  mounted () {
    this.$refs.offcanvas.addEventListener("touchstart", (event) => {
      this.touch.startX = event.changedTouches[0].screenX;
    }, false);

    this.$refs.offcanvas.addEventListener("touchend", (event) => {
      this.touch.endX = event.changedTouches[0].screenX;
      if (this.touch.endX < this.touch.startX) {
        closeOffCanvas("menu");
      }
    }, false);
  },
  beforeUnmount () {
    this.$refs.offcanvas.removeEventListener("touchstart", () => {}, false);
    this.$refs.offcanvas.removeEventListener("touchend", () => {}, false);
  },
  methods: {
    async logout () {
      await DB.deleteAll();
      await Auth().logout();
      document.body.removeAttribute("style");
      this.$router.replace("/");
    }
  }
};
</script>
