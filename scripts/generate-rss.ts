import { Feed } from 'feed'
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import type { BlogIndex } from '../src/types/blog'

// Import the blog index
const blogIndexPath = join(process.cwd(), 'src', 'data', 'blog-index.json')
const blogIndex: BlogIndex = JSON.parse(readFileSync(blogIndexPath, 'utf-8'))

const SITE_URL = 'https://raqz.pl'
const OUTPUT_DIR = join(process.cwd(), 'public')

function generateRSSFeeds() {
  const languages = ['en', 'pl'] as const

  for (const lang of languages) {
    const posts = blogIndex[lang]

    if (!posts || posts.length === 0) {
      console.warn(`No posts found for language: ${lang}`)
      continue
    }

    // Create feed instance
    const feed = new Feed({
      title: lang === 'en' ? 'RaqZpl Solutions Blog' : 'Blog RaqZpl Solutions',
      description:
        lang === 'en'
          ? 'Insights, tutorials, and updates from RaqZpl Solutions'
          : 'Wiedza, tutoriale i aktualności od RaqZpl Solutions',
      id: `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/blog`,
      link: `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/blog`,
      language: lang,
      favicon: `${SITE_URL}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, RaqZpl Solutions`,
      feedLinks: {
        rss2: `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/feed.xml`,
        atom: `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/atom.xml`,
        json: `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/feed.json`
      },
      author: {
        name: 'RaqZpl Solutions',
        link: SITE_URL
      }
    })

    // Add posts to feed
    posts.forEach((post) => {
      const postUrl = `${SITE_URL}${lang === 'pl' ? '/pl' : ''}/blog/${post.slug}`

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.excerpt || post.description,
        content: post.description,
        author: [
          {
            name: post.author
          }
        ],
        date: new Date(post.date),
        image: `${SITE_URL}${post.coverImage}`,
        category: post.categories.map((cat) => ({ name: cat }))
      })
    })

    // Generate different feed formats
    const feedDir = lang === 'pl' ? join(OUTPUT_DIR, 'pl') : OUTPUT_DIR

    // Ensure directory exists
    if (!existsSync(feedDir)) {
      mkdirSync(feedDir, { recursive: true })
    }

    // Write RSS 2.0
    writeFileSync(join(feedDir, 'feed.xml'), feed.rss2(), 'utf-8')

    // Write Atom
    writeFileSync(join(feedDir, 'atom.xml'), feed.atom1(), 'utf-8')

    // Write JSON Feed
    writeFileSync(join(feedDir, 'feed.json'), feed.json1(), 'utf-8')

    console.log(`✓ Generated RSS feeds for ${lang.toUpperCase()}:`)
    console.log(`  - ${feedDir}/feed.xml (RSS 2.0)`)
    console.log(`  - ${feedDir}/atom.xml (Atom)`)
    console.log(`  - ${feedDir}/feed.json (JSON Feed)`)
  }

  console.log('\nRSS feed generation completed!')
}

// Run the generator
generateRSSFeeds()
