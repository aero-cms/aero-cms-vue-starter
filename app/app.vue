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

const { isPreview } = useCmsPreview();
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
