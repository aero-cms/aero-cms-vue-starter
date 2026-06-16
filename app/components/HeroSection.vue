<script setup lang="ts">
import { heroSchema } from '~/lib/schemas';
import { mergeComponentContent } from '~/lib/cms-content';
import { usePreviewableContent } from '~/composables/useCmsPreview';

const { data: heroApi } = await useComponentContent(heroSchema.key);
const serverContent = computed(() => mergeComponentContent(heroSchema, heroApi.value ?? undefined));
const { content, isHighlighted } = usePreviewableContent(heroSchema.key, serverContent);
</script>

<template>
  <section
    class="hero"
    data-cms-component="hero-section"
    :class="{ 'is-highlighted': isHighlighted }"
  >
    <div class="container">
      <h1>{{ content.title }}</h1>
      <p>{{ content.subtitle }}</p>
      <div class="btn-row">
        <NuxtLink :to="content.ctaLink1" class="btn btn-primary">{{ content.ctaText1 }}</NuxtLink>
        <NuxtLink :to="content.ctaLink2" class="btn btn-secondary">{{ content.ctaText2 }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.is-highlighted {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
