export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@pinia/nuxt"
  ],
  ssr: false,
  imports: {
    dirs: ["stores"]
  },
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
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" },
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
  spaLoadingTemplate: false,
  runtimeConfig: {
    public: {
      google: {
        apiKey: "AIzaSyA60VM-yC8g350aJYKEzmlAR-9kRbp5SEc"
      }
    }
  },
  routeRules: {
    "/tarjetametrobus/**": {
      proxy: { to: "https://a2-20tarjetametrobus.com/**" }
    },
    "/database/**": {
      proxy: { to: "http://localhost:5173/database/**" }
    }
  },
  experimental: {
    typedPages: true
  },
  compatibilityDate: "2026-08-08",
  nitro: {
    prerender: {
      crawlLinks: false,
      ignore: ["/app", "/registro"]
    }
  },
  vite: {
    build: {
      rollupOptions: {
        external: ["jeep-sqlite/dist/components/jeep-sqlite", "jeep-sqlite"]
      }
    }
  },
  typescript: {
    nodeTsConfig: {
      include: [
        "../scripts/**/*",
        "../shared/**/*.d.ts"
      ]
    }
  },
  eslint: {
    config: {
      autoInit: false,
      stylistic: true
    }
  },
  icon: {
    size: "24px",
    provider: "none",
    mode: "svg",
    clientBundle: { scan: true },
    customCollections: [{ prefix: "", dir: "./app/assets/icons" }]
  }
});
