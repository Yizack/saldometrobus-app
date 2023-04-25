import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Toast } from "@capacitor/toast";
import { Dialog } from "@capacitor/dialog";
import { Network } from "@capacitor/network";
import { Browser } from "@capacitor/browser";
import { Clipboard } from "@capacitor/clipboard";

const error_conexion = { error: true, error_key: "error_conexion" };
const error_response = { error: true, error_key: "error" };

class CapacitorPlugins {
  async setStatusBar (isDark) {
    if (Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("StatusBar")) {
      const { dark, light } = CONST.colors;
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
    console.info(text);
    return Toast.show({ text, duration, position });
  }

  async isOnline () {
    const status = await Network.getStatus();
    return status.connected;
  }

  async doGet (url) {
    const GET = CapacitorHttp.get({ url }).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      else {
        return error_response;
      }
    }).catch(() => error_response);

    return await this.isOnline() ? GET : error_conexion;
  };

  async doPost (url, payload) {
    const options = {
      url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: new URLSearchParams(payload).toString()
    };

    const POST = CapacitorHttp.post(options).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      else {
        return error_response;
      }
    }).catch(() => error_response);

    return await this.isOnline() ? POST : error_conexion;
  };

  async confirm (title, message) {
    const { value } = await Dialog.confirm({ title, message, okButtonTitle: "Ok", cancelButtonTitle: t("cancel") });
    return value;
  }

  async openBrowser (url = "") {
    await Browser.open({ url, toolbarColor: CONST.colors.light.primary });
  }

  writeToClipboard (string = "") {
    Clipboard.write({ string }).then(() => {
      this.showToast(t("copied"));
    });
  };
}

export const CAPACITOR = new CapacitorPlugins();