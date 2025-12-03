import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { BlogPost } from '../types/blog'

export function useBlogSearch(posts: BlogPost[]) {
  const [query, setQuery] = useState('')

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'excerpt', weight: 1 },
        { name: 'tags', weight: 1 },
        { name: 'categories', weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [posts])

  // Compute results directly without state
  const results = useMemo(() => {
    if (!query.trim()) {
      return posts
    }

    const searchResults = fuse.search(query)
    return searchResults.map(result => result.item)
  }, [query, fuse, posts])

  return { query, setQuery, results }
}
