<template>
  <main>
    <NavBar :title="t($route.meta.nav_title)" />
    <slot />
  </main>
</template>
