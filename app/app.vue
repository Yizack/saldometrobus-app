<script setup lang="ts">
const { $router } = useNuxtApp();

$router.options.scrollBehavior = to => new Promise((resolve) => {
  if (!to.hash) return resolve({ left: 0, top: 0 });
  setTimeout(() => resolve({ el: to.hash, top: 48, left: 0, behavior: "smooth" }), 500);
});

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
  CAPACITOR.onBack((canGoBack) => {
    if (!canGoBack) CAPACITOR.exit();
    else $router.back();
  });
}

onUnmounted(async () => {
  await DB.close();
});
</script>

<template>
  <NuxtLoadingIndicator :throttle="0" />
  <NuxtLayout>
    <div id="page">
      <NuxtPage class="p-2" />
    </div>
  </NuxtLayout>
</template>
