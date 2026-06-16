<script setup lang="ts">
const { data: newsRes } = await useNews({ pageSize: 6 });
const { data: eventsRes } = await useEvents({ pageSize: 4 });
const haberler = computed(() => newsRes.value ?? []);
const etkinlikler = computed(() => eventsRes.value ?? []);
</script>

<template>
  <section class="hero">
    <div class="container">
      <h1>AeroCMS</h1>
      <p>Kurumsal web sitenizi kolayca yönetin</p>
      <div class="btn-row">
        <NuxtLink to="/haberler" class="btn btn-primary">Haberler</NuxtLink>
        <NuxtLink to="/etkinlikler" class="btn btn-secondary">Etkinlikler</NuxtLink>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="page-title">Son Haberler</h2>
      <div v-if="haberler.length" class="card-grid">
        <NuxtLink v-for="haber in haberler" :key="haber.id" :to="`/haberler/${haber.id}`" class="card">
          <img v-if="haber.gorselUrl" :src="haber.gorselUrl" :alt="haber.baslik" />
          <div class="card-body">
            <p class="meta">{{ new Date(haber.yayinTarihi).toLocaleDateString('tr-TR') }}</p>
            <h3>{{ haber.baslik }}</h3>
            <p>{{ haber.ozet }}</p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="empty">Henüz haber bulunmuyor.</p>
    </div>
  </section>

  <section class="section section-muted">
    <div class="container">
      <h2 class="page-title">Yaklaşan Etkinlikler</h2>
      <div v-if="etkinlikler.length" class="card-grid">
        <NuxtLink v-for="e in etkinlikler" :key="e.id" :to="`/etkinlikler/${e.id}`" class="card">
          <div class="card-body">
            <h3>{{ e.baslik }}</h3>
            <p>{{ e.konum }}</p>
            <p>{{ e.aciklama }}</p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="empty">Henüz etkinlik bulunmuyor.</p>
    </div>
  </section>
</template>

<style scoped>
.meta {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0 0 0.5rem;
}

h3 {
  margin: 0 0 0.5rem;
}
</style>
