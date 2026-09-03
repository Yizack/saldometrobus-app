<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";

defineProps<{
  title: string;
}>();

const showAbout = ref(false);
const showDrawer = ref(false);

const logout = async () => {
  navigateTo("/", { replace: true });
  nextTick(async () => {
    await DB.deleteAll();
    await Auth().logout();
  });
};

const hideDrawer = () => {
  showDrawer.value = false;
};

const menu: NavigationMenuItem[][] = [
  [
    {
      label: t("tarjetas"),
      icon: "card",
      to: "/app/",
      onSelect: hideDrawer
    },
    {
      label: t("perfil"),
      icon: "profile",
      to: "/app/perfil/",
      onSelect: hideDrawer
    },
    {
      label: t("rutas"),
      icon: "bus",
      to: "/app/mibus/",
      onSelect: hideDrawer
    },
    {
      label: t("direcciones"),
      icon: "directions",
      to: "/app/direcciones/",
      onSelect: hideDrawer
    },
    {
      label: t("donar"),
      icon: "donate",
      to: "/app/donar/",
      onSelect: hideDrawer
    }
  ],
  [
    {
      label: t("salir"),
      icon: "logout",
      onSelect: logout
    }
  ]
];

const more: DropdownMenuItem[] = [
  {
    label: t("config"),
    icon: "settings",
    to: "/app/prefs/config/"
  },
  {
    label: t("acerca"),
    icon: "about",
    onSelect: () => {
      showAbout.value = true;
    }
  },
  {
    label: t("privacidad"),
    icon: "privacy",
    onSelect: () => {
      CAPACITOR.openBrowser(CONST.privacy(t("lang_code")));
    }
  },
  {
    label: t("rate"),
    icon: "star",
    onSelect: () => {
      CAPACITOR.openBrowser(CONST.googlePlay);
    }
  },
  {
    label: t("creditos"),
    icon: "credits",
    to: "/app/prefs/creditos/"
  }
];
</script>

<template>
  <UHeader :title="title" class="bg-primary sticky-top shadow-sm" :toggle="false">
    <template #left>
      <div class="text-inverted flex items-center gap-4">
        <UDrawer v-model:open="showDrawer" direction="left" :ui="{ content: 'w-full' }" :handle="false">
          <UButton icon="hamburger" variant="link" class="text-inverted!" size="xl" />
          <template #content>
            <UButton icon="x" class="absolute top-4 right-4 text-inverted/70! hover:text-inverted!" variant="link" color="neutral" @click="showDrawer = false" />
            <div class="flex-col w-full">
              <div class="py-5 px-4 rounded-b-2xl bg-primary text-inverted mb-2 shadow-lg">
                <img class="rounded-full bg-white p-1" src="/images/logo2.webp" width="70" height="70">
                <h5 id="menuLabel" class="text-lg font-semibold">{{ Auth().user.nombre }}</h5>
                <div>{{ Auth().user.email }}</div>
              </div>
              <UNavigationMenu :items="menu" orientation="vertical" />
            </div>
          </template>
        </UDrawer>
        <h1 class="text-xl">{{ title }}</h1>
      </div>
    </template>
    <template #right>
      <UDropdownMenu :items="more" arrow :modal="false">
        <UButton icon="more" variant="link" class="text-inverted!" size="xl" />
      </UDropdownMenu>
    </template>
  </UHeader>
  <AboutDialog v-model="showAbout" />
</template>
