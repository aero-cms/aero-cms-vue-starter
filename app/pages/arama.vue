<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const searchInput = ref(String(route.query.q ?? ''));
const q = computed(() => String(route.query.q ?? ''));
const lang = useRequestLang();
const client = useCmsClient();
const { data: results } = await useAsyncData(
  () => `search-${q.value}-${lang.value ?? ''}`,
  async () => {
    if (!q.value.trim()) return [];
    const res = await client.search(q.value, {
      pageSize: 20,
      ...(lang.value ? { lang: lang.value } : {}),
    });
    return res.success ? res.data ?? [] : [];
  },
  { watch: [q, lang] },
);

function runSearch() {
  router.push({ path: '/arama', query: { q: searchInput.value } });
}
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="page-title">Arama</h1>
      <form class="search-form" @submit.prevent="runSearch">
        <input v-model="searchInput" type="search" placeholder="Site içinde ara..." />
        <button class="submit-btn" type="submit">Ara</button>
      </form>
      <ul v-if="results?.length" class="results">
        <li v-for="(item, i) in results" :key="i">
          <NuxtLink :to="item.url || '#'">{{ item.title }}</NuxtLink>
          <p>{{ item.excerpt }}</p>
        </li>
      </ul>
      <p v-else-if="q" class="empty">Sonuç bulunamadı.</p>
    </div>
  </div>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.search-form input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.results {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.results a {
  color: #2563eb;
  font-weight: 600;
}
</style>
