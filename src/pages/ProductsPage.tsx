import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsRequested } from '@/store/products/products-slice';
import { searchChanged } from '@/store/search/search-slice';
import { ProductGrid } from '@/components/products/ProductGrid';
import {
  ALL_CATEGORIES,
  ProductFilters,
} from '@/components/products/ProductFilters';
import { sortProducts } from '@/lib/sort';
import type { SortOption } from '@/types';

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status: productsStatus } = useAppSelector((s) => s.products);
  const {
    query,
    results,
    status: searchStatus,
  } = useAppSelector((s) => s.search);

  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [sort, setSort] = useState<SortOption>('relevance');

  // Saga loads the full catalogue on mount.
  useEffect(() => {
    dispatch(fetchProductsRequested());
  }, [dispatch]);

  const categories = useMemo(
    () => [...new Set(items.map((p) => p.category))].sort(),
    [items],
  );

  const hasQuery = query.trim().length > 0;
  const base = hasQuery ? results : items;

  // Category filter + sort are pure client-side transforms over the base list.
  const visible = useMemo(() => {
    const filtered =
      category === ALL_CATEGORIES
        ? base
        : base.filter((p) => p.category === category);
    return sortProducts(filtered, sort);
  }, [base, category, sort]);

  const loading = hasQuery
    ? searchStatus === 'loading'
    : productsStatus === 'loading';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Товари</h1>
        <p className="text-muted-foreground">
          Живий пошук, фільтрування за категорією та сортування.
        </p>
      </div>

      <ProductFilters
        query={query}
        onQueryChange={(v) => dispatch(searchChanged(v))}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        sort={sort}
        onSortChange={setSort}
      />

      <ProductGrid products={visible} loading={loading} />
    </div>
  );
}
