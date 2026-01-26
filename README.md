# raqz.pl

A modern, responsive IT services website built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features internationalization (English/Polish), dark mode, SEO optimization with JSON-LD structured data, and a comprehensive MDX-based blog system.

## Tech Stack

- **Framework**: Next.js 15.5+ (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 with Typography plugin
- **UI Components**: Headless UI
- **Icons**: React Icons (Remix Icons)
- **Internationalization**: next-intl
- **Form Validation**: Zod + Cloudflare Turnstile
- **Email**: Nodemailer
- **MDX**: @next/mdx with rehype/remark plugins
- **Analytics**: Google Analytics, Vercel Analytics, Web Vitals
- **Search**: Fuse.js for blog search

## Features

- **Internationalization**: Full support for English and Polish with URL-based locale routing (`as-needed` prefix)
- **Dark Mode**: System-aware theme switching with next-themes
- **Blog System**: MDX-based blog with categories, tags, full-text search, related posts, and JSON-LD structured data
- **SEO Optimized**: Dynamic metadata, sitemap generation, robots.txt, Article & BreadcrumbList schema
- **Performance**: Server-side rendering, automatic code splitting, View Transitions API
- **Responsive**: Mobile-first design with smooth animations
- **Services**: Comprehensive IT services showcase with localized URLs
- **Portfolio**: Portfolio section with feature flag control
- **Contact Form**: Email integration with rate limiting and spam protection
- **Cookie Consent**: GDPR-compliant cookie banner with preferences dialog
- **Maintenance Mode**: Full-page overlay for scheduled maintenance

## Project Structure

```
src/
├── app/
│   ├── [locale]/                 # Internationalized routes
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Locale-specific layout with metadata
│   │   ├── not-found.tsx         # 404 page
│   │   ├── blog/                 # Blog routes
│   │   │   ├── page.tsx          # Blog list
│   │   │   ├── [slug]/           # Individual blog posts (with JSON-LD)
│   │   │   ├── category/         # Category pages
│   │   │   └── tag/              # Tag pages
│   │   ├── services/             # Services routes
│   │   │   ├── page.tsx          # All services
│   │   │   └── [serviceSlug]/    # Individual service pages
│   │   ├── portfolio/            # Portfolio page
│   │   └── privacy/              # Privacy policy
│   ├── api/
│   │   └── contact/              # Contact form API endpoint
│   ├── layout.tsx                # Root layout with metadataBase
│   ├── robots.ts                 # Dynamic robots.txt generation
│   └── sitemap.ts                # Dynamic sitemap generation
├── components/
│   ├── Header.tsx                # Navigation with language switcher
│   ├── Footer.tsx                # Footer with links
│   ├── Hero.tsx                  # Hero section
│   ├── Services.tsx              # Services showcase
│   ├── About.tsx                 # About section
│   ├── AboutMe.tsx               # Personal about section
│   ├── Clients.tsx               # Clients/testimonials
│   ├── Contact.tsx               # Contact section
│   ├── ContactForm.tsx           # Contact form with Turnstile
│   ├── LanguageSwitcher.tsx      # Language switcher
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   ├── ThemeProvider.tsx         # Theme context provider
│   ├── AnimatedBackground.tsx    # Animated background
│   ├── CookieBanner.tsx          # GDPR cookie consent
│   ├── MaintenanceOverlay.tsx    # Maintenance mode overlay
│   ├── ViewTransitions.tsx       # View Transitions API wrapper
│   ├── blog/                     # Blog components
│   │   ├── BlogCard.tsx          # Blog post card
│   │   ├── BlogListClient.tsx    # Blog list page
│   │   ├── BlogPostClient.tsx    # Blog post page
│   │   ├── BlogSearch.tsx        # Fuse.js search
│   │   ├── BlogCategoryClient.tsx
│   │   ├── BlogTagClient.tsx
│   │   ├── LatestBlogPosts.tsx   # Homepage blog section
│   │   ├── RelatedPosts.tsx      # Related posts component
│   │   └── MDXComponents.tsx     # Custom MDX components
│   └── portfolio/
│       └── PortfolioClient.tsx   # Portfolio page
├── lib/
│   ├── blog.ts                   # Blog utilities (server-side)
│   ├── email.ts                  # Nodemailer configuration
│   ├── turnstile.ts              # Turnstile verification
│   ├── rate-limit.ts             # API rate limiting
│   ├── generateBlogMetadata.ts   # Blog SEO metadata
│   └── generateServicesMetadata.ts
├── hooks/
│   ├── useBlogPost.ts            # Single post hook
│   ├── useBlogPosts.ts           # Posts list hook
│   ├── useBlogSearch.ts          # Search hook
│   ├── useContactForm.ts         # Form submission hook
│   ├── useCookieConsent.ts       # Cookie preferences hook
│   ├── useScrollAnimation.ts     # Intersection observer animations
│   └── useReducedMotion.ts       # Accessibility hook
├── utils/
│   ├── slugify.ts                # URL-safe slug generation
│   ├── animations.ts             # Animation utilities
│   └── related-posts.ts          # Related posts algorithm
├── messages/                     # Internationalization
│   ├── en.json                   # English translations
│   └── pl.json                   # Polish translations
├── data/
│   ├── services.json             # Services data with localized slugs
│   ├── blog-index.json           # Blog posts index
│   ├── blog-categories.json      # Blog categories
│   └── company.json              # Company information
├── types/                        # TypeScript types
├── config/
│   └── features.ts               # Feature flags
├── i18n.ts                       # i18n configuration
├── i18n/routing.ts               # Locale routing config
└── middleware.ts                 # Locale routing middleware
```

## Getting Started

### Prerequisites

- Node.js 18+ (see `.nvmrc`)
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/raqzpl.git
cd raqzpl

# Install dependencies
npm install
# or
bun install
```

### Environment Variables

Create a `.env.local` file:

```env
# Cloudflare Turnstile (spam protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password
EMAIL_FROM=noreply@example.com
EMAIL_TO=contact@example.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Analyze bundle
npm run analyze
```

The development server starts at `http://localhost:3000`

## Internationalization

The site supports two languages with `localePrefix: 'as-needed'`:

- **English** (`en`) - Default locale, no URL prefix
- **Polish** (`pl`) - Accessible at `/pl`

### URL Structure

| Page        | English            | Polish                |
| ----------- | ------------------ | --------------------- |
| Homepage    | `/`                | `/pl`                 |
| Services    | `/services`        | `/pl/uslugi`          |
| Blog        | `/blog`            | `/pl/blog`            |
| Blog Post   | `/blog/[slug]`     | `/pl/blog/[slug]`     |
| Portfolio   | `/portfolio`       | `/pl/portfolio`       |
| Privacy     | `/privacy`         | `/pl/privacy`         |

### Adding Translations

Edit the translation files in `src/messages/`:

- `en.json` - English translations
- `pl.json` - Polish translations

## Blog System

The blog uses MDX with the following features:

- **Categories and tags** with URL-safe slugs
- **Full-text search** powered by Fuse.js
- **Related posts** algorithm
- **Reading time** estimation
- **RSS feed** generation
- **JSON-LD structured data** (Article + BreadcrumbList schema)
- **SEO optimization** with dynamic metadata

### Adding Blog Posts

1. Create MDX file in `content/blog/[locale]/`
2. Add frontmatter with required fields
3. Update `src/data/blog-index.json`

Example frontmatter:

```yaml
---
slug: my-post-slug
title: Post Title
date: '2026-01-26'
author: raqz.pl
description: Post description for SEO
excerpt: Short excerpt for cards
coverImage: /images/blog/cover.jpg
coverImageAlt: Image description
categories: ['Category Name']
tags: ['tag1', 'tag2']
featured: true
published: true
seo:
  keywords: 'keyword1, keyword2'
---
```

## Feature Flags

Configure features in `src/config/features.ts`:

```typescript
export const FEATURES = {
  CONTACT: true,              // Contact form
  BLOG_ENABLED: true,         // Blog section
  PORTFOLIO_ENABLED: true,    // Portfolio section
  SHOW_ALL_BLOG_POSTS: true,  // Show all vs featured only
  BLOG_SEARCH_ENABLED: true,  // Blog search
  BLOG_CATEGORIES_ENABLED: true, // Category filters
  MAINTENANCE_MODE: false,    // Maintenance overlay
}
```

## SEO

- **Sitemap**: Auto-generated at `/sitemap.xml` with all pages, blog posts, categories, and tags
- **Robots.txt**: Dynamic generation at `/robots.txt` with bot-specific rules
- **Metadata**: Dynamic per-page metadata with OpenGraph and Twitter cards
- **JSON-LD**: Article and BreadcrumbList structured data for blog posts
- **Canonical URLs**: Proper canonical tags with language alternates

## Styling

The project uses Tailwind CSS v4 with:

- Custom color palette (primary teal/cyan shades)
- Typography plugin for prose styling
- Dark mode support via CSS variables
- Custom animations (fade, slide, zoom, float)
- View Transitions API for smooth page transitions

## Deployment

Optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel

# Or build locally
npm run build
npm start
```

The project includes `vercel.json` with routing configuration.

## License

This project is proprietary and confidential.

---

Built with Next.js 15, React 19, and modern web technologies.
