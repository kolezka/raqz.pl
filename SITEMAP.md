# Sitemap Configuration

This project uses Next.js's built-in sitemap and robots.txt generation for SEO optimization.

## Files

- **`src/app/sitemap.ts`** - Generates the main sitemap with all routes
- **`src/app/robots.ts`** - Generates the robots.txt file

## What's Included

The sitemap automatically includes:

### Static Routes

- Homepage (both English and Polish): `/en`, `/pl`
- Services overview pages: `/en/services`, `/pl/services`
- Individual service pages for all services from `src/data/services.json`

### Dynamic Blog Routes (if `BLOG_ENABLED` is true)

- Blog index pages: `/en/blog`, `/pl/blog`
- Individual blog posts from `src/data/blog-index.json`
- Category pages: `/en/blog/category/{category}`, `/pl/blog/category/{category}`
- Tag pages: `/en/blog/tag/{tag}`, `/pl/blog/tag/{tag}`

## Priority Levels

- **1.0** - Homepage (highest priority)
- **0.9** - Services overview, Blog index
- **0.8** - Individual service pages, Featured blog posts
- **0.7** - Regular blog posts
- **0.6** - Category pages
- **0.5** - Tag pages

## Change Frequency

- **daily** - Blog index
- **weekly** - Homepage, Services pages, Category/Tag pages
- **monthly** - Individual service pages, Blog posts

## Accessing the Sitemap

After building the project (`npm run build`), the sitemap is accessible at:

- **Sitemap**: `https://raqz.pl/sitemap.xml`
- **Robots.txt**: `https://raqz.pl/robots.txt`

## Updating the Sitemap

The sitemap is automatically regenerated during each build. To update it:

1. Run `npm run build`
2. The sitemap will be generated based on the current routes

## Feature Flags

The sitemap respects the `BLOG_ENABLED` feature flag from `src/config/features.ts`. When blog is disabled, blog routes are excluded from the sitemap.

## SEO Best Practices

- Last modified dates are automatically set for blog posts based on their `lastModified` or `date` fields
- All URLs use the canonical domain `https://raqz.pl`
- The robots.txt file allows all crawlers to access all pages
