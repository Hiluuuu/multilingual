import { NextRequest, NextResponse } from 'next/server'

type LocaleConfig = {
  defaultLocale: string;
  supportedLocales: string[];
}

export function middleware(request: NextRequest) {
  const { pathname, search} = request.nextUrl
  
  // Parse the configuration from environment variables
  const defaultLocale = process.env.DEFAULT_LOCALE || 'en'
  const supportedLocales = process.env.SUPPORTED_LOCALES ? process.env.SUPPORTED_LOCALES.split(',') : ['en', 'fr', 'de', 'ja']

  const config: LocaleConfig = {
    defaultLocale,
    supportedLocales
  }

  const pathnameIsMissingLocale = config.supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Handle root path
  if (pathname === '/') {
    return NextResponse.rewrite(new URL(`/${config.defaultLocale}${search}`, request.url))
  }

  // Remove default locale prefix for URLs
  if (pathname === `/${config.defaultLocale}`) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }

  if (pathname.startsWith(`/${config.defaultLocale}/`)) {
    return NextResponse.redirect(new URL(pathname.replace(`/${config.defaultLocale}`, ''), request.url))
  }

  if (pathnameIsMissingLocale) {
    const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || config.defaultLocale
    
    if (locale === config.defaultLocale || !config.supportedLocales.includes(locale)) {
      return NextResponse.rewrite(new URL(`/${config.defaultLocale}${pathname}${search}`, request.url))
    }
    
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

