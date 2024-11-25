type Language = 'en' | 'fr' | 'de' | 'ja';

type BlogPost = {
  title: string;
  content: string;
};

type BlogPosts = {
  [key: string]: {
    [key in Language]: BlogPost;
  };
};

const cmsData: BlogPosts = {
  'my-first-post': {
    en: {
      title: 'My First Blog Post',
      content: 'This is the content of my first blog post in English. Last updated at: '
    },
    fr: {
      title: 'Mon Premier Article de Blog',
      content: 'Ceci est le contenu de mon premier article de blog en français. Dernière mise à jour le : '
    },
    de: {
      title: 'Mein Erster Blogbeitrag',
      content: 'Dies ist der Inhalt meines ersten Blogbeitrags auf Deutsch. Zuletzt aktualisiert am: '
    },
    ja: {
      title: '私の最初のブログ投稿',
      content: 'これは日本語での最初のブログ投稿の内容です。最終更新日：'
    }
  }
};

export async function fetchBlogPost(slug: string, lang: Language): Promise<BlogPost | null> {
  if (slug in cmsData && lang in cmsData[slug]) {
    const post = cmsData[slug][lang];
    return {
      ...post,
      content: post.content + new Date().toLocaleString(lang)
    };
  }

  return null;
}

