import { SubmissionError } from 'redux-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  RegisterForm,
  type RegisterFormValues,
} from '@/components/auth/RegisterForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch } from '@/store/hooks';
import { register } from '@/store/auth/auth-slice';

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterFormValues) => {
    const { name, email, password } = values;
    const result = await dispatch(register({ name, email, password }));
    if (register.rejected.match(result)) {
      throw new SubmissionError({
        _error: result.payload ?? 'Не вдалося зареєструватися',
      });
    }
    navigate('/products', { replace: true });
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Створіть акаунт</CardTitle>
          <CardDescription>
            Приєднуйтесь до магазину за кілька секунд.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={onSubmit} />
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Вже маєте акаунт?
          <Link to="/login" className="ml-1 font-medium underline">
            Увійти
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
