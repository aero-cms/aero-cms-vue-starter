<script setup lang="ts">
const { data: menu } = await useMenu('header');
const items = computed(() => menu.value?.items ?? []);
const siteName = 'AeroCMS';
</script>

<template>
  <header class="site-header">
    <div class="container">
      <NuxtLink to="/" class="brand">{{ siteName }}</NuxtLink>
      <nav class="nav">
        <NuxtLink v-for="item in items" :key="item.id" :to="item.url || '#'">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink to="/haberler">Haberler</NuxtLink>
        <NuxtLink to="/etkinlikler">Etkinlikler</NuxtLink>
        <NuxtLink to="/arama">Arama</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.brand {
  font-weight: 700;
  font-size: 1.125rem;
}
</style>
