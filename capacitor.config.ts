import type { CapacitorConfig } from "@capacitor/cli";

export default {
  appId: "com.yizack.saldometrobus",
  appName: "Saldo Metrobús Panamá",
  webDir: ".output/public",
  server: {
    androidScheme: "https",
    hostname: "saldometrobus.yizack.com"
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 200,
      androidScaleType: "CENTER_CROP",
      splashFullScreen: false,
      splashImmersive: false,
      backgroundColor: "#F8F9FC"
    },
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase",
      iosIsEncryption: false,
      iosKeychainPrefix: "cap",
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite",
        biometricSubTitle: "Log in using your biometric"
      },
      electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
      electronMacLocation: "Yizack/CapacitorDatabases",
      electronLinuxLocation: "Databases"
    },
    EdgeToEdge: {
      backgroundColor: "#4E73DF"
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
} satisfies CapacitorConfig;
