<script setup lang="ts">
import { usePreviewableContent } from '@aero-cms/vue-sdk';
import { mergeComponentContent } from '~/lib/cms-content';
import { siteHeaderSchema } from '~/lib/schemas';

const langOptions = useCmsLangOptions();
const { data: headerApi } = await useComponentContent(siteHeaderSchema.key, langOptions);
const { data: menu } = await useMenu('header');
const { data: languagesRes } = await useLanguages();

const serverContent = computed(() =>
  mergeComponentContent(siteHeaderSchema, headerApi.value ?? undefined),
);
const { content, isHighlighted } = usePreviewableContent(siteHeaderSchema.key, serverContent);
const items = computed(() => menu.value?.items ?? []);
const languages = computed(() =>
  (languagesRes.value ?? []).filter((l) => l.isActive).map((l) => ({
    code: l.code,
    name: l.name,
    isDefault: l.isDefault,
  })),
);
</script>

<template>
  <header
    class="site-header"
    data-cms-component="site-header"
    :class="{ 'is-highlighted': isHighlighted }"
  >
    <div class="container">
      <NuxtLink to="/" class="brand">{{ content.siteName }}</NuxtLink>
      <div class="header-actions">
        <nav class="nav">
          <NuxtLink v-for="item in items" :key="item.id" :to="item.url || '#'">
            {{ item.label }}
          </NuxtLink>
          <NuxtLink to="/arama">Arama</NuxtLink>
        </nav>
        <LanguageSwitcher :languages="languages" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.brand {
  font-weight: 700;
  font-size: 1.125rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.is-highlighted {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
