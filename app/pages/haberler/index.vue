<script setup lang="ts">
const route = useRoute();
const page = Number(route.query.page) || 1;
const { data: newsRes, error } = await useNews({ page, pageSize: 12 });
const haberler = computed(() => newsRes.value ?? []);
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="page-title">Haberler</h1>
      <div v-if="error" class="error-box">Haberler yüklenemedi.</div>
      <div v-else-if="haberler.length" class="card-grid">
        <NuxtLink v-for="h in haberler" :key="h.id" :to="`/haberler/${h.id}`" class="card">
          <img v-if="h.gorselUrl" :src="h.gorselUrl" :alt="h.baslik" />
          <div class="card-body">
            <p class="meta">{{ new Date(h.yayinTarihi).toLocaleDateString('tr-TR') }}</p>
            <h3>{{ h.baslik }}</h3>
            <p>{{ h.ozet }}</p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="empty">Henüz haber bulunmuyor.</p>
    </div>
  </div>
</template>

<style scoped>
.meta {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>
