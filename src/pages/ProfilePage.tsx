import { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { ProfileForm } from '@/components/auth/ProfileForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile } from '@/store/auth/auth-slice';
import type { UpdateProfilePayload } from '@/types';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [saved, setSaved] = useState(false);

  if (!user) return null; // ProtectedRoute already guards this route.

  const onSubmit = async (values: UpdateProfilePayload) => {
    setSaved(false);
    const result = await dispatch(updateProfile(values));
    if (updateProfile.rejected.match(result)) {
      throw new SubmissionError({
        _error: result.payload ?? 'Не вдалося оновити профіль',
      });
    }
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Ваш профіль</CardTitle>
          <CardDescription>Оновіть свої реєстраційні дані.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initialValues={{ name: user.name, email: user.email }}
            onSubmit={onSubmit}
          />
          {saved && (
            <p className="mt-3 text-sm text-green-600" role="status">
              Профіль оновлено.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
