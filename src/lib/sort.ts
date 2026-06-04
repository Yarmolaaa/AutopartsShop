import type { Product, SortOption } from '@/types';

/** Pure, deterministic product sorting — no reason to involve anything else. */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'relevance':
    default:
      return copy;
  }
}
