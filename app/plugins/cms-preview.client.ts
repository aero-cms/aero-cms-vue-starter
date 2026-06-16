import { bindPreviewListeners, cmsPreviewKey, createPreviewState } from '../composables/useCmsPreview';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const ctx = createPreviewState();

  if (import.meta.client) {
    bindPreviewListeners(ctx, [config.public.adminOrigin as string].filter(Boolean));
  }

  nuxtApp.vueApp.provide(cmsPreviewKey, ctx);
});
