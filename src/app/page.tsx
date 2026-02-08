"use client";

import { useState, useEffect, useCallback } from "react";
import { useCalculator } from "@/hooks/useCalculator";
import { useLanguage } from "@/context/LanguageContext";
import { IngredientSelector } from "@/components/IngredientSelector";
import { BottleVisualizer } from "@/components/BottleVisualizer";
import { MyLab } from "@/components/MyLab";
import { CostCalculator } from "@/components/CostCalculator";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Beaker, Wine, Droplets, SprayCan, RotateCcw } from "lucide-react";
import { Formula } from "@/lib/types";

export default function Home() {
  const { t } = useLanguage();
  const {
    totalVolume, setTotalVolume,
    targetConcentration, setTargetConcentration,
    essence, setEssence,
    waterPercentage, setWaterPercentage,
    fixativePercentage, setFixativePercentage,
    results,
    reset
  } = useCalculator();

  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [notes, setNotes] = useState("");
  const [costs, setCosts] = useState<{total: number, currency: string} | undefined>(undefined);

  // Load initial formulas
  useEffect(() => {
    const stored = localStorage.getItem('perfume-lab-formulas');
    if (stored) {
      try {
        setFormulas(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse formulas", e);
      }
    }
  }, []);

  const handleSave = () => {
    if (!results || !essence) return;

    const newFormula: Formula = {
      id: crypto.randomUUID(),
      name: `${essence.muadil} Formulation`,
      date: new Date().toISOString(),
      totalVolume,
      targetConcentration,
      essence,
      notes,
      costs,
      ratios: results
    };

    const updatedFormulas = [newFormula, ...formulas];
    setFormulas(updatedFormulas);
    localStorage.setItem('perfume-lab-formulas', JSON.stringify(updatedFormulas));

    // Clear optional fields after save
    setNotes("");
  };

  const handleDelete = (id: string) => {
    const updatedFormulas = formulas.filter(f => f.id !== id);
    setFormulas(updatedFormulas);
    localStorage.setItem('perfume-lab-formulas', JSON.stringify(updatedFormulas));
  };

  const loadFormula = (f: Formula) => {
    setTotalVolume(f.totalVolume);
    setTargetConcentration(f.targetConcentration);
    setEssence(f.essence);
    setWaterPercentage(f.ratios.water.percentage);
    setFixativePercentage(f.ratios.fixative.percentage);
    setNotes(f.notes || "");
  };

  const handleCostUpdate = useCallback((total: number, currency: string) => {
    setCosts({ total, currency });
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <header className="mb-8 text-center md:text-left flex justify-between items-end">
        <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-700 bg-clip-text text-transparent drop-shadow-sm font-serif">
            {t('title')}
            </h1>
            <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-white">
                <RotateCcw className="w-4 h-4 mr-2" /> {t('reset')}
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-500">
                <Beaker className="w-5 h-5" /> {t('ingredients')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('fragranceEssence')}</Label>
                <IngredientSelector value={essence} onChange={setEssence} />
                {essence && (
                   <div className="text-xs text-muted-foreground flex justify-between px-1">
                     <span>{t('density')}: {essence.yogunluk || "0.95"} g/ml</span>
                     <span>{t('brand')}: {essence.brand_search}</span>
                   </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>{t('totalVolume')}</Label>
                  <span className="font-mono text-amber-500">{totalVolume} ml</span>
                </div>
                <Slider
                  value={[totalVolume]}
                  onValueChange={(v) => setTotalVolume(v[0])}
                  max={500}
                  step={10}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>{t('concentration')}</Label>
                  <span className="font-mono text-amber-500">{targetConcentration}%</span>
                </div>
                <Slider
                  value={[targetConcentration]}
                  onValueChange={(v) => setTargetConcentration(v[0])}
                  max={40}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>EDT (10%)</span>
                  <span>EDP (20%)</span>
                  <span>Parfum (30%)</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">{t('auxiliary')}</Label>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <Label className="font-normal flex items-center gap-2"><Droplets className="w-3 h-3 text-blue-400"/> {t('waterAqua')}</Label>
                        <span className="font-mono text-blue-400">{waterPercentage}%</span>
                    </div>
                    <Slider
                    value={[waterPercentage]}
                    onValueChange={(v) => setWaterPercentage(v[0])}
                    max={20}
                    step={0.5}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <Label className="font-normal flex items-center gap-2"><SprayCan className="w-3 h-3 text-purple-400"/> {t('fixative')}</Label>
                        <span className="font-mono text-purple-400">{fixativePercentage}%</span>
                    </div>
                    <Slider
                    value={[fixativePercentage]}
                    onValueChange={(v) => setFixativePercentage(v[0])}
                    max={10}
                    step={0.5}
                    />
                </div>
              </div>

            </CardContent>
          </Card>

          {results && (
              <CostCalculator
                essayWeight={results.essence.gr}
                alcoholMl={results.alcohol.ml}
                waterMl={results.water.ml}
                fixativeMl={results.fixative.ml}
                onCostUpdate={handleCostUpdate}
              />
          )}

        </div>

        {/* MIDDLE COLUMN: Visualizer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center min-h-[300px] lg:min-h-auto relative">
           <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-3xl transform scale-75 animate-pulse" />
           <BottleVisualizer
             essencePct={results?.essence.percentage || 0}
             alcoholPct={results?.alcohol.percentage || 0}
             waterPct={results?.water.percentage || 0}
             fixativePct={results?.fixative.percentage || 0}
           />
           {results && (
              <div className="mt-8 text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-gray-200">{results.totalWeight.toFixed(1)} <span className="text-sm text-gray-500">gr</span></div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t('totalWeight')}</div>
              </div>
           )}
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-500">
                <Wine className="w-5 h-5" /> {t('formulation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                {!results ? (
                    <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                        {t('selectEssence')}
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <ResultRow label={t('essenceOil')} color="bg-yellow-500" data={results.essence} />
                            <ResultRow label={t('alcoholSolvent')} color="bg-indigo-500" data={results.alcohol} />
                            <ResultRow label={t('water')} color="bg-blue-500" data={results.water} />
                            <ResultRow label={t('fixative')} color="bg-purple-500" data={results.fixative} />
                        </div>

                        <div className="mt-auto pt-6 space-y-3">
                             <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">{t('notes')}</Label>
                                <Textarea
                                   className="bg-black/20 border-white/10 min-h-[80px] text-xs"
                                   placeholder={t('notesPlaceholder')}
                                   value={notes}
                                   onChange={(e) => setNotes(e.target.value)}
                                />
                             </div>

                            {results.isValid ? (
                                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold" onClick={handleSave}>
                                    <Save className="mr-2 w-4 h-4" /> {t('saveFormula')}
                                </Button>
                            ) : (
                                <div className="text-red-400 text-center text-sm font-semibold border border-red-500/20 bg-red-500/10 p-2 rounded">
                                    {t('errorExceeds')}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM ROW: MyLab */}
        <div className="lg:col-span-12">
            <MyLab formulas={formulas} onLoad={loadFormula} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, color, data }: { label: string, color: string, data: { gr: number, ml: number, percentage: number } }) {
    if (data.percentage <= 0) return null;
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${color}`} />
                <div>
                    <div className="text-sm font-medium text-gray-200">{label}</div>
                    <div className="text-xs text-muted-foreground">{data.percentage}%</div>
                </div>
            </div>
            <div className="text-right">
                 <div className="font-mono font-bold text-amber-500">{data.gr.toFixed(2)} <span className="text-xs text-gray-500">gr</span></div>
                 <div className="text-xs font-mono text-gray-400">{data.ml.toFixed(1)} ml</div>
            </div>
        </div>
    )
}
