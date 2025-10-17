import { TypographyLead } from "./typography";
import { useEffect, useState } from "react";

interface HeroSubtitleProps {
  defaultText: string;
  i18nKey: string;
}

export function HeroSubtitle({ defaultText, i18nKey }: HeroSubtitleProps) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    const updateTranslation = async () => {
      const lang = localStorage.getItem('language') || 'es';
      const translations = await import(`../../i18n/locales/${lang}.json`);

      const keys = i18nKey.split('.');
      let value: any = translations.default;
      for (const k of keys) {
        value = value?.[k];
      }

      if (value) setText(value);
    };

    updateTranslation();

    window.addEventListener('languagechange', updateTranslation);
    return () => window.removeEventListener('languagechange', updateTranslation);
  }, [i18nKey]);

  return (
    <TypographyLead className="text-gray-200 max-w-3xl mx-auto mb-12 text-lg md:text-xl lg:text-2xl">
      {text}
    </TypographyLead>
  );
}
