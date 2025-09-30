import { ui, defaultLang } from './index';

export function getStoredLanguage(): keyof typeof ui {
  if (typeof window === 'undefined') return defaultLang;

  const stored = localStorage.getItem('language');
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  return defaultLang;
}

export function translate(lang: keyof typeof ui, key: string): string {
  const keys = key.split('.');
  let value: any = ui[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
