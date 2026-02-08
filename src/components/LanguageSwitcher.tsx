"use client";

import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
      <Button
        variant={language === 'tr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('tr')}
        className={`h-7 px-3 text-xs font-semibold transition-all ${
          language === 'tr'
            ? 'bg-amber-600 hover:bg-amber-700 text-white'
            : 'text-muted-foreground hover:text-white hover:bg-white/10'
        }`}
      >
        TR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`h-7 px-3 text-xs font-semibold transition-all ${
          language === 'en'
            ? 'bg-amber-600 hover:bg-amber-700 text-white'
            : 'text-muted-foreground hover:text-white hover:bg-white/10'
        }`}
      >
        ENG
      </Button>
    </div>
  );
}
