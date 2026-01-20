"use client";

import { useState, useMemo } from 'react';
import { Essence, Formula } from '@/lib/types';

const ALCOHOL_DENSITY = 0.81;
const WATER_DENSITY = 1.0;
const FIXATIVE_DENSITY = 1.05; // Approximation

export const useCalculator = () => {
  const [totalVolume, setTotalVolume] = useState<number>(100);
  const [targetConcentration, setTargetConcentration] = useState<number>(20);
  const [essence, setEssence] = useState<Essence | null>(null);
  
  // Auxiliary ingredients (percentages of remaining volume or total? Usually total formula %)
  // Standard: Essence % + Alcohol % + Water % + Fixative % = 100%
  // Here we let user define Essence %, Water %, Fixative %. Alcohol fills the rest.
  const [waterPercentage, setWaterPercentage] = useState<number>(0);
  const [fixativePercentage, setFixativePercentage] = useState<number>(0);

  const results = useMemo(() => {
    if (!essence) return null;

    const essenceDensity = essence.yogunluk ? parseFloat(String(essence.yogunluk)) : 0.95;
    
    // Validate inputs
    const totalPercentage = targetConcentration + waterPercentage + fixativePercentage;
    const alcoholPercentage = Math.max(0, 100 - totalPercentage);

    // Volumes (ml)
    const essenceVol = (totalVolume * targetConcentration) / 100;
    const waterVol = (totalVolume * waterPercentage) / 100;
    const fixativeVol = (totalVolume * fixativePercentage) / 100;
    const alcoholVol = (totalVolume * alcoholPercentage) / 100;

    // Weights (gr)
    const essenceWeight = essenceVol * essenceDensity;
    const waterWeight = waterVol * WATER_DENSITY;
    const fixativeWeight = fixativeVol * FIXATIVE_DENSITY;
    const alcoholWeight = alcoholVol * ALCOHOL_DENSITY;

    return {
      essence: { ml: essenceVol, gr: essenceWeight, percentage: targetConcentration },
      water: { ml: waterVol, gr: waterWeight, percentage: waterPercentage },
      fixative: { ml: fixativeVol, gr: fixativeWeight, percentage: fixativePercentage },
      alcohol: { ml: alcoholVol, gr: alcoholWeight, percentage: alcoholPercentage },
      totalWeight: essenceWeight + waterWeight + fixativeWeight + alcoholWeight,
      isValid: totalPercentage <= 100
    };
  }, [totalVolume, targetConcentration, essence, waterPercentage, fixativePercentage]);

  const reset = () => {
    setTotalVolume(100);
    setTargetConcentration(20);
    setEssence(null);
    setWaterPercentage(0);
    setFixativePercentage(0);
  };

  return {
    totalVolume, setTotalVolume,
    targetConcentration, setTargetConcentration,
    essence, setEssence,
    waterPercentage, setWaterPercentage,
    fixativePercentage, setFixativePercentage,
    results,
    reset
  };
};
