import { ReactNode } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface LayoutProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function Layout({ children, params }: LayoutProps) {
  
  const {lang} = await params
  
  return (
    <div>
      <nav className="bg-gray-200 p-4">
        <LanguageSwitcher currentLang={lang} />
      </nav>
      {children}
    </div>
  )
}

