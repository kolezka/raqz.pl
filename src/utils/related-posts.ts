import type { BlogPost } from '../types/blog'

/**
 * Calculate similarity score between two blog posts
 * Higher score means more similar
 */
function calculateSimilarity(post1: BlogPost, post2: BlogPost): number {
  let score = 0

  // Same category: +10 points per match
  const categoryMatches = post1.categories.filter(c =>
    post2.categories.includes(c)
  ).length
  score += categoryMatches * 10

  // Same tag: +5 points per match
  const tagMatches = post1.tags.filter(t =>
    post2.tags.includes(t)
  ).length
  score += tagMatches * 5

  // Recency bonus (max 30 points)
  // Posts published closer together get higher scores
  const daysDiff = Math.abs(
    new Date(post1.date).getTime() - new Date(post2.date).getTime()
  ) / (1000 * 60 * 60 * 24)
  score += Math.max(0, 30 - daysDiff)

  return score
}

/**
 * Get related posts for a given blog post
 * Priority: manual relatedPosts → same category → tag overlap → recent posts
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  count: number = 3
): BlogPost[] {
  // 1. Try manual related posts first (from frontmatter)
  if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
    const manual = allPosts.filter(p =>
      currentPost.relatedPosts?.includes(p.slug) &&
      p.slug !== currentPost.slug &&
      p.published
    )
    if (manual.length >= count) {
      return manual.slice(0, count)
    }
  }

  // 2. Calculate similarity scores for all other published posts
  const scored = allPosts
    .filter(p => p.slug !== currentPost.slug && p.published)
    .map(post => ({
      post,
      score: calculateSimilarity(currentPost, post)
    }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map(s => s.post)
}

/**
 * Get unique categories from a list of posts
 */
export function getUniqueCategories(posts: BlogPost[]): string[] {
  const categoriesSet = new Set<string>()
  posts.forEach(post => {
    post.categories.forEach(cat => categoriesSet.add(cat))
  })
  return Array.from(categoriesSet).sort()
}

/**
 * Get unique tags from a list of posts with counts
 */
export function getUniqueTags(posts: BlogPost[]): Array<{ tag: string; count: number }> {
  const tagCounts = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count) // Sort by popularity
}
