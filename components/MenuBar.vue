<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow">
    <div class="container-fluid">
      <a class="text-white pe-4 display-6" data-bs-toggle="offcanvas" href="#menu" role="button" aria-controls="menu"><Icon class="d-flex" name="material-symbols:menu" /></a>
      <span class="navbar-brand me-auto">{{ title }}</span>
      <div class="nav-item dropstart">
        <a class="text-white display-6" role="button" data-bs-toggle="dropdown" aria-expanded="false"><Icon name="ic:baseline-more-vert" /></a>
        <ul class="dropdown-menu m-0 end-0">
          <li><NuxtLink class="dropdown-item py-3 px-4" to="/app/config/">{{ t("config") }}</NuxtLink></li>
          <li><a class="dropdown-item py-3 px-4" data-bs-toggle="modal" data-bs-target="#about" role="button">{{ t("acerca") }}</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="menu" class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="menuLabel">
    <div class="offcanvas-header bg-primary align-items-start">
      <div class="text-white">
        <img class="img-fluid" src="/images/logo2.webp" width="70" height="70">
        <h5 id="menuLabel" class="offcanvas-title">{{ Auth().user.nombre }}</h5>
        <div>{{ Auth().user.email }}</div>
      </div>
      <div data-bs-theme="dark">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
    </div>
    <div class="offcanvas-body px-0 h-100 w-100 d-flex flex-column">
      <nav class="nav flex-column">
        <span v-for="(tab, index) in menu" :key="index" data-bs-dismiss="offcanvas">
          <NuxtLink v-if="!tab.external" class="nav-link text-dark-emphasis py-3" :to="tab.link">
            <Icon :name="tab.icon" width="24" height="24" class="me-4" /> {{ tab.name }}
          </NuxtLink>
          <a v-else class="nav-link text-dark-emphasis py-3" role="button" @click="CAPACITOR.openBrowser(tab.link)">
            <Icon :name="tab.icon" width="24" height="24" class="me-4" /> {{ tab.name }}
          </a>
        </span>
        <hr>
        <div class="px-3">{{ t("sesion") }}</div>
        <a class="nav-link text-dark-emphasis py-3" role="button" @click="logout()">
          <Icon name="material-symbols:power-rounded" width="24" height="24" class="me-4" /> {{ t("salir") }}
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
          icon: "material-symbols:credit-card-outline",
          link: "/app/",
          external: false
        },
        {
          name: t("perfil"),
          icon: "material-symbols:account-circle",
          link: "/app/perfil/",
          external: false
        },
        {
          name: t("estado"),
          icon: "material-symbols:info",
          link: "https://status.saldometrobus.yizack.com/",
          external: true
        },
        {
          name: t("donar"),
          icon: "material-symbols:shield-with-heart-outline",
          link: "/app/donar/",
          external: false
        }
      ]
    };
  },
  methods: {
    async logout () {
      await DB.deleteAll();
      await Auth().logout();
      document.body.removeAttribute("style");
      this.$router.push("/");
    }
  }
};
</script>
