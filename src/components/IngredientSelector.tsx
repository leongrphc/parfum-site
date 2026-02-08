"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Essence } from "@/lib/types";
import essencesData from "@/data/essences.json";

interface IngredientSelectorProps {
  value: Essence | null;
  onChange: (essence: Essence) => void;
}

export function IngredientSelector({ value, onChange }: IngredientSelectorProps) {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Limiting results for performance, as 1900 items might be heavy in a simple list without virtualization
  // But standard command might handle it.

  const filteredEssences = React.useMemo(() => {
    if (!search) return essencesData.slice(0, 50);
    return essencesData.filter((item) =>
      item.muadil.toLowerCase().includes(search.toLowerCase()) ||
      item.brand_search.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 50);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 text-lg bg-background/50 backdrop-blur-sm border-amber-500/20 hover:border-amber-500/50 transition-all font-serif"
        >
          <span className="truncate text-left flex-1">
            {value ? `${value.sku} - ${value.muadil}` : t('selectEssencePlaceholder')}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-zinc-950 border-zinc-800" align="start">
        <div className="flex flex-col max-h-[300px]">
          <div className="flex items-center border-b border-zinc-800 px-3">
             <input
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
             {filteredEssences.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">{t('noEssenceFound')}</div>
             ) : (
                filteredEssences.map((essence) => (
                   <div
                      key={essence.sku}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-zinc-800 hover:text-zinc-50 transition-colors",
                         value?.sku === essence.sku && "bg-zinc-800 text-zinc-50"
                      )}
                      onClick={() => {
                         onChange(essence);
                         setOpen(false);
                      }}
                   >
                     <Check
                       className={cn(
                         "mr-2 h-4 w-4 shrink-0",
                         value?.sku === essence.sku ? "opacity-100" : "opacity-0"
                       )}
                     />
                     <div className="flex flex-col min-w-0 flex-1">
                       <span className="font-semibold truncate">{essence.muadil}</span>
                       <span className="text-xs text-muted-foreground truncate">{essence.brand_search} ({essence.sku})</span>
                     </div>
                   </div>
                ))
             )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
