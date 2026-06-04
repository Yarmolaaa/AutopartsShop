import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  setQuantity,
} from '@/store/cart/cart-slice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Ваш кошик порожній</h1>
        <p className="text-muted-foreground">
          Додайте товари, щоб оформити замовлення.
        </p>
        <Button asChild>
          <Link to="/products">Перейти до товарів</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Кошик</h1>

      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <Card key={product.id} data-testid="cart-item">
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${product.id}`}
                  className="font-semibold hover:underline"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(product.price)} за шт.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Зменшити кількість"
                  onClick={() =>
                    dispatch(
                      setQuantity({ id: product.id, quantity: quantity - 1 }),
                    )
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center" data-testid="cart-qty">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Збільшити кількість"
                  onClick={() =>
                    dispatch(
                      setQuantity({ id: product.id, quantity: quantity + 1 }),
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-24 text-right font-semibold">
                {formatPrice(product.price * quantity)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Видалити з кошика"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-lg">Разом:</span>
        <span className="text-2xl font-bold" data-testid="cart-total">
          {formatPrice(total)}
        </span>
      </div>

      <div className="flex justify-end gap-3">
        <Button asChild variant="outline">
          <Link to="/products">Продовжити покупки</Link>
        </Button>
        <Button asChild>
          <Link to="/checkout">Оформити замовлення</Link>
        </Button>
      </div>
    </div>
  );
}
