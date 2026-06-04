import { Link, NavLink } from 'react-router-dom';
import { LogOut, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/auth/auth-slice';
import { selectCartCount } from '@/store/cart/cart-slice';

export function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const cartCount = useAppSelector(selectCartCount);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/products" className="flex items-center gap-2 text-lg font-bold">
          <ShoppingBag className="h-5 w-5" />
          «AutoParts Store»
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost">
            <NavLink to="/products">Товари</NavLink>
          </Button>

          <Button asChild variant="ghost" size="icon" className="relative">
            <NavLink to="/cart" aria-label="Кошик">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground"
                  data-testid="cart-count"
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          </Button>

          {user ? (
            <>
              <Button asChild variant="ghost">
                <NavLink to="/profile">{user.name}</NavLink>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(logout())}
              >
                <LogOut className="h-4 w-4" />
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <NavLink to="/login">Увійти</NavLink>
              </Button>
              <Button asChild>
                <NavLink to="/register">Реєстрація</NavLink>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
