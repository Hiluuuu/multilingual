import Link from 'next/link'

interface LanguageSwitcherProps {
  currentLang: string
}

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  // This will be evaluated at build time
  const supportedLocales = process.env.SUPPORTED_LOCALES?.split(',') || []
  const defaultLocale = process.env.DEFAULT_LOCALE || 'en'

  return (
    <nav className="flex space-x-4 justify-center py-4">
      {supportedLocales.map((locale) => (
        <Link
          key={locale}
          href={locale === defaultLocale ? '/' : `/${locale}`}
          className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            currentLang === locale
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
          }`}
        >
          {localeNames[locale] || locale}
        </Link>
      ))}
    </nav>
  )
}

