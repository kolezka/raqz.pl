import { useState, useEffect } from 'react'
import type { BlogPost } from '../types/blog'

export function useBlogPosts(language: string) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    // Dynamically import the blog index
    import('../data/blog-index.json')
      .then((module) => {
        const blogIndex = module.default as { en: BlogPost[]; pl: BlogPost[] }
        setPosts(blogIndex[language as 'en' | 'pl'] || [])
      })
      .catch((error) => {
        console.error('Error loading blog posts:', error)
        setPosts([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [language])

  return { posts, loading }
}

// Hook to get a single post's metadata by slug
export function useBlogPostMeta(slug: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const post = posts.find(p => p.slug === slug)

  return { post, loading }
}

// Hook to get featured posts
export function useFeaturedPosts(language: string, limit: number = 3) {
  const { posts, loading } = useBlogPosts(language)
  const featured = posts.filter(p => p.featured).slice(0, limit)

  return { posts: featured, loading }
}

// Hook to get posts by category
export function usePostsByCategory(category: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const filtered = posts.filter(p =>
    p.categories.some(c => c.toLowerCase() === category.toLowerCase())
  )

  return { posts: filtered, loading }
}

// Hook to get posts by tag
export function usePostsByTag(tag: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const filtered = posts.filter(p =>
    p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )

  return { posts: filtered, loading }
}
