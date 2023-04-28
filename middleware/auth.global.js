export default defineNuxtRouteMiddleware(async (to) => {
  if (!Auth().exists) {
    await Auth().restore();
    if (Auth().exists && to.path === "/") {
      return navigateTo("/app/", { replace: true });
    }
  }
});
