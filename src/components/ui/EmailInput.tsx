import { Input } from "./input";
import { useEffect, useState } from "react";

interface EmailInputProps {
  placeholder: string;
}

export function EmailInput({ placeholder }: EmailInputProps) {
  const [placeholderText, setPlaceholderText] = useState(placeholder);

  useEffect(() => {
    const updateTranslation = async () => {
      const lang = localStorage.getItem('language') || 'es';
      const translations = await import(`../../i18n/locales/${lang}.json`);
      setPlaceholderText(translations.default.section1.emailPlaceholder);
    };

    updateTranslation();

    window.addEventListener('languagechange', updateTranslation);
    return () => window.removeEventListener('languagechange', updateTranslation);
  }, []);

  return (
    <Input
      type="email"
      placeholder={placeholderText}
      className="w-full sm:flex-1 px-8 bg-neutral-900/80 border-neutral-700 text-white placeholder:text-gray-400 focus-visible:ring-red-600 focus-visible:border-transparent"
    />
  );
}
