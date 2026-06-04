import { sortProducts } from './sort';
import type { Product } from '@/types';

const make = (id: number, price: number, rating: number): Product => ({
  id,
  title: `P${id}`,
  description: '',
  price,
  category: 'X',
  image: '',
  rating,
  stock: 1,
});

const products = [make(1, 30, 4.0), make(2, 10, 4.9), make(3, 20, 4.5)];

describe('sortProducts', () => {
  it('sorts by price ascending', () => {
    expect(sortProducts(products, 'price-asc').map((p) => p.id)).toEqual([
      2, 3, 1,
    ]);
  });

  it('sorts by price descending', () => {
    expect(sortProducts(products, 'price-desc').map((p) => p.id)).toEqual([
      1, 3, 2,
    ]);
  });

  it('sorts by rating descending', () => {
    expect(sortProducts(products, 'rating-desc').map((p) => p.id)).toEqual([
      2, 3, 1,
    ]);
  });

  it('keeps original order for relevance', () => {
    expect(sortProducts(products, 'relevance').map((p) => p.id)).toEqual([
      1, 2, 3,
    ]);
  });

  it('does not mutate the input array', () => {
    const original = [...products];
    sortProducts(products, 'price-asc');
    expect(products).toEqual(original);
  });
});
