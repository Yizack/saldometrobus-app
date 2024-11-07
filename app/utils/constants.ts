import { version, devDependencies, dependencies } from "./../../package.json";

export const CONST = {
  name: "Saldo Metrobús",
  version,
  dev: {
    name: "Yizack Rangel",
    legal_name: "Eliezer Rangel",
    url: "https://yizack.com",
    bgeneral: {
      numero: "0425978180593",
      tipo: "Cuenta de Ahorros"
    },
    paypal: "https://www.paypal.com/donate/?hosted_button_id=ZDRU9XGJHPN5U"
  },
  url: "https://saldometrobus.yizack.com",
  googlePlay: "https://play.google.com/store/apps/details?id=com.yizack.saldometrobus",
  appStore: "",
  email: "saldometrobus@yizack.com",
  privacy: (lang: string) => `https://yizack.com/legal/saldometrobus/${lang}/privacy.html`,
  database: "saldometrobus.db",
  mapsEmbedKey: "AIzaSyD_qEcAuuJ1Arg-MgaaphTlnG8CXVjHaII",
  dark: false,
  colors: {
    light: {
      primary: "#4E73DF",
      primaryDark: "#1f1f1f",
      text: "#5a5c69",
      dark: "#5D5F6C",
      dark_area: "#5D5F6C33",
      border: "#373737",
      success: "#1cc88a",
      success_area: "#1cc88a33",
      danger: "#E74A3B",
      danger_area: "#E74A3B33",
      tick: "#E5E5E5"
    },
    dark: {
      primary: "#4E73DF",
      primaryDark: "#405FB9",
      text: "#D5D5DB",
      dark: "#D5D5DB",
      dark_area: "#D5D5DB33",
      border: "#373737",
      success: "#1cc88a",
      success_area: "#1cc88a33",
      danger: "#FF6662",
      danger_area: "#FF666233",
      tick: "#373737"
    }
  },
  creditos: [
    {
      name: "Nuxt.js",
      link: "https://nuxtjs.com",
      description: {
        en: "The Intuitive Vue Framework",
        es: "El Framework Intuitivo de Vue"
      },
      version: devDependencies.nuxt
    },
    {
      name: "Capacitor.js",
      link: "https://capacitorjs.com",
      description: {
        en: "Build cross-platform Native Progressive Web Apps for iOS, Android, and the Web",
        es: "Construye aplicaciones web progresivas nativas multiplataforma para iOS, Android y la Web"
      },
      version: devDependencies["@capacitor/core"]
    },
    {
      name: "Bootstrap",
      link: "https://getbootstrap.com",
      description: {
        en: "The world's most popular front-end open source toolkit",
        es: "El kit de herramientas de código abierto más popular del mundo para el desarrollo de front-end"
      },
      version: dependencies.bootstrap
    },
    {
      name: "Nuxt Icons",
      link: "https://github.com/gitFoxCode/nuxt-icons",
      description: {
        en: "A module for Nuxt 3 that allows you to use your own SVG icons quickly and enjoyably",
        es: "Un módulo para Nuxt 3 que te permite usar tus propios iconos SVG de forma rápida y agradable"
      },
      version: devDependencies["nuxt-icons"]
    },
    {
      name: "ESLint",
      link: "https://eslint.org",
      description: {
        en: "Find and fix problems in your JavaScript code",
        es: "Encuentra y soluciona problemas en tu código JavaScript"
      },
      version: devDependencies.eslint
    },
    {
      name: "Nuxt: eslint",
      link: "https://github.com/nuxt/eslint",
      description: {
        en: "ESLint shareable config for Nuxt.js",
        es: "Configuración compartida de ESLint para Nuxt.js"
      },
      version: devDependencies["@nuxt/eslint"]
    },
    {
      name: "Stylelint",
      link: "https://stylelint.io",
      description: {
        en: "A mighty, modern linter that helps you avoid errors and enforce conventions in your CSS",
        es: "Un poderoso linter moderno que ayuda a evitar errores y hacer cumplir convenciones CSS"
      },
      version: devDependencies.stylelint
    },
    {
      name: "Chart.js",
      link: "https://www.chartjs.org",
      description: {
        en: "Simple yet flexible JavaScript charting for designers & developers",
        es: "Gráficos JavaScript simples pero flexibles para diseñadores y desarrolladores"
      },
      version: dependencies["chart.js"]
    },
    {
      name: "Google Maps JavaScript API Loader",
      link: "https://github.com/googlemaps/js-api-loader",
      description: {
        en: "Create custom maps with the JavaScript Maps API",
        es: "Cree mapas personalizados con la API de JavaScript Maps"
      },
      version: dependencies["@googlemaps/js-api-loader"]
    },
    {
      name: "Leaflet.GeoSearch",
      link: "https://github.com/smeijer/leaflet-geosearch",
      description: {
        en: "GeoSearch plugin for Leaflet",
        es: "Plugin GeoSearch para Leaflet"
      },
      version: dependencies["leaflet-geosearch"]
    },
    {
      name: "Pinia: Nuxt",
      link: "https://github.com/vuejs/pinia/tree/v2/packages/nuxt#readme",
      description: {
        en: "Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support",
        es: "Store intuitivo, seguro, ligero y flexible para Vue utilizando la API de composición con soporte para DevTools"
      },
      version: dependencies["@pinia/nuxt"]
    },
    {
      name: "jeep-sqlite",
      link: "https://github.com/jepiqueau/jeep-sqlite",
      description: {
        en: "Stencil component to create SQLite database and query it in the browser",
        es: "Componente Stencil para crear una base de datos SQLite y consultarla en el navegador"
      },
      version: devDependencies["jeep-sqlite"]
    },
    {
      name: "Capacitor Community: SQLite",
      link: "https://github.com/capacitor-community/sqlite",
      description: {
        en: "Capacitor Community SQLite Plugin",
        es: "Plugin SQLite de la Comunidad Capacitor"
      },
      version: devDependencies["@capacitor-community/sqlite"]
    },
    {
      name: "Trapeze",
      link: "https://trapeze.dev/",
      description: {
        en: "A powerful native and cross-platform mobile project configuration toolbox",
        es: "Una poderosa herramientas de configuración de proyectos móviles nativos y multiplataforma"
      },
      version: devDependencies["@trapezedev/configure"]
    },
    {
      name: "drizzle-orm",
      link: "https://github.com/drizzle-team/drizzle-orm",
      description: {
        en: "TypeScript ORM that feels like writing SQL",
        es: "ORM de TypeScript que se siente como escribir SQL"
      },
      version: "0.35.3"
    },
    {
      name: "better-sqlite3",
      link: "https://github.com/WiseLibs/better-sqlite3",
      description: {
        en: "The fastest and simplest library for SQLite3 in Node.js",
        es: "La biblioteca más rápida y simple para SQLite3 en Node.js"
      },
      version: "11.5.0"
    },
    {
      name: "Changelogen",
      link: "https://github.com/unjs/changelogen",
      description: {
        en: "Beautiful Changelogs using Conventional Commits",
        es: "Changelogs hermosos usando Conventional Commits"
      },
      version: devDependencies.changelogen
    },
    {
      name: "GitHub Actions: Checkout",
      link: "https://github.com/actions/checkout",
      description: {
        en: "GitHub Action for checking out a repo",
        es: "Acción de GitHub para revisar un repositorio"
      },
      version: 4
    },
    {
      name: "GitHub Actions: Setup Node",
      link: "https://github.com/actions/setup-node",
      description: {
        en: "Set up your GitHub Actions workflow with a specific version of node.js",
        es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de node.js"
      },
      version: 4
    },
    {
      name: "GitHub Actions: Setup Java",
      link: "https://github.com/actions/setup-java",
      description: {
        en: "Set up your GitHub Actions workflow with a specific version of Java",
        es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de Java"
      },
      version: 4
    },
    {
      name: "GitHub Actions: Upload Artifact",
      link: "https://github.com/actions/upload-artifact",
      description: {
        en: "Upload a file or directory as a separate artifact for a workflow run",
        es: "Cargue un archivo o directorio como un artefacto separado para una ejecución de flujo de trabajo"
      },
      version: 4
    },
    {
      name: "Wrangler",
      link: "https://github.com/cloudflare/workers-sdk",
      description: {
        en: "The CLI for Cloudflare Workers",
        es: "La CLI para Cloudflare Workers"
      },
      version: "3.83.0"
    },
    {
      name: "Mustache",
      link: "https://github.com/janl/mustache.js",
      description: {
        en: "Minimal templating with {{mustaches}} in JavaScript",
        es: "Plantillas con {{mustaches}} en JavaScript"
      },
      version: "4.2.0"
    }
  ]
};
