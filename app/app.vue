<template>
  <div class="app-shell" :class="{ 'is-preview': isPreview }">
    <PreviewBanner />
    <AppHeader />
    <main class="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useCmsPreview } from '@aero-cms/vue-sdk';
import { mergeComponentContent } from '~/lib/cms-content';
import { siteSeoSchema } from '~/lib/schemas';

const { isPreview } = useCmsPreview();

const langOptions = useCmsLangOptions();
const { data: seoApi } = await useComponentContent(siteSeoSchema.key, langOptions);
const seo = computed(() => mergeComponentContent(siteSeoSchema, seoApi.value ?? undefined));

useSeoMeta({
  title: () => seo.value.siteTitle,
  description: () => seo.value.siteDescription,
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell.is-preview {
  padding-top: 32px;
}

.main {
  flex: 1;
}
</style>
