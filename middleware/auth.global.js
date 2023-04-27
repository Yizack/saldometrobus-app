export default defineNuxtRouteMiddleware(async (to) => {
  if (!Auth().exists) {
    await Auth().restore();
    if (Auth().exists && to.path === "/") {
      const { $router } = useNuxtApp();
      $router.replace("/app/");
    }
  }
});
