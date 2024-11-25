import { NextRequest, NextResponse } from 'next/server'

type ContentItem = {
  title: string;
  content: string;
}

type DomainContent = {
  [key: string]: ContentItem;
}

type Content = {
  [key: string]: DomainContent;
}

const content: Content = {
  'mydomain.com': {
    en: { title: 'Welcome to MyDomain', content: 'This is the English content.' },
    fr: { title: 'Bienvenue sur MyDomain', content: 'Ceci est le contenu en français.' },
    de: { title: 'Willkommen bei MyDomain', content: 'Dies ist der deutsche Inhalt.' },
  },
  'mydomain.co.jp': {
    ja: { title: 'MyDomainへようこそ', content: 'これは日本語のコンテンツです。' },
  },
}

export async function GET(request: NextRequest) {
  const domain = request.headers.get('host') || 'mydomain.com'
  const lang = request.nextUrl.searchParams.get('lang') || 'en'

  const domainContent = content[domain as keyof typeof content] || content['mydomain.com']
  const langContent = lang in domainContent 
  ? domainContent[lang as keyof typeof domainContent] 
  : domainContent['en' as keyof typeof domainContent] || Object.values(domainContent)[0]
  
  return NextResponse.json(langContent)
}

