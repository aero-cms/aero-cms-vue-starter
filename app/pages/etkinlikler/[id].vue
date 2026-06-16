<script setup lang="ts">
const route = useRoute();
const id = Number(route.params.id);
const client = useCmsClient();
const { data: etkinlik, error } = await useAsyncData(`etkinlik-${id}`, async () => {
  const res = await client.getEventById(id);
  return res.success ? res.data ?? null : null;
});
</script>

<template>
  <article class="section">
    <div class="container article">
      <div v-if="error || !etkinlik" class="error-box">Etkinlik bulunamadı.</div>
      <template v-else>
        <NuxtLink to="/etkinlikler">← Etkinlikler</NuxtLink>
        <h1>{{ etkinlik.baslik }}</h1>
        <p class="meta">{{ etkinlik.konum }} · {{ new Date(etkinlik.baslangicTarihi).toLocaleString('tr-TR') }}</p>
        <div v-html="etkinlik.aciklama" />
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
</style>
