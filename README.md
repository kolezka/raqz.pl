# raqz.pl

A modern, responsive IT services website built with Next.js 15, TypeScript, and Tailwind CSS. Features internationalization (English/Polish), SEO optimization, and a comprehensive blog system.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Headless UI
- **Icons**: React Icons (Remix Icons)
- **Internationalization**: next-intl
- **Form Validation**: Cloudflare Turnstile
- **MDX**: @next/mdx for blog posts
- **Analytics**: Google Analytics, Web Vitals

## ✨ Features

- 🌍 **Internationalization**: Full support for English and Polish with URL-based locale routing
- 🎨 **Modern UI**: Animated backgrounds, smooth transitions, responsive design
- 📝 **Blog System**: MDX-based blog with categories, tags, search, and related posts
- 🔍 **SEO Optimized**: Dynamic metadata, sitemap generation, robots.txt
- 🚀 **Performance**: Server-side rendering, automatic code splitting, optimized images
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎯 **Services**: Comprehensive IT services showcase with detailed pages
- 📊 **Analytics**: Web Vitals monitoring and Google Analytics integration
- 🔒 **Security**: Cloudflare Turnstile for form protection

## 🏗️ Project Structure

```
src/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── not-found.tsx      # 404 page
│   │   ├── blog/              # Blog routes
│   │   │   ├── page.tsx       # Blog list
│   │   │   ├── [slug]/        # Individual blog posts
│   │   │   ├── category/      # Category pages
│   │   │   └── tag/           # Tag pages
│   │   └── services/          # Services routes
│   │       ├── page.tsx       # All services
│   │       └── [serviceId]/   # Individual service pages
│   ├── layout.tsx             # Root layout
│   ├── robots.ts              # Robots.txt generation
│   └── sitemap.ts             # Sitemap generation
├── components/                # React components
│   ├── Header.tsx             # Navigation with language switcher
│   ├── Footer.tsx             # Footer with links
│   ├── Hero.tsx               # Hero section
│   ├── Services.tsx           # Services showcase
│   ├── About.tsx              # About section
│   ├── Contact.tsx            # Contact form with Turnstile
│   ├── LanguageSwitcher.tsx   # Language switcher component
│   ├── AnimatedBackground.tsx # Animated background
│   └── blog/                  # Blog-related components
│       ├── BlogCard.tsx       # Blog post card
│       ├── BlogSearch.tsx     # Search functionality
│       ├── LatestBlogPosts.tsx
│       └── RelatedPosts.tsx
├── lib/                       # Utility functions
│   └── blog.ts                # Blog post utilities
├── messages/                  # Internationalization messages
│   ├── en.json                # English translations
│   └── pl.json                # Polish translations
├── data/                      # Static data
│   ├── services.json          # Services data
│   └── blog-index.json        # Blog posts index
├── styles/                    # Global styles
│   └── globals.css            # Tailwind and custom styles
├── i18n.ts                    # i18n configuration
└── middleware.ts              # Next.js middleware for locale routing
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/raqzpl.git

# Navigate to project directory
cd raqzpl

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

The development server will start at `http://localhost:3000`

## 🌐 Internationalization

The site supports two languages:

- **English** (`en`) - Default locale, accessible at `/`
- **Polish** (`pl`) - Accessible at `/pl`

### URL Structure

| Page     | English     | Polish         |
| -------- | ----------- | -------------- |
| Homepage | `/`         | `/pl`          |
| Services | `/services` | `/pl/services` |
| Blog     | `/blog`     | `/pl/blog`     |
| About    | `/#about`   | `/pl/#about`   |

### Adding Translations

Edit the translation files in `src/messages/`:

- `en.json` - English translations
- `pl.json` - Polish translations

## 📝 Blog System

The blog uses MDX for content with the following features:

- Categories and tags
- Full-text search
- Related posts
- Reading time estimation
- RSS feed generation
- SEO optimization

Blog posts are indexed in `src/data/blog-index.json` and content can be added as MDX files.

## 🎨 Styling

The project uses Tailwind CSS v4 with a custom color palette:

- Primary colors: Teal/Cyan shades (`primary-*`)
- Custom animations: fade, slide, zoom, float
- Responsive utilities
- Dark mode support (planned)

## 📊 SEO & Analytics

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Auto-generated at `/robots.txt`
- **Metadata**: Dynamic per-page metadata
- **Google Analytics**: Integrated with GA4
- **Web Vitals**: Client-side performance monitoring

## 🔧 Configuration

### Feature Flags

Configure features in `src/config/features.ts`:

```typescript
export const FEATURES = {
  CONTACT: false,
  BLOG_ENABLED: false,
  SHOW_ALL_BLOG_POSTS: false,
  BLOG_SEARCH_ENABLED: true,
  BLOG_CATEGORIES_ENABLED: true,
}
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_key
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_id
```

## 📦 Deployment

The project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel

# Or build locally
npm run build
npm start
```

### Vercel Configuration

The project includes `vercel.json` with:

- Clean URLs enabled
- Trailing slash support
- Proper routing configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ using Next.js 15 and modern web technologies.
