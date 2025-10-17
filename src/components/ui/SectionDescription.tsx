import { TypographyP } from "./typography";
import { useEffect, useState } from "react";

interface SectionDescriptionProps {
  defaultText: string;
  i18nKey: string;
  className?: string;
}

export function SectionDescription({ defaultText, i18nKey, className = "" }: SectionDescriptionProps) {
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
    <TypographyP className={`text-white leading-relaxed ${className}`}>
      {text}
    </TypographyP>
  );
}
