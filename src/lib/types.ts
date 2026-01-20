export interface Essence {
  sku: string;
  muadil: string;
  yogunluk: string | number;
  brand_search: string;
}

export interface Formula {
  id: string;
  name: string;
  date: string;
  totalVolume: number;
  targetConcentration: number;
  essence: Essence;
  notes?: string;
  costs?: {
    total: number;
    currency: string;
  };
  ratios: {
    essence: { gr: number; ml: number; percentage: number };
    alcohol: { gr: number; ml: number; percentage: number };
    water: { gr: number; ml: number; percentage: number };
    fixative: { gr: number; ml: number; percentage: number };
  };
}

export type SolventType = 'alcohol' | 'oil' | 'water';
