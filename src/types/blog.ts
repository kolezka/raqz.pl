export interface BlogPost {
  slug: string
  title: string
  date: string
  lastModified?: string
  author: string
  description: string
  excerpt: string
  coverImage: string
  coverImageAlt: string
  categories: string[]
  tags: string[]
  featured: boolean
  published: boolean
  readingTime: string
  seo: SEOMetadata
  relatedPosts?: string[]
  language: 'en' | 'pl'
}

export interface SEOMetadata {
  keywords: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  count?: number
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  count: number
}

export interface BlogSearchResult {
  post: BlogPost
  score: number
  matches: string[]
}

export interface BlogIndex {
  en: BlogPost[]
  pl: BlogPost[]
}

export interface HeadingNode {
  id: string
  text: string
  level: number
}
