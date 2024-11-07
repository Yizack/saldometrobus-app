<template>
  <NuxtLoadingIndicator :throttle="0" />
  <NuxtLayout>
    <div id="page">
      <NuxtPage class="p-2" />
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  name: "App",
  async setup () {
    scrollBehavior();

    await DB.setup(CONST.database);

    await CONFIG.load();
    await CAPACITOR.setStatusBar(true);
    if (CAPACITOR.isAndroid()) {
      try {
        await CAPACITOR.startFlexibleUpdate();
      }
      catch (e) {
        console.warn(e);
      }
    }

    if (CAPACITOR.isAndroid()) {
      const { $router } = useNuxtApp();
      CAPACITOR.onBack((canGoBack) => {
        if (!canGoBack) {
          CAPACITOR.exit();
        }
        else {
          $router.back();
        }
      });
    }
  },
  async unmounted () {
    await DB.close();
  }
};
</script>
