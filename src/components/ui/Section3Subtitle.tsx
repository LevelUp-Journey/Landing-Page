import { TypographyH3 } from "./typography";
import { useEffect, useState } from "react";

interface Section3SubtitleProps {
  defaultText: string;
  i18nKey: string;
}

export function Section3Subtitle({ defaultText, i18nKey }: Section3SubtitleProps) {
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
    <TypographyH3 className="text-gray-300 mb-5 text-xl font-semibold">
      {text}
    </TypographyH3>
  );
}
