import { TypographyH1 } from "./typography";
import { useEffect, useState } from "react";

interface HeroTitleProps {
  defaultText: string;
  i18nKey: string;
}

export function HeroTitle({ defaultText, i18nKey }: HeroTitleProps) {
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
    <TypographyH1 className="text-white mb-6">
      {text}
    </TypographyH1>
  );
}
