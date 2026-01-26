/**
 * Creates a URL-safe slug from a string
 * Handles special characters like & and converts spaces to dashes
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Checks if a category matches a slug
 * Used to match URL params with actual category names
 */
export function categoryMatchesSlug(category: string, slug: string): boolean {
  return slugify(category) === slug.toLowerCase()
}

/**
 * Checks if a tag matches a slug
 * Used to match URL params with actual tag names
 */
export function tagMatchesSlug(tag: string, slug: string): boolean {
  return slugify(tag) === slug.toLowerCase()
}
