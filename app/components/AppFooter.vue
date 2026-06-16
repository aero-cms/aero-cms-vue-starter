<script setup lang="ts">
import { usePreviewableContent } from '@aero-cms/vue-sdk';
import { mergeComponentContent } from '~/lib/cms-content';
import { siteFooterSchema } from '~/lib/schemas';

const langOptions = useCmsLangOptions();
const { data: footerApi } = await useComponentContent(siteFooterSchema.key, langOptions);
const { data: menu } = await useMenu('footer');

const serverContent = computed(() =>
  mergeComponentContent(siteFooterSchema, footerApi.value ?? undefined),
);
const { content, isHighlighted } = usePreviewableContent(siteFooterSchema.key, serverContent);
const items = computed(() => menu.value?.items ?? []);
</script>

<template>
  <footer
    class="site-footer"
    data-cms-component="site-footer"
    :class="{ 'is-highlighted': isHighlighted }"
  >
    <div class="container footer-grid">
      <div>
        <p class="footer-brand">{{ content.siteName }}</p>
        <p class="footer-desc">{{ content.description }}</p>
      </div>
      <div v-if="items.length">
        <p class="footer-heading">Hızlı Linkler</p>
        <nav class="footer-links">
          <NuxtLink v-for="item in items" :key="item.id" :to="item.url || '#'">
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <div>
        <p class="footer-heading">İletişim</p>
        <NuxtLink to="/iletisim" class="footer-links">İletişim Formu</NuxtLink>
      </div>
    </div>
    <div class="container footer-copy">
      <p>© {{ new Date().getFullYear() }} {{ content.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding-bottom: 1.5rem;
}

.footer-brand {
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #fff;
}

.footer-desc {
  margin: 0;
  font-size: 0.875rem;
}

.footer-heading {
  margin: 0 0 0.75rem;
  font-weight: 600;
  color: #fff;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.footer-copy {
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
}

.footer-copy p {
  margin: 0;
}

.is-highlighted {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
