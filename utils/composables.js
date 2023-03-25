export const scrollBehavior = () => {
  const { $router } = useNuxtApp();
  $router.options.scrollBehavior = (to) => {
    if (to.hash === "") {
      return { left: 0, top: 0 };
    }
    else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, top: 48, left: 0, behavior: "smooth" });
        }, 500);
      });
    }
  };
};
