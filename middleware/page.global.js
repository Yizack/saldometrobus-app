export default defineNuxtRouteMiddleware((to, from) => {
  const getDepth = (path) => {
    return path.split("/").filter(seg => seg.length > 0).length;
  };

  const toDepth = getDepth(to.path);
  const fromDepth = getDepth(from.path);

  if (toDepth > fromDepth) {
    to.meta.pageTransition = { name: "page-left" };
    from.meta.pageTransition = { name: "page-left" };
    to.meta.layoutTransition = { name: "page-left" };
    from.meta.layoutTransition = { name: "page-left" };
  }
  else {
    to.meta.pageTransition = { name: "page-right" };
    from.meta.pageTransition = { name: "page-right" };
    to.meta.layoutTransition = { name: "page-right" };
    from.meta.layoutTransition = { name: "page-right" };
  }
});
