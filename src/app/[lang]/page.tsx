import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from './dictionaries'

const languages = ['en', 'fr', 'de', 'ja']

interface PageProps {
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang,
  }))
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params

  if (!languages.includes(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {dict.home.welcome}
      </h1>
      <p className="text-lg mb-4">
        {dict.home.currentLanguage}: <span className="font-semibold">{lang}</span>
      </p>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{dict.home.about.title}</h2>
        <p className="mb-2">
          {dict.home.about.description}
        </p>
        <p>
          {dict.home.about.supportedLanguages}
        </p>
      </div>
      <Link href={lang === 'en' ? '/blog/my-first-post' : `/${lang}/blog/my-first-post`} className="text-blue-500 hover:underline">
        {dict.home.readBlogPost}
      </Link>
    </div>
  )
}

