<script setup lang="ts">
import { mergeComponentContent } from '~/lib/cms-content';
import { usePreviewableContent } from '@aero-cms/vue-sdk';

const props = defineProps<{
  schema: { key: string; fields: Record<string, { default?: string | number | boolean }> };
  viewAllHref: string;
}>();

const { data: apiData } = await useComponentContent(props.schema.key);
const serverContent = computed(() => mergeComponentContent(props.schema, apiData.value ?? undefined));
const { content, isHighlighted } = usePreviewableContent(props.schema.key, serverContent);
</script>

<template>
  <div
    class="section-header"
    :data-cms-component="schema.key"
    :class="{ 'is-highlighted': isHighlighted }"
  >
    <h2 class="page-title">{{ content.sectionTitle }}</h2>
    <NuxtLink :to="viewAllHref" class="view-all">{{ content.viewAllText }}</NuxtLink>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.page-title {
  margin: 0;
}

.view-all {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.is-highlighted {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
