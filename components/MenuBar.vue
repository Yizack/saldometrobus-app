<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow">
    <div class="container-fluid">
      <a class="text-white pe-4 display-6" data-bs-toggle="offcanvas" href="#menu" role="button" aria-controls="menu"><Icon class="d-flex" name="material-symbols:menu" /></a>
      <span class="navbar-brand me-auto">{{ title }}</span>
      <div class="nav-item dropstart">
        <a class="text-white display-6" role="button" data-bs-toggle="dropdown" aria-expanded="false"><Icon name="ic:baseline-more-vert" /></a>
        <ul class="dropdown-menu m-0 end-0">
          <li><NuxtLink class="dropdown-item py-3 px-4" to="/app/config/">{{ STRINGS.get("config") }}</NuxtLink></li>
          <li><a class="dropdown-item py-3 px-4" data-bs-toggle="modal" data-bs-target="#about" role="button">{{ STRINGS.get("acerca") }}</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="menu" class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="menuLabel">
    <div class="offcanvas-header bg-primary align-items-start">
      <div class="text-white">
        <img class="img-fluid" src="/images/logo2.webp" width="70" height="70">
        <h5 id="menuLabel" class="offcanvas-title">{{ AUTH.user.nombre }}</h5>
        <div>{{ AUTH.user.email }}</div>
      </div>
      <div data-bs-theme="dark">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
    </div>
    <div class="offcanvas-body px-0 h-100 w-100 d-flex flex-column">
      <nav class="nav flex-column">
        <template v-for="(tab, index) in menu" :key="index">
          <span v-if="!tab.new_section" data-bs-dismiss="offcanvas">
            <NuxtLink class="nav-link text-dark-emphasis py-3" :to="tab.link">
              <Icon :name="tab.icon" width="24" height="24" class="me-4" /> {{ tab.name }}
            </NuxtLink>
          </span>
          <template v-else>
            <hr>
            <div class="px-3">{{ tab.new_section.name }}</div>
            <NuxtLink class="nav-link text-dark-emphasis py-3" :to="tab.link">
              <Icon :name="tab.icon" width="24" height="24" class="me-4" /> {{ tab.name }}
            </NuxtLink>
          </template>
        </template>
      </nav>
      <div class="mt-auto text-center small">
        <i>{{ STRINGS.get("version") }}: {{ CONST.version }}</i>
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
          name: STRINGS.get("tarjetas"),
          icon: "material-symbols:credit-card-outline",
          link: "/app/"
        },
        {
          name: STRINGS.get("perfil"),
          icon: "material-symbols:account-circle",
          link: "/app/perfil/"
        },
        {
          name: STRINGS.get("estado"),
          icon: "material-symbols:info",
          link: "https://status.saldometrobus.yizack.com/"
        },
        {
          name: STRINGS.get("salir"),
          icon: "material-symbols:power-rounded",
          link: "/",
          new_section: {
            name: STRINGS.get("sesion")
          }
        }
      ]
    };
  }
};
</script>
