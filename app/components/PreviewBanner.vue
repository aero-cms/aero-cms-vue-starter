<script setup lang="ts">
import { useCmsPreview } from '../composables/useCmsPreview';

const { isPreview } = useCmsPreview();
</script>

<template>
  <div v-if="isPreview" class="preview-banner">
    <span aria-hidden="true">👁</span>
    CMS Canlı Önizleme Modu — Değişiklikler henüz kaydedilmedi
    <span class="pulse" />
  </div>
</template>

<style scoped>
.preview-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
}

.pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
