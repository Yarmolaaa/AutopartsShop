import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { ProductFilters } from './ProductFilters';

// Stateful harness so the controlled input accumulates text like the real page.
function Harness({ spy }: { spy: jest.Mock }) {
  const [q, setQ] = useState('');
  return (
    <ProductFilters
      query={q}
      onQueryChange={(v) => {
        setQ(v);
        spy(v);
      }}
      category="all"
      onCategoryChange={() => {}}
      categories={['Electronics']}
      sort="relevance"
      onSortChange={() => {}}
    />
  );
}

describe('ProductFilters', () => {
  it('fires onQueryChange on every keystroke (live search)', async () => {
    const spy = jest.fn();
    renderWithProviders(<Harness spy={spy} />);

    const input = screen.getByLabelText('Пошук товарів');
    await userEvent.type(input, 'abc');

    expect(spy).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue('abc');
    expect(spy).toHaveBeenLastCalledWith('abc');
  });
});
