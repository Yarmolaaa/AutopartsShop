import { SubmissionError } from 'redux-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/auth/auth-slice';
import type { Credentials } from '@/types';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? '/products';

  // redux-form awaits this promise; throwing SubmissionError surfaces a form error.
  const onSubmit = async (values: Credentials) => {
    const result = await dispatch(login(values));
    if (login.rejected.match(result)) {
      throw new SubmissionError({ _error: result.payload ?? 'Не вдалося увійти' });
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>З поверненням</CardTitle>
          <CardDescription>
            Увійдіть у свій акаунт. Демо-вхід:{' '}
            <span className="font-medium">demo@shop.dev</span> /{' '}
            <span className="font-medium">password123</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={onSubmit} />
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Немає акаунту?
          <Link to="/register" className="ml-1 font-medium underline">
            Зареєструватися
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
