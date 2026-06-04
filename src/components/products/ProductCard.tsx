import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cart/cart-slice';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <Card className="flex flex-col overflow-hidden" data-testid="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-cover"
      />
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.title}</h3>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => dispatch(addToCart(product))}
        >
          <ShoppingCart className="h-4 w-4" />
          До кошика
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link to={`/products/${product.id}`}>Детальніше</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
