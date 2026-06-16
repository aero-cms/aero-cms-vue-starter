<script setup lang="ts">
const { data: eventsRes, error } = await useEvents(useCmsLangParams({ pageSize: 12 }));
const etkinlikler = computed(() => eventsRes.value ?? []);
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="page-title">Etkinlikler</h1>
      <div v-if="error" class="error-box">Etkinlikler yüklenemedi.</div>
      <div v-else-if="etkinlikler.length" class="card-grid">
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
  </div>
</template>
