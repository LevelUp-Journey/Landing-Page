import { Button } from "./button";
import { useEffect, useState } from "react";

interface CTAButtonProps {
  defaultText: string;
  i18nKey: string;
  href?: string;
}

export function CTAButton({ defaultText, i18nKey, href = "#" }: CTAButtonProps) {
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
    <a href={href}>
      <Button
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold inline-flex"
      >
        {text}
      </Button>
    </a>
  );
}
