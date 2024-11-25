import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  if (locale in dictionaries) {
    return dictionaries[locale as keyof typeof dictionaries]()
  }
  return dictionaries.en() // Fallback to English if the locale is not supported
}