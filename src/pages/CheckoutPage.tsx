import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  placeOrder,
  resetOrder,
  selectCartItems,
  selectCartTotal,
} from '@/store/cart/cart-slice';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { OrderPayload, ShippingDetails } from '@/types';

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const { orderStatus, lastOrderId } = useAppSelector((s) => s.cart);

  // Starting a fresh checkout? Clear any previous order state.
  useEffect(() => {
    if (items.length > 0) dispatch(resetOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Order confirmation -------------------------------------------------
  if (orderStatus === 'succeeded' && lastOrderId) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-green-600" />
        <h1 className="text-3xl font-bold">Дякуємо за замовлення!</h1>
        <p className="text-muted-foreground">
          Номер вашого замовлення:{' '}
          <span className="font-semibold text-foreground">{lastOrderId}</span>
        </p>
        <Button
          onClick={() => {
            dispatch(resetOrder());
            navigate('/products');
          }}
        >
          Продовжити покупки
        </Button>
      </div>
    );
  }

  // Empty cart and nothing ordered → nothing to check out.
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const onSubmit = async (shipping: ShippingDetails) => {
    const payload: OrderPayload = {
      items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
      total,
      shipping,
    };
    const result = await dispatch(placeOrder(payload));
    if (placeOrder.rejected.match(result)) {
      throw new SubmissionError({
        _error: result.payload ?? 'Не вдалося оформити замовлення',
      });
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Оформлення замовлення
        </h1>
        <CheckoutForm onSubmit={onSubmit} />
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl">Ваше замовлення</CardTitle>
          <CardDescription>{items.length} поз. у кошику</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {product.title} × {quantity}
              </span>
              <span>{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-3 text-lg font-bold">
            <span>Разом</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button asChild variant="link" className="px-0">
            <Link to="/cart">Повернутися до кошика</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
