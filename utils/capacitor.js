import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Toast } from "@capacitor/toast";
import siteInfo from "~/siteInfo.js";

class CapacitorPlugins {
  async setStatusBar (isDark) {
    if (Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("StatusBar")) {
      const { dark, light } = siteInfo.colors;
      await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
      await StatusBar.setBackgroundColor({ color: isDark ? dark.primary : light.primary });
    }
  }

  isNative () {
    return Capacitor.isNativePlatform();
  }

  async setPref (name, value) {
    await Preferences.set({ key: name, value: JSON.stringify(value) });
  }

  async getPref (name) {
    const { value } = await Preferences.get({ key: name });
    return JSON.parse(value);
  }

  async removePref (name) {
    await Preferences.remove({ key: name });
  }

  showToast (text, duration, position) {
    return Toast.show({ text, duration, position });
  }
}

export const CAPACITOR = new CapacitorPlugins();
