<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug));
const lang = useRequestLang();
const { data: page, error } = await usePage(slug, { lang });
</script>

<template>
  <article class="section">
    <div class="container article">
      <div v-if="error || !page" class="error-box">Sayfa bulunamadı.</div>
      <template v-else>
        <h1>{{ page.title }}</h1>
        <div v-html="page.content" />
      </template>
    </div>
  </article>
</template>

<style scoped>
.article {
  max-width: 48rem;
}
</style>
