import { useState, useEffect, useMemo } from 'react'
import type { BlogPost } from '../types/blog'
import { categoryMatchesSlug, tagMatchesSlug } from '../utils/slugify'

export function useBlogPosts(language: string, initialPosts?: BlogPost[]) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts)

  useEffect(() => {
    // Skip if we already have initial data from SSR
    if (initialPosts) {
      setPosts(initialPosts)
      setLoading(false)
      return
    }

    setLoading(true)

    // Dynamically import the blog index
    import('../data/blog-index.json')
      .then(module => {
        const blogIndex = module.default as { en: BlogPost[]; pl: BlogPost[] }
        setPosts(blogIndex[language as 'en' | 'pl'] || [])
      })
      .catch(error => {
        console.error('Error loading blog posts:', error)
        setPosts([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [language, initialPosts])

  // Memoize posts array to prevent Fuse.js recreation in useBlogSearch
  const memoizedPosts = useMemo(() => posts, [posts])

  return { posts: memoizedPosts, loading }
}

// Hook to get a single post's metadata by slug
export function useBlogPostMeta(slug: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const post = posts.find(p => p.slug === slug)

  return { post, loading }
}

// Hook to get featured posts
export function useFeaturedPosts(language: string, limit: number = 3, initialPosts?: BlogPost[]) {
  const { posts, loading } = useBlogPosts(language, initialPosts)
  const featured = posts.filter(p => p.featured).slice(0, limit)

  return { posts: featured, loading }
}

// Hook to get posts by category
export function usePostsByCategory(categorySlug: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const filtered = posts.filter(p => p.categories.some(c => categoryMatchesSlug(c, categorySlug)))

  return { posts: filtered, loading }
}

// Hook to get posts by tag
export function usePostsByTag(tagSlug: string, language: string) {
  const { posts, loading } = useBlogPosts(language)
  const filtered = posts.filter(p => p.tags.some(t => tagMatchesSlug(t, tagSlug)))

  return { posts: filtered, loading }
}
