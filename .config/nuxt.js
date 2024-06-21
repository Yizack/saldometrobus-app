export default defineNuxtConfig({
  app: {
    rootId: "app",
    buildAssetsDir: "/_app/",
    head: {
      title: "Saldo Metrobús",
      htmlAttrs: {
        lang: "es"
      },
      bodyAttrs: {
        "data-bs-theme": "light"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" },
        { name: "robots", content: "noindex, nofollow" }
      ],
      link: [
        { rel: "preload", as: "style", crossorigin: "anonymous", href: "https://fonts.googleapis.com/css?family=Nunito:400,300" },
        { rel: "stylesheet", crossorigin: "anonymous", href: "https://fonts.googleapis.com/css?family=Nunito:400,300" }
      ]
    }
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/transitions.css",
    "~/assets/css/main.css",
    "~/assets/css/light.css",
    "~/assets/css/dark.css",
    "~/assets/css/button.css",
    "~/assets/css/form.css",
    "~/assets/css/modal.css",
    "~/assets/css/table.css",
    "~/assets/css/nav.css"
  ],
  modules: [
    "@nuxt/eslint",
    "nuxt-icons",
    "@pinia/nuxt"
  ],
  eslint: {
    config: {
      autoInit: false,
      stylistic: true
    }
  },
  pinia: {
    autoImports: [
      "defineStore",
      ["defineStore", "definePiniaStore"]
    ]
  },
  imports: {
    dirs: ["stores"]
  },
  ssr: false,
  spaLoadingTemplate: false,
  nitro: {
    crawlLinks: false,
    prerender: {
      ignore: ["/app", "/registro"]
    }
  }
});
