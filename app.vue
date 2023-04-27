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
    const { $router } = useNuxtApp();
    CAPACITOR.onBack((canGoBack) => {
      if (CAPACITOR.isAndroid()) {
        if (!canGoBack) {
          CAPACITOR.exit();
        }
        else {
          $router.back();
        }
      }
    });
  },
  async unmounted () {
    await DB.close();
  }
};
</script>

<style>
.page-left-enter-active,
.page-right-enter-active,
.page-left-leave-active,
.page-right-leave-active {
  position: fixed;
  left: 0;
  right: 0;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: stretch;
  transition: all 0.3s linear;
}
.page-left-enter-from, .page-right-leave-to {
  transform: translateX(100%);
}
.page-left-leave-to, .page-right-enter-from {
  transform: translateX(-100%);
}
.page-left-enter-to, .page-right-enter-to {
  transform: translateX(0);
}
</style>
