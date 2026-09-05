import { devDependencies, dependencies } from "./../../package.json";

export const CREDITS = [
  {
    name: "Nuxt",
    link: "https://nuxt.com",
    description: {
      en: "The full-stack Vue Framework",
      es: "El framework de Vue Full-Stack"
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
    name: "Nuxt UI",
    link: "https://ui.nuxt.com",
    description: {
      en: "The official component library for Nuxt",
      es: "La biblioteca de componentes oficial para Nuxt"
    },
    version: dependencies["@nuxt/ui"]
  },
  {
    name: "Nuxt Icon",
    link: "https://github.com/nuxt/icon",
    description: {
      en: "The Icon module for Nuxt",
      es: "El módulo de Iconos para Nuxt"
    },
    version: devDependencies["@nuxt/icon"]
  },
  {
    name: "MailChannels Node.js SDK",
    link: "https://docs.mailchannels.com/email-api/javascript/quickstart",
    description: {
      en: "Email API for sending transactional emails",
      es: "API de correo electrónico para el envío de correos transaccionales"
    },
    version: "1.5.2"
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
      en: "Create custom maps with the JavaScript Google Maps API",
      es: "Cree mapas personalizados con la API de JavaScript de Google Maps"
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
      en: "Intuitive, type safe, light and flexible Store for Vue using the Composition API",
      es: "Store intuitivo, seguro, ligero y flexible para Vue utilizando Composition API"
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
    version: "0.45.2"
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
    version: 7
  },
  {
    name: "GitHub Actions: Setup Node",
    link: "https://github.com/actions/setup-node",
    description: {
      en: "Set up your GitHub Actions workflow with a specific version of node.js",
      es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de node.js"
    },
    version: 7
  },
  {
    name: "GitHub Actions: Setup Java",
    link: "https://github.com/actions/setup-java",
    description: {
      en: "Set up your GitHub Actions workflow with a specific version of Java",
      es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de Java"
    },
    version: 5
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
    version: "4.120.0"
  }
];
