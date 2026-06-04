import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

const product: Product = {
  id: 1,
  title: 'Бездротові навушники',
  description: 'З шумозаглушенням',
  price: 199.99,
  category: 'Електроніка',
  image: 'data:image/svg+xml,placeholder',
  rating: 4.6,
  stock: 24,
};

describe('ProductCard', () => {
  it('renders title, price, category and the action buttons', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('Бездротові навушники')).toBeInTheDocument();
    expect(screen.getByText('199,99 ₴')).toBeInTheDocument();
    expect(screen.getByText('Електроніка')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /до кошика/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /детальніше/i }),
    ).toHaveAttribute('href', '/products/1');
  });

  it('matches the snapshot', () => {
    const { container } = renderWithProviders(<ProductCard product={product} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
