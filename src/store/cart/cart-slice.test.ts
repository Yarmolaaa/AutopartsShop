import reducer, {
  addToCart,
  clearCart,
  placeOrder,
  removeFromCart,
  selectCartCount,
  selectCartTotal,
  setQuantity,
} from './cart-slice';
import type { Product, ShippingDetails } from '@/types';

const make = (id: number, price: number, stock: number): Product => ({
  id,
  title: `Товар ${id}`,
  description: '',
  price,
  category: 'C',
  image: '',
  rating: 4,
  stock,
});

const initial = reducer(undefined, { type: '@@INIT' });

describe('cart slice', () => {
  it('adds a new product with quantity 1', () => {
    const s = reducer(initial, addToCart(make(1, 10, 5)));
    expect(s.items).toHaveLength(1);
    expect(s.items[0].quantity).toBe(1);
  });

  it('increments quantity for an existing product, capped at stock', () => {
    let s = reducer(initial, addToCart(make(1, 10, 2)));
    s = reducer(s, addToCart(make(1, 10, 2)));
    expect(s.items[0].quantity).toBe(2);
    s = reducer(s, addToCart(make(1, 10, 2))); // would be 3, but stock is 2
    expect(s.items[0].quantity).toBe(2);
  });

  it('removes a product', () => {
    let s = reducer(initial, addToCart(make(1, 10, 5)));
    s = reducer(s, removeFromCart(1));
    expect(s.items).toHaveLength(0);
  });

  it('clamps setQuantity between 1 and stock', () => {
    let s = reducer(initial, addToCart(make(1, 10, 3)));
    s = reducer(s, setQuantity({ id: 1, quantity: 99 }));
    expect(s.items[0].quantity).toBe(3);
    s = reducer(s, setQuantity({ id: 1, quantity: 0 }));
    expect(s.items[0].quantity).toBe(1);
  });

  it('clears the cart', () => {
    let s = reducer(initial, addToCart(make(1, 10, 5)));
    s = reducer(s, clearCart());
    expect(s.items).toHaveLength(0);
  });

  it('computes count and total via selectors', () => {
    let s = reducer(initial, addToCart(make(1, 10, 5)));
    s = reducer(s, setQuantity({ id: 1, quantity: 3 }));
    s = reducer(s, addToCart(make(2, 20, 5)));
    const state = { cart: s };
    expect(selectCartCount(state)).toBe(4); // 3 + 1
    expect(selectCartTotal(state)).toBe(50); // 3*10 + 1*20
  });

  it('empties the cart and records the order id on checkout success', () => {
    let s = reducer(initial, addToCart(make(1, 10, 5)));
    const shipping = {} as ShippingDetails;
    s = reducer(
      s,
      placeOrder.fulfilled({ orderId: 'UA-1001' }, 'req', {
        items: [{ id: 1, quantity: 1 }],
        total: 10,
        shipping,
      }),
    );
    expect(s.items).toHaveLength(0);
    expect(s.lastOrderId).toBe('UA-1001');
    expect(s.orderStatus).toBe('succeeded');
  });
});
