<template>
  <main>
    <MainNavbar :title="STRINGS.get('app_name')" />
    <div class="m-2">
      <slot />
    </div>
  </main>
</template>
