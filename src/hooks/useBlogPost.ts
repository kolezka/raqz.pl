import { useState, useEffect } from 'react'

export interface BlogPostData {
  Component: React.ComponentType | null
  frontmatter?: Record<string, unknown>
}

// Use glob import to pre-define all MDX modules
// Vite needs this at build time - using @content alias from vite.config
const allPosts = import.meta.glob<{
  default: React.ComponentType
  frontmatter?: Record<string, unknown>
}>('@content/blog/**/*.mdx')

/**
 * Dynamically load MDX blog post component
 * Uses Vite's glob import for optimal build performance
 */
export function useBlogPost(slug: string, language: string) {
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadPost() {
      if (!slug || !language) {
        setError('Missing slug or language')
        setLoading(false)
        return
      }

      console.log('🔍 Loading MDX for slug:', slug, 'language:', language)
      console.log('📁 Available posts:', Object.keys(allPosts))

      // Find matching post in glob imports
      const matchingKey = Object.keys(allPosts).find(key => {
        const languageMatch = key.includes(`/blog/${language}/`)
        const slugMatch = key.includes(`-${slug}.mdx`) || key.endsWith(`/${slug}.mdx`)
        return languageMatch && slugMatch
      })

      if (!matchingKey) {
        console.error('❌ Could not find MDX file for slug:', slug, 'language:', language)
        if (isMounted) {
          setError('Post not found')
          setPost(null)
          setLoading(false)
        }
        return
      }

      console.log('✅ Found matching file:', matchingKey)

      try {
        const module = await allPosts[matchingKey]()

        if (isMounted) {
          setPost({
            Component: module.default,
            frontmatter: module.frontmatter,
          })
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        console.error('❌ Error loading MDX:', err)
        if (isMounted) {
          setError('Failed to load post')
          setPost(null)
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      isMounted = false
    }
  }, [slug, language])

  return { post, loading, error }
}
