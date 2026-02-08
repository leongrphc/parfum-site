"use client";

import { Formula } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function MyLab({ formulas, onLoad, onDelete }: { formulas: Formula[], onLoad: (formula: Formula) => void, onDelete: (id: string) => void }) {
  const { t } = useLanguage();

  if (formulas.length === 0) {
    return (
      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-amber-500">{t('myLab')}</CardTitle>
          <CardDescription>{t('noFormulas')}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm w-full">
      <CardHeader>
        <CardTitle className="text-amber-500">{t('myLab')} ({formulas.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {formulas.map((formula) => (
          <div key={formula.id} className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-200">{formula.name || t('unnamedFormula')}</h4>
                <div className="text-xs text-amber-500/80 font-mono">{formula.essence.muadil}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(formula.date).toLocaleDateString()}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(formula.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px] text-gray-400 text-center font-mono bg-black/40 p-2 rounded">
               <div>
                  <div className="text-amber-500">{t('essence')}</div>
                  <div>{formula.ratios.essence.percentage}%</div>
                  <div>{formula.ratios.essence.gr.toFixed(1)}g</div>
               </div>
               <div>
                  <div className="text-blue-400">{t('water')}</div>
                  <div>{formula.ratios.water.percentage}%</div>
                  <div>{formula.ratios.water.gr.toFixed(1)}g</div>
               </div>
               <div>
                  <div className="text-purple-400">{t('fixative')}</div>
                  <div>{formula.ratios.fixative.percentage}%</div>
                  <div>{formula.ratios.fixative.gr.toFixed(1)}g</div>
               </div>
               <div>
                  <div className="text-gray-300">{t('alcohol')}</div>
                  <div>{formula.ratios.alcohol.percentage}%</div>
                  <div>{formula.ratios.alcohol.gr.toFixed(1)}g</div>
               </div>
            </div>

            {onLoad && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 text-xs border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
                onClick={() => onLoad(formula)}
              >
                {t('load')}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
