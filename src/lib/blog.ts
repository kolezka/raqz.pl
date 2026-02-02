import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { getPlaiceholder } from 'plaiceholder'
import type { BlogPost } from '@/types/blog'
import { categoryMatchesSlug, tagMatchesSlug } from '@/utils/slugify'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

// Generate blur data URL for an image
async function getBlurDataURL(imagePath: string): Promise<string | undefined> {
  try {
    // Handle local images from public folder
    if (imagePath.startsWith('/')) {
      const fullPath = path.join(process.cwd(), 'public', imagePath)
      const buffer = await readFile(fullPath)
      const { base64 } = await getPlaiceholder(buffer, { size: 10 })
      return base64
    }
    return undefined
  } catch (error) {
    console.warn(`Failed to generate blur placeholder for ${imagePath}:`, error)
    return undefined
  }
}

// Get all blog posts for a locale
export async function getBlogPosts(locale: 'en' | 'pl'): Promise<BlogPost[]> {
  const langDir = path.join(CONTENT_DIR, locale)

  try {
    const files = await readdir(langDir)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))

    const posts = await Promise.all(
      mdxFiles.map(async file => {
        const filePath = path.join(langDir, file)
        const fileContent = await readFile(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        const stats = readingTime(content)

        const coverImage = data.coverImage || '/images/blog/default.jpg'
        const blurDataURL = await getBlurDataURL(coverImage)

        return {
          slug: data.slug || file.replace('.mdx', ''),
          title: data.title || '',
          date: data.date || '',
          lastModified: data.lastModified,
          author: data.author || 'RaqZpl Team',
          description: data.description || '',
          excerpt: data.excerpt || '',
          coverImage,
          coverImageAlt: data.coverImageAlt || data.title || '',
          blurDataURL,
          categories: data.categories || [],
          tags: data.tags || [],
          featured: data.featured || false,
          published: data.published !== false,
          readingTime: `${Math.ceil(stats.minutes)}`,
          seo: data.seo || { keywords: '' },
          relatedPosts: data.relatedPosts || [],
          language: locale,
          fileName: file, // Store for dynamic import
        } as BlogPost & { fileName: string }
      })
    )

    // Filter published posts and sort by date
    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`Error reading blog posts for ${locale}:`, error)
    return []
  }
}

// Get a single blog post
export async function getBlogPost(
  slug: string,
  locale: 'en' | 'pl'
): Promise<(BlogPost & { fileName: string }) | null> {
  const posts = await getBlogPosts(locale)
  return (
    (posts.find(post => post.slug === slug) as (BlogPost & { fileName: string }) | undefined) ||
    null
  )
}

// Get all categories
export function getCategories(posts: BlogPost[]): string[] {
  const categories = new Set<string>()
  posts.forEach(post => post.categories.forEach(cat => categories.add(cat)))
  return Array.from(categories).sort()
}

// Get all tags
export function getTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

// Get posts by category (accepts URL slug)
export function getPostsByCategory(posts: BlogPost[], categorySlug: string): BlogPost[] {
  return posts.filter(post => post.categories.some(cat => categoryMatchesSlug(cat, categorySlug)))
}

// Get posts by tag (accepts URL slug)
export function getPostsByTag(posts: BlogPost[], tagSlug: string): BlogPost[] {
  return posts.filter(post => post.tags.some(t => tagMatchesSlug(t, tagSlug)))
}

// Get featured posts
export function getFeaturedPosts(posts: BlogPost[], limit: number = 3): BlogPost[] {
  return posts.filter(post => post.featured).slice(0, limit)
}
