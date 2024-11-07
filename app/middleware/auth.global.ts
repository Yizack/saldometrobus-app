export default defineNuxtRouteMiddleware(async (to) => {
  const auth = Auth();
  if (!auth.exists) {
    await auth.restore();
    if (auth.exists) {
      if (to.path === "/") {
        return navigateTo("/app/", { replace: true });
      }
    }
    else if (to.meta.layout === "main") {
      return navigateTo("/", { replace: true });
    }
  }
});
