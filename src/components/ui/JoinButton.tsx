import { Button } from "./button";
import { useEffect, useState } from "react";

interface JoinButtonProps {
  text: string;
}

export function JoinButton({ text }: JoinButtonProps) {
  const [buttonText, setButtonText] = useState(text);

  useEffect(() => {
    const updateTranslation = async () => {
      const lang = localStorage.getItem('language') || 'es';
      const translations = await import(`../../i18n/locales/${lang}.json`);
      setButtonText(translations.default.section1.button);
    };

    updateTranslation();

    // Listen for language changes
    window.addEventListener('languagechange', updateTranslation);
    return () => window.removeEventListener('languagechange', updateTranslation);
  }, []);

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto h-14 px-10 py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white"
    >
      {buttonText}
    </Button>
  );
}
