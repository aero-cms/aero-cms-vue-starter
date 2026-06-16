<script setup lang="ts">
const client = useCmsClient();
const { data: docs, error } = await useAsyncData('documents', async () => {
  const res = await client.getDocuments({ pageSize: 24 });
  return res.success ? res.data ?? [] : [];
});
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="page-title">Dokümanlar</h1>
      <div v-if="error" class="error-box">Dokümanlar yüklenemedi.</div>
      <ul v-else-if="docs?.length" class="doc-list">
        <li v-for="doc in docs" :key="doc.id">
          <a :href="doc.dosyaUrl || '#'" target="_blank" rel="noopener">{{ doc.baslik }}</a>
          <span v-if="doc.aciklama"> — {{ doc.aciklama }}</span>
        </li>
      </ul>
      <p v-else class="empty">Henüz doküman bulunmuyor.</p>
    </div>
  </div>
</template>

<style scoped>
.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.doc-list a {
  color: #2563eb;
  font-weight: 600;
}
</style>
