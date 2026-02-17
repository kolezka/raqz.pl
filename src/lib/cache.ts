/**
 * Centralized cache revalidation times (in seconds)
 */
export const CACHE_REVALIDATION = {
  STATIC_DATA: 3600, // 1 hour - for rarely changing data like company info
  BLOG_CONTENT: 900, // 15 minutes - for blog posts and lists
  SERVICES_DATA: 86400, // 1 day - for services catalog
} as const

/**
 * Cache tags for selective revalidation
 * Use these with revalidateTag() to invalidate specific caches
 */
export const CACHE_TAGS = {
  BLOG_POSTS: 'blog-posts',
  BLOG_INDEX: 'blog-index',
  SERVICES: 'services',
  DEVELOPERS: 'developers',
  COMPANY: 'company',
} as const

/**
 * Cache key generators for consistent cache keys
 */
export const CACHE_KEYS = {
  blogPosts: (locale: string) => `blog-posts-${locale}`,
  blogPost: (slug: string, locale: string) => `blog-post-${slug}-${locale}`,
  services: () => 'services',
  developers: () => 'developers',
  company: () => 'company',
} as const
