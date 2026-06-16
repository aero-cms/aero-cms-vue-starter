import {
  bindCmsPreviewListeners,
  cmsPreviewKey,
  createCmsPreviewState,
} from '@aero-cms/vue-sdk';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const ctx = createCmsPreviewState();
  const adminOrigin = config.public.adminOrigin as string;

  if (import.meta.client && adminOrigin) {
    bindCmsPreviewListeners(ctx, {
      allowedOrigins: [adminOrigin],
      targetOrigin: adminOrigin,
    });
  }

  nuxtApp.vueApp.provide(cmsPreviewKey, ctx);
});
