export const LANG_COOKIE = 'aero_lang';

export function langQuery(lang?: string): string {
  return lang ? `?lang=${encodeURIComponent(lang)}` : '';
}
