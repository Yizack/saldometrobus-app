export default defineNuxtRouteMiddleware(async (to) => {
  if (!Auth().exists) {
    await Auth().restore();
    if (Auth().exists) {
      if (to.path === "/") {
        return navigateTo("/app/", { replace: true });
      }
    }
    else if (to.meta.layout === "main") {
      return navigateTo("/", { replace: true });
    }
  }
});
