import { Card, CardContent } from "./card";
import { TypographyH3, TypographyP } from "./typography";
import { useEffect, useState } from "react";

interface FeatureCardProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  defaultTitle: string;
  defaultDescription: string;
}

export function FeatureCard({
  icon,
  titleKey,
  descriptionKey,
  defaultTitle,
  defaultDescription
}: FeatureCardProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  useEffect(() => {
    const updateTranslation = async () => {
      const lang = localStorage.getItem('language') || 'es';
      const translations = await import(`../../i18n/locales/${lang}.json`);

      const keys = titleKey.split('.');
      let titleValue: any = translations.default;
      for (const k of keys) {
        titleValue = titleValue?.[k];
      }

      const descKeys = descriptionKey.split('.');
      let descValue: any = translations.default;
      for (const k of descKeys) {
        descValue = descValue?.[k];
      }

      if (titleValue) setTitle(titleValue);
      if (descValue) setDescription(descValue);
    };

    updateTranslation();

    window.addEventListener('languagechange', updateTranslation);
    return () => window.removeEventListener('languagechange', updateTranslation);
  }, [titleKey, descriptionKey]);

  return (
    <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={icon} alt={title} className="w-5 h-5" />
          <TypographyH3 className="text-white">
            {title}
          </TypographyH3>
        </div>
        <TypographyP className="text-gray-400 leading-relaxed [&:not(:first-child)]:mt-0">
          {description}
        </TypographyP>
      </CardContent>
    </Card>
  );
}
