"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";

interface CostCalculatorProps {
  essayWeight: number;    // gr
  alcoholMl: number;
  waterMl: number;
  fixativeMl: number;
  onCostUpdate: (total: number, currency: string) => void;
}

export function CostCalculator({ essayWeight, alcoholMl, waterMl, fixativeMl, onCostUpdate }: CostCalculatorProps) {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState("₺");
  const [essenceCostPerGr, setEssenceCostPerGr] = useState<number>(0);
  const [alcoholCostPerLiter, setAlcoholCostPerLiter] = useState<number>(0);
  const [fixativeCostPerGr, setFixativeCostPerGr] = useState<number>(0);
  const [bottleCost, setBottleCost] = useState<number>(0);

  // Calculate total
  const totalEssenceCost = essayWeight * essenceCostPerGr;
  const totalAlcoholCost = (alcoholMl / 1000) * alcoholCostPerLiter;
  const totalFixativeCost = fixativeMl * (fixativeCostPerGr); // assuming fixative is like essence, per gram
  // Water is negligible? Let's ignore or assume free (aqua).

  const totalProductionCost = totalEssenceCost + totalAlcoholCost + totalFixativeCost + bottleCost;

  useEffect(() => {
    onCostUpdate(totalProductionCost, currency);
  }, [totalProductionCost, currency, onCostUpdate]);

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
       <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-green-400">
            <Coins className="w-4 h-4" /> {t('costCalculator')}
          </CardTitle>
       </CardHeader>
       <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
             <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{t('essenceCost')}</Label>
                <Input
                  type="number"
                  className="h-7 text-xs bg-black/20 border-white/10"
                  placeholder="0.00"
                  value={essenceCostPerGr || ''}
                  onChange={e => setEssenceCostPerGr(parseFloat(e.target.value))}
                />
             </div>
             <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{t('alcoholCost')}</Label>
                <Input
                  type="number"
                  className="h-7 text-xs bg-black/20 border-white/10"
                  placeholder="0.00"
                  value={alcoholCostPerLiter || ''}
                  onChange={e => setAlcoholCostPerLiter(parseFloat(e.target.value))}
                />
             </div>
             <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{t('fixativeCost')}</Label>
                <Input
                  type="number"
                  className="h-7 text-xs bg-black/20 border-white/10"
                  placeholder="0.00"
                  value={fixativeCostPerGr || ''}
                  onChange={e => setFixativeCostPerGr(parseFloat(e.target.value))}
                />
             </div>
             <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">{t('bottleCost')}</Label>
                <Input
                  type="number"
                  className="h-7 text-xs bg-black/20 border-white/10"
                  placeholder="0.00"
                  value={bottleCost || ''}
                  onChange={e => setBottleCost(parseFloat(e.target.value))}
                />
             </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
             <span className="text-xs text-muted-foreground">{t('totalCost')}</span>
             <span className="text-lg font-bold text-green-400 font-mono">
                {totalProductionCost.toFixed(2)} {currency}
             </span>
          </div>
       </CardContent>
    </Card>
  );
}
