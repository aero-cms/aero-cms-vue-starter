<script setup lang="ts">
import { LANG_COOKIE } from '~/lib/i18n';

interface LanguageOption {
  code: string;
  name: string;
  isDefault?: boolean;
}

const props = defineProps<{
  languages: LanguageOption[];
}>();

const langCookie = useCookie<string | null>(LANG_COOKIE, {
  maxAge: 60 * 60 * 24 * 365,
  path: '/',
  sameSite: 'lax',
});

const active = computed(() => {
  if (langCookie.value) return langCookie.value;
  return props.languages.find((l) => l.isDefault)?.code ?? props.languages[0]?.code ?? '';
});

function handleChange(event: Event) {
  const next = (event.target as HTMLSelectElement).value;
  langCookie.value = next;
  refreshNuxtData();
}
</script>

<template>
  <select
    v-if="languages.length > 1"
    aria-label="Dil seçimi"
    class="lang-select"
    :value="active"
    @change="handleChange"
  >
    <option v-for="lang in languages" :key="lang.code" :value="lang.code">
      {{ lang.name }}
    </option>
  </select>
</template>

<style scoped>
.lang-select {
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #fff;
  color: #374151;
}
</style>
