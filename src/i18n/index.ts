import en from './locales/en.json';
import es from './locales/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'es';

export const ui = {
  en,
  es,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }
}
