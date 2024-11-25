import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary } from '../../dictionaries'
import { fetchBlogPost } from '@/lib/api'

const languages = ['en', 'fr', 'de', 'ja'] as const;
type Language = typeof languages[number];

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export function generateStaticParams() {
  return languages.flatMap(lang => 
    ['my-first-post'].map(slug => ({
      lang,
      slug
    }))
  )
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPost({ params }: PageProps) {
  const { lang, slug } = await params

  if (!languages.includes(lang as Language) || slug !== 'my-first-post') {
    notFound()
  }

  const dict = await getDictionary(lang || 'en')
  const post = await fetchBlogPost(slug, (lang || 'en') as Language)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <p className="text-sm text-gray-500 mb-4">{dict.blog.lastUpdated}: {new Date().toLocaleString(lang)}</p>
      <Link href={lang != 'en' ? `/${lang}` : '/'} className="text-blue-500 hover:underline">
        {dict.blog.backToHome}
      </Link>
    </div>
  )
}

