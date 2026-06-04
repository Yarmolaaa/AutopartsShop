import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { productsApi } from '@/api/products-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cart/cart-slice';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // React Query owns this server-state: caching, loading & error flags for free.
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(productId),
    enabled: Number.isFinite(productId),
  });

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/products">
          <ArrowLeft className="h-4 w-4" />
          Назад до товарів
        </Link>
      </Button>

      {isLoading && (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      )}

      {isError && (
        <p className="text-destructive" role="alert">
          Товар не знайдено.
        </p>
      )}

      {product && (
        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg border"
          />
          <div className="space-y-4">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {product.rating.toFixed(1)} · {product.stock} в наявності
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            <Button
              size="lg"
              disabled={product.stock === 0}
              onClick={() => {
                dispatch(addToCart(product));
                navigate('/cart');
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? 'До кошика' : 'Немає в наявності'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
