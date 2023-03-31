export default {
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
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { name: "msapplication-TileColor", content: "#4E73DF" },
        { name: "theme-color", content: "#4E73DF" }
      ],
      link: [
        { rel: "preload", as: "style", crossorigin: "anonymous", href: "https://fonts.googleapis.com/css?family=Nunito:400,300" },
        { rel: "stylesheet", crossorigin: "anonymous", href: "https://fonts.googleapis.com/css?family=Nunito:400,300" }
      ]
    }
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/main.css"
  ],
  modules: [
    "nuxt-icon",
    "@pinia/nuxt"
  ],
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
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    prerender: {
      crawlLinks: false
    }
  }
};
