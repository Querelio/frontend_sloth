import { useTranslation } from 'react-i18next'

const LOGO_SRC = '/sloth-board-logo.png'

export interface LogoProps {
  variant?: 'default' | 'compact'
}

export function Logo({ variant = 'default' }: LogoProps) {
  const { t } = useTranslation('auth')
  const appName = t('appName')

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2.5">
        <img
          src={LOGO_SRC}
          alt={appName}
          className="h-8 w-8 object-contain"
        />
        <p className="text-lg font-semibold text-foreground">{appName}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <img
        src={LOGO_SRC}
        alt={appName}
        className="h-16 w-16 object-contain"
      />
      <div>
        <p className="text-xl font-semibold text-foreground">{appName}</p>
      </div>
    </div>
  )
}
