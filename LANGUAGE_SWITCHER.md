# Language Switcher

## How It Works

The language switcher has been fixed to properly work with Next.js 15 and next-intl's routing system.

### Implementation Details

1. **Routing Configuration** (`src/i18n/routing.ts`)
   - Uses `next-intl/routing` to define locale routing
   - Exports navigation helpers (Link, redirect, usePathname, useRouter)
   - Configured with `localePrefix: 'as-needed'`:
     - English (default): No prefix (e.g., `/services`)
     - Polish: `/pl` prefix (e.g., `/pl/services`)

2. **Language Switcher Component** (`src/components/LanguageSwitcher.tsx`)
   - Uses next-intl's `Link` component with `locale` prop
   - Automatically handles locale prefix based on configuration
   - Preserves current pathname when switching languages
   - Example: `/services` (EN) → `/pl/services` (PL)

### Supported Languages

- 🇺🇸 **English** (`en`) - Default locale, no URL prefix
- 🇵🇱 **Polski** (`pl`) - Polish locale, `/pl` URL prefix

### URL Structure

| Language | Homepage | Services       | Blog       |
| -------- | -------- | -------------- | ---------- |
| English  | `/`      | `/services`    | `/blog`    |
| Polish   | `/pl`    | `/pl/services` | `/pl/blog` |

### How to Use

The language switcher appears in the header (both desktop and mobile):

1. Click on the current language flag/code
2. Select the desired language from the dropdown
3. The page will reload with the same content in the selected language

### Technical Notes

- The switcher uses `next-intl`'s built-in routing which ensures:
  - Proper locale detection
  - SEO-friendly URLs
  - Automatic locale switching without manual path manipulation
  - Middleware-based routing

- The component is optimized with:
  - React.memo for performance
  - useTransition for smooth navigation
  - Automatic popover close on selection
  - Scroll-aware dropdown (closes on scroll)
