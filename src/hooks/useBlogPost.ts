import { useState, useEffect } from 'react'
import blogIndexData from '@/data/blog-index.json'

export interface BlogPostData {
  Component: React.ComponentType | null
  frontmatter?: Record<string, unknown>
}

/**
 * Dynamically load MDX blog post component
 * Uses the blog index to find the correct file path
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

      // Find the post in the blog index
      const posts = blogIndexData[language as 'en' | 'pl']
      const postMeta = posts?.find(p => p.slug === slug)

      if (!postMeta) {
        console.error('❌ Could not find post in blog index:', slug, language)
        if (isMounted) {
          setError('Post not found')
          setPost(null)
          setLoading(false)
        }
        return
      }

      try {
        // Construct the file name from date and slug
        // File format: YYYY-MM-slug.mdx
        const date = new Date(postMeta.date)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const fileName = `${year}-${month}-${slug}`

        // Import all possible MDX files statically to satisfy webpack
        const modules: Record<
          string,
          () => Promise<{ default: React.ComponentType; frontmatter?: Record<string, unknown> }>
        > = {
          'en/2025-12-modern-web-development-2025': () =>
            import('@/content/blog/en/2025-12-modern-web-development-2025.mdx'),
          'en/2025-11-getting-started-with-ai-automation': () =>
            import('@/content/blog/en/2025-11-getting-started-with-ai-automation.mdx'),
          'pl/2025-12-nowoczesny-rozwoj-web-2025': () =>
            import('@/content/blog/pl/2025-12-nowoczesny-rozwoj-web-2025.mdx'),
          'pl/2025-11-wprowadzenie-do-automatyzacji-ai': () =>
            import('@/content/blog/pl/2025-11-wprowadzenie-do-automatyzacji-ai.mdx'),
        }

        const moduleKey = `${language}/${fileName}`
        const moduleLoader = modules[moduleKey]

        if (!moduleLoader) {
          throw new Error(`Module not found for: ${moduleKey}`)
        }

        const module = await moduleLoader()

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
          setError('Post not found')
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
