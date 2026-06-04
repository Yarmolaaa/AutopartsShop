import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortOption } from '@/types';

export const ALL_CATEGORIES = 'all';

interface ProductFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function ProductFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Пошук товарів…"
          className="pl-9"
          aria-label="Пошук товарів"
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="sm:w-44" aria-label="Фільтр за категорією">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_CATEGORIES}>Усі категорії</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="sm:w-44" aria-label="Сортування">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">За релевантністю</SelectItem>
          <SelectItem value="price-asc">Ціна: від низької</SelectItem>
          <SelectItem value="price-desc">Ціна: від високої</SelectItem>
          <SelectItem value="rating-desc">За рейтингом</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
