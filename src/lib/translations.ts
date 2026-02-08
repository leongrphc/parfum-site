export const translations = {
  tr: {
    // Header
    title: "Perfume Lab",
    subtitle: "Profesyonel Formülasyon & Oran Hesaplayıcı",
    reset: "Sıfırla",

    // Ingredients Card
    ingredients: "Malzemeler",
    fragranceEssence: "Parfüm Esansı",
    density: "Yoğunluk",
    brand: "Marka",
    totalVolume: "Toplam Hacim",
    concentration: "Konsantrasyon (Esans)",
    auxiliary: "Yardımcı",
    waterAqua: "Su (Aqua)",
    fixative: "Fiksatif",

    // Formulation Card
    formulation: "Formülasyon",
    selectEssence: "Oranları görmek için esans seçin.",
    essenceOil: "Esans Yağı",
    alcoholSolvent: "Alkol (Çözücü)",
    water: "Su",
    notes: "Notlar",
    notesPlaceholder: "Olgunlaşma veya prosedür hakkında notlar ekleyin...",
    saveFormula: "Formülü Kaydet",
    errorExceeds: "Hata: Toplam %100'ü aşıyor",
    totalWeight: "Toplam Ağırlık",

    // MyLab
    myLab: "Laboratuvarım",
    noFormulas: "Henüz kayıtlı formülün yok.",
    unnamedFormula: "Adsız Formül",
    essence: "Esans",
    alcohol: "Alkol",
    load: "Yükle",

    // IngredientSelector
    selectEssencePlaceholder: "Esans Seçiniz...",
    searchPlaceholder: "Marka, İsim veya SKU ara...",
    noEssenceFound: "Esans bulunamadı.",

    // CostCalculator
    costCalculator: "Maliyet Hesaplayıcı (Birim)",
    essenceCost: "Esans (₺/gr)",
    alcoholCost: "Alkol (₺/Litre)",
    fixativeCost: "Fiksatif (₺/ml)",
    bottleCost: "Şişe/Kutu (Adet)",
    totalCost: "Toplam Maliyet:",
  },
  en: {
    // Header
    title: "Perfume Lab",
    subtitle: "Professional Formulation & Ratio Calculator",
    reset: "Reset",

    // Ingredients Card
    ingredients: "Ingredients",
    fragranceEssence: "Fragrance Essence",
    density: "Density",
    brand: "Brand",
    totalVolume: "Total Volume",
    concentration: "Concentration (Essence)",
    auxiliary: "Auxiliary",
    waterAqua: "Water (Aqua)",
    fixative: "Fixative",

    // Formulation Card
    formulation: "Formulation",
    selectEssence: "Select an essence to see ratios.",
    essenceOil: "Essence Oil",
    alcoholSolvent: "Alcohol (Solvent)",
    water: "Water",
    notes: "Notes",
    notesPlaceholder: "Add notes about maturation or procedure...",
    saveFormula: "Save Formula",
    errorExceeds: "Error: Total exceeds 100%",
    totalWeight: "Total Weight",

    // MyLab
    myLab: "My Lab",
    noFormulas: "No saved formulas yet.",
    unnamedFormula: "Unnamed Formula",
    essence: "Essence",
    alcohol: "Alcohol",
    load: "Load",

    // IngredientSelector
    selectEssencePlaceholder: "Select Essence...",
    searchPlaceholder: "Search brand, name or SKU...",
    noEssenceFound: "No essence found.",

    // CostCalculator
    costCalculator: "Cost Calculator (Unit)",
    essenceCost: "Essence (₺/gr)",
    alcoholCost: "Alcohol (₺/Liter)",
    fixativeCost: "Fixative (₺/ml)",
    bottleCost: "Bottle/Box (Unit)",
    totalCost: "Total Cost:",
  }
};

export type Language = 'tr' | 'en';
export type TranslationKey = keyof typeof translations.tr;
