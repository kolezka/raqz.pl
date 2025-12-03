import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, BlogIndex } from '../src/types/blog'

const CONTENT_DIR = join(process.cwd(), 'content', 'blog')
const OUTPUT_FILE = join(process.cwd(), 'src', 'data', 'blog-index.json')

function generateBlogIndex() {
  const index: BlogIndex = {
    en: [],
    pl: [],
  }

  const languages = ['en', 'pl'] as const

  for (const lang of languages) {
    const langDir = join(CONTENT_DIR, lang)

    if (!existsSync(langDir)) {
      console.warn(`Warning: Directory ${langDir} does not exist`)
      continue
    }

    const files = readdirSync(langDir).filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const filePath = join(langDir, file)
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      // Calculate reading time
      const stats = readingTime(content)

      // Create blog post object
      const post: BlogPost = {
        slug: data.slug || file.replace('.mdx', ''),
        title: data.title || '',
        date: data.date || '',
        lastModified: data.lastModified,
        author: data.author || 'RaqZpl Team',
        description: data.description || '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '/images/blog/default.jpg',
        coverImageAlt: data.coverImageAlt || data.title || '',
        categories: data.categories || [],
        tags: data.tags || [],
        featured: data.featured || false,
        published: data.published !== false, // Default to true if not specified
        readingTime: `${Math.ceil(stats.minutes)}`,
        seo: data.seo || { keywords: '' },
        relatedPosts: data.relatedPosts || [],
        language: lang,
      }

      // Only include published posts
      if (post.published) {
        index[lang].push(post)
      }
    }

    // Sort by date (newest first)
    index[lang].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }

  // Ensure output directory exists
  const outputDir = join(process.cwd(), 'src', 'data')
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // Write the index file
  writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf-8')

  console.log('Blog index generated successfully!')
  console.log(`- English posts: ${index.en.length}`)
  console.log(`- Polish posts: ${index.pl.length}`)
  console.log(`Output: ${OUTPUT_FILE}`)
}

// Run the generator
generateBlogIndex()
