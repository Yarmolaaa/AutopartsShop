import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">Такої сторінки не існує.</p>
      <Button asChild>
        <Link to="/products">Назад до товарів</Link>
      </Button>
    </div>
  );
}
