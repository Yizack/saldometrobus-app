import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Toast } from "@capacitor/toast";
import { Dialog } from "@capacitor/dialog";
import { Network } from "@capacitor/network";
import { Browser } from "@capacitor/browser";
import { Clipboard } from "@capacitor/clipboard";
import { AppUpdate, AppUpdateAvailability, FlexibleUpdateInstallStatus } from "@capawesome/capacitor-app-update";

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

  isAndroid () {
    return Capacitor.getPlatform() === "android";
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
  }

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
  }

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
  }

  exit () {
    App.exitApp();
  }

  onBack (callback = () => {}) {
    App.addListener("backButton", ({ canGoBack }) => callback(canGoBack));
  }

  async startFlexibleUpdate () {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.flexibleUpdateAllowed) {
      await AppUpdate.startFlexibleUpdate();
      this.addFlexibleListener();
    }
  }

  async completeFlexibleUpdate () {
    await AppUpdate.completeFlexibleUpdate();
  }

  addFlexibleListener () {
    AppUpdate.addListener("onFlexibleUpdateStateChange", async (state) => {
      switch(state.installStatus) {
      case FlexibleUpdateInstallStatus.DOWNLOADING:
        this.showToast(t("downloading_update"));
        break;
      case FlexibleUpdateInstallStatus.DOWNLOADED:
        await AppUpdate.removeAllListeners();
        await this.completeFlexibleUpdate();
        break;
      case FlexibleUpdateInstallStatus.FAILED:
        this.showToast(t("error_update"));
        break;
      }
    });
  }
}

export const CAPACITOR = new CapacitorPlugins();
