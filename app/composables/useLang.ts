import { LANG_COOKIE } from '~/lib/i18n';

export function useRequestLang() {
  return useCookie<string | null>(LANG_COOKIE, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });
}

export function useCmsLangOptions() {
  const lang = useRequestLang();
  return computed(() => {
    const value = lang.value;
    return value ? { lang: value } : undefined;
  });
}

export function useCmsLangParams<T extends Record<string, unknown>>(params: MaybeRefOrGetter<T>) {
  const lang = useRequestLang();
  return computed(() => {
    const base = toValue(params);
    return lang.value ? { ...base, lang: lang.value } : base;
  });
}
