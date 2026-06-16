<script setup lang="ts">
const route = useRoute();
const id = Number(route.params.id);
const client = useCmsClient();
const { data: haber, error } = await useAsyncData(`haber-${id}`, async () => {
  const res = await client.getNewsById(id);
  return res.success ? res.data ?? null : null;
});
</script>

<template>
  <article class="section">
    <div class="container article">
      <div v-if="error || !haber" class="error-box">Haber bulunamadı.</div>
      <template v-else>
        <NuxtLink to="/haberler">← Haberler</NuxtLink>
        <h1>{{ haber.baslik }}</h1>
        <p class="meta">{{ new Date(haber.yayinTarihi).toLocaleDateString('tr-TR') }}</p>
        <img v-if="haber.gorselUrl" :src="haber.gorselUrl" :alt="haber.baslik" class="cover" />
        <div v-html="haber.icerik" />
      </template>
    </div>
  </article>
</template>

<style scoped>
.article {
  max-width: 48rem;
}

.meta {
  color: #6b7280;
}

.cover {
  width: 100%;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}
</style>
