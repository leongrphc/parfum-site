"use client";

import { motion } from "framer-motion";

interface BottleVisualizerProps {
  essencePct: number;
  alcoholPct: number;
  waterPct: number;
  fixativePct: number;
}

export function BottleVisualizer({ essencePct, alcoholPct, waterPct, fixativePct }: BottleVisualizerProps) {
  // Normalize percentages to be stacked
  // Bottle is 200px height. 
  // We stack from bottom: Essence -> Fixative -> Water -> Alcohol (Density order usually?)
  // Heaviest bottom? Essence is dense/heavy. Fixative is heavy.
  // Order: Fixative (Bottom) -> Essence -> Water -> Alcohol (Top)
  
  const total = essencePct + alcoholPct + waterPct + fixativePct;
  // If invalid > 100, we clamp/warn elsewhere. Here we render what we get relative to 100% height?
  
  const alcoholHeight = `${alcoholPct}%`;
  const waterHeight = `${waterPct}%`;
  const essenceHeight = `${essencePct}%`;
  const fixativeHeight = `${fixativePct}%`;

  return (
    <div className="relative w-32 h-64 mx-auto perspective-1000">
      {/* Bottle Glass */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-t-3xl rounded-b-xl bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)]">
        
        {/* Liquid Stack */}
        <div className="absolute bottom-0 w-full h-full flex flex-col-reverse justify-start">
          
          {/* Fixative - Amber/Dark */}
          {fixativePct > 0 && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: fixativeHeight }}
              className="w-full bg-amber-900/80 backdrop-blur-sm relative transition-all duration-700 ease-out"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
            </motion.div>
          )}

          {/* Essence - Gold/Yellow */}
          {essencePct > 0 && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: essenceHeight }}
              className="w-full bg-yellow-500/60 backdrop-blur-sm relative transition-all duration-700 ease-out"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
            </motion.div>
          )}

          {/* Water - Blue/Clear */}
          {waterPct > 0 && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: waterHeight }}
              className="w-full bg-blue-400/30 backdrop-blur-sm relative transition-all duration-700 ease-out"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
            </motion.div>
          )}

           {/* Alcohol - Clear/White */}
           {alcoholPct > 0 && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: alcoholHeight }}
              className="w-full bg-indigo-50/10 backdrop-blur-sm relative transition-all duration-700 ease-out"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-white/10" />
            </motion.div>
          )}
          
        </div>

        {/* Shine/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none rounded-t-3xl rounded-b-xl" />
      </div>
      
      {/* Cap */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-10 bg-gradient-to-br from-amber-200 to-amber-600 rounded-sm shadow-lg" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-800" />
    </div>
  );
}
