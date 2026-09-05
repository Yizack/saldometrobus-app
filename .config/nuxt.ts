export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/ui"
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
    "~/assets/css/ui.tailwind.css",
    "~/assets/scss/app.scss"
  ],
  colorMode: {
    preference: "light",
    fallback: "light"
  },
  ui: {
    colorMode: true,
    fonts: false
  },
  spaLoadingTemplate: false,
  runtimeConfig: {
    public: {
      google: {
        apiKey: "AIzaSyA60VM-yC8g350aJYKEzmlAR-9kRbp5SEc"
      },
      sonda: {
        credential: "RXR5YWxhYjpNM3RyMEJ1JCM="
      }
    }
  },
  routeRules: {
    "/login": {
      proxy: { to: "https://us-south1-saldo-ya-metro.cloudfunctions.net/snd-login" }
    },
    "/tarjetametrobus/**": {
      proxy: { to: "https://recaudo.sondapay.com/**" }
    },
    "/tarjetametrobus2/**": {
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
    mode: "css",
    clientBundle: { scan: false },
    customCollections: [{ prefix: "", dir: "./app/assets/icons" }]
  }
});
