import { version, devDependencies, dependencies } from "./../package.json";

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
  status_url: "https://status.saldometrobus.yizack.com",
  email: "saldometrobus@yizack.com",
  privacy: lang => `https://yizack.com/legal/saldometrobus/${lang}/privacy.html`,
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
      name: "Nuxt Icon",
      link: "https://github.com/nuxt-modules/icon",
      description: {
        en: "Nuxt module to easily add icons to your nuxt project",
        es: "Módulo Nuxt para agregar fácilmente iconos a su proyecto nuxt"
      },
      version: devDependencies["nuxt-icon"]
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
      name: "Nuxt: eslint-config",
      link: "https://github.com/nuxt/eslint-config",
      description: {
        en: "ESLint shareable config for Nuxt.js",
        es: "Configuración compartida de ESLint para Nuxt.js"
      },
      version: devDependencies["@nuxtjs/eslint-config"]
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
      name: "PHP Mailer",
      link: "https://github.com/PHPMailer/PHPMailer",
      description: {
        en: "PHPMailer is a full-featured email creation and transfer class for PHP",
        es: "PHPMailer es una clase de creación y transferencia de correo electrónico con todas las funciones para PHP"
      },
      version: "6.8.0"
    },
    {
      name: "pgAdmin",
      link: "https://www.pgadmin.org",
      description: {
        en: "The Open Source Administration and Development Platform for PostgreSQL",
        es: "La plataforma de administración y desarrollo de código abierto para PostgreSQL"
      }
    },
    {
      name: "Husky",
      link: "https://typicode.github.io/husky",
      description: {
        en: "Modern native Git hooks made easy",
        es: "Lbibrería que facilita Hooks Git nativos modernos"
      },
      version: devDependencies.husky
    },
    {
      name: "Commitlint CLI",
      link: "https://commitlint.js.org",
      description: {
        en: "Lint commit messages",
        es: "Lint mensajes commit"
      },
      version: devDependencies["@commitlint/cli"]
    },
    {
      name: "Commitizen: conventional-changelog",
      link: "https://github.com/commitizen/cz-conventional-changelog",
      description: {
        en: "Conventional commit messages cli",
        es: "Mensajes de commit convencionales cli"
      },
      version: devDependencies["cz-conventional-changelog"]
    },
    {
      name: "GitHub Actions: Checkout",
      link: "https://github.com/actions/checkout",
      description: {
        en: "GitHub Action for checking out a repo",
        es: "Acción de GitHub para revisar un repositorio"
      },
      version: 3
    },
    {
      name: "GitHub Actions: Setup Node",
      link: "https://github.com/actions/setup-node",
      description: {
        en: "Set up your GitHub Actions workflow with a specific version of node.js",
        es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de node.js"
      },
      version: 3
    },
    {
      name: "GitHub Actions: Setup Java",
      link: "https://github.com/actions/setup-java",
      description: {
        en: "Set up your GitHub Actions workflow with a specific version of Java",
        es: "Configure su flujo de trabajo de GitHub Actions con una versión específica de Java"
      },
      version: 3
    },
    {
      name: "GitHub Actions: Upload Artifact",
      link: "https://github.com/actions/upload-artifact",
      description: {
        en: "Upload a file or directory as a separate artifact for a workflow run",
        es: "Cargue un archivo o directorio como un artefacto separado para una ejecución de flujo de trabajo"
      },
      version: 3
    }
  ]
};
