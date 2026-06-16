import { computed, inject, provide, ref, toValue, type InjectionKey, type MaybeRefOrGetter, type Ref } from 'vue';

export const cmsPreviewKey: InjectionKey<CmsPreviewContext> = Symbol('aero-cms-preview');

export interface CmsPreviewContext {
  isPreview: Ref<boolean>;
  previewData: Ref<Record<string, Record<string, string>>>;
  highlightedComponent: Ref<string | null>;
  getPreviewContent: (componentKey: string) => Record<string, string> | null;
}

export function createPreviewState(): CmsPreviewContext {
  const isPreview = ref(false);
  const previewData = ref<Record<string, Record<string, string>>>({});
  const highlightedComponent = ref<string | null>(null);

  return {
    isPreview,
    previewData,
    highlightedComponent,
    getPreviewContent(componentKey: string) {
      return previewData.value[componentKey] ?? null;
    },
  };
}

export function bindPreviewListeners(ctx: CmsPreviewContext, allowedOrigins: string[]) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  ctx.isPreview.value = params.get('cms-preview') === 'true';
  if (!ctx.isPreview.value) return;

  let highlightTimer: ReturnType<typeof setTimeout> | undefined;

  window.addEventListener('message', (event) => {
    if (allowedOrigins.length > 0 && !allowedOrigins.includes(event.origin)) return;

    const data = event.data;
    if (data?.type !== 'aero-cms-preview') return;

    switch (data.action) {
      case 'ping':
        window.parent.postMessage(
          { type: 'aero-cms-preview-ack', action: 'pong', ready: true },
          allowedOrigins[0] ?? '*',
        );
        break;
      case 'update':
        if (data.componentKey && data.fields) {
          ctx.previewData.value = {
            ...ctx.previewData.value,
            [data.componentKey]: data.fields,
          };
        }
        break;
      case 'highlight':
        if (data.componentKey) {
          ctx.highlightedComponent.value = data.componentKey;
          if (highlightTimer) clearTimeout(highlightTimer);
          highlightTimer = setTimeout(() => {
            ctx.highlightedComponent.value = null;
          }, 3000);
        }
        break;
    }
  });
}

export function useCmsPreview(): CmsPreviewContext {
  const ctx = inject(cmsPreviewKey);
  if (!ctx) {
    throw new Error('useCmsPreview() requires cms-preview plugin.');
  }
  return ctx;
}

export function usePreviewableContent(
  componentKey: MaybeRefOrGetter<string>,
  serverContent: MaybeRefOrGetter<Record<string, string>>,
) {
  const { isPreview, getPreviewContent, highlightedComponent } = useCmsPreview();

  const content = computed(() => {
    const server = toValue(serverContent);
    const key = toValue(componentKey);
    const draft = getPreviewContent(key);
    return isPreview.value && draft ? { ...server, ...draft } : server;
  });

  const isHighlighted = computed(() => highlightedComponent.value === toValue(componentKey));

  return { content, isHighlighted, isPreview };
}
