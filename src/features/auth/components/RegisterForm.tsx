import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { useRegister } from '../hooks/useRegister'
import { FIELD_LIMITS } from '../../../lib/validation'
import { createRegisterSchema, type RegisterFormValues } from '../schemas'

export function RegisterForm() {
  const { t } = useTranslation('auth')
  const registerSchema = useMemo(() => createRegisterSchema(t), [t])
  const { mutate, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((data) => mutate(data))}
      noValidate
    >
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          {t('register.title')}
        </h1>
        <p className="text-sm text-muted">{t('register.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t('register.firstName')}
          autoComplete="given-name"
          placeholder={t('register.firstNamePlaceholder')}
          error={errors.firstName?.message}
          maxLength={FIELD_LIMITS.personName}
          {...register('firstName')}
        />

        <Input
          label={t('register.lastName')}
          autoComplete="family-name"
          placeholder={t('register.lastNamePlaceholder')}
          error={errors.lastName?.message}
          maxLength={FIELD_LIMITS.personName}
          {...register('lastName')}
        />
      </div>

      <Input
        label={t('register.email')}
        type="email"
        autoComplete="email"
        placeholder={t('register.emailPlaceholder')}
        error={errors.email?.message}
        maxLength={FIELD_LIMITS.email}
        {...register('email')}
      />

      <Input
        label={t('register.password')}
        type="password"
        autoComplete="new-password"
        placeholder={t('register.passwordPlaceholder')}
        error={errors.password?.message}
        maxLength={FIELD_LIMITS.password}
        {...register('password')}
      />

      <Input
        label={t('register.confirmPassword')}
        type="password"
        autoComplete="new-password"
        placeholder={t('register.confirmPasswordPlaceholder')}
        error={errors.confirmPassword?.message}
        maxLength={FIELD_LIMITS.password}
        {...register('confirmPassword')}
      />

      <Button type="submit" className="w-full" isLoading={isPending}>
        {t('register.submit')}
      </Button>
    </form>
  )
}
