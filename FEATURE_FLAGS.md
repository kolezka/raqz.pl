# Feature Flags Documentation

This document describes the feature flag system implemented in the application.

## Overview

Feature flags allow you to enable/disable application features without code changes. The feature flags are centralized in `/src/config/features.ts`.

## Configuration

All feature flags are defined in `/src/config/features.ts`:

```typescript
export const FEATURES: FeatureFlags = {
  BLOG_ENABLED: true,
  SHOW_ALL_BLOG_POSTS: false,
  BLOG_SEARCH_ENABLED: true,
  BLOG_CATEGORIES_ENABLED: true,
}
```

## Available Flags

### `BLOG_ENABLED`

**Type:** `boolean`
**Default:** `true`

Master toggle for the entire blog section.

**When `false`:**

- Blog routes (`/blog`, `/pl/blog`) are disabled and return 404
- Blog navigation link is hidden from header (both desktop and mobile)
- Latest blog posts section is hidden from homepage

**When `true`:**

- All blog features are accessible
- Blog navigation appears in header
- Latest posts appear on homepage

**Affects:**

- `src/App.tsx` - Blog route registration
- `src/components/Header.tsx` - Navigation links
- `src/pages/HomePage.tsx` - Latest blog posts component

### `SHOW_ALL_BLOG_POSTS`

**Type:** `boolean`
**Default:** `false`

Controls whether to show all blog posts or only featured posts on the blog list page.

**When `false`:**

- Only posts marked with `featured: true` in frontmatter are displayed on main blog page
- Category and tag pages still show all posts

**When `true`:**

- All published posts are displayed
- Featured posts appear in a separate "Featured" section
- Non-featured posts appear in an "All Posts" section below

**Affects:**

- `src/pages/BlogListPage.tsx` - Post filtering logic

### `BLOG_SEARCH_ENABLED`

**Type:** `boolean`
**Default:** `true`

Controls blog search functionality visibility.

**Status:** Prepared for future implementation
**Note:** BlogSearch component exists but is not yet integrated into BlogListPage

### `BLOG_CATEGORIES_ENABLED`

**Type:** `boolean`
**Default:** `true`

Controls blog category filtering visibility.

**Status:** Prepared for future implementation
**Note:** Category routing exists but UI filters not yet implemented

## How to Use

### Disabling the Blog Entirely

1. Open `/src/config/features.ts`
2. Set `BLOG_ENABLED: false`
3. Save the file
4. Refresh your browser

The blog will be completely hidden from the site.

### Showing Only Featured Posts

1. Open `/src/config/features.ts`
2. Set `SHOW_ALL_BLOG_POSTS: false` (default)
3. Save the file

Only posts with `featured: true` in their frontmatter will appear on the main blog page.

### Showing All Posts

1. Open `/src/config/features.ts`
2. Set `SHOW_ALL_BLOG_POSTS: true`
3. Save the file

All published posts will appear, with featured posts in their own section.

## Architecture

### Why Configuration File Approach?

We chose a TypeScript configuration file over environment variables because:

1. **Type Safety** - TypeScript provides compile-time checks
2. **No Rebuild Required** - Changes only require a browser refresh in dev mode
3. **Centralized** - Single source of truth
4. **Documented** - JSDoc comments explain each flag
5. **Version Controlled** - Flags are tracked in git
6. **Extensible** - Easy to add new flags

### File Structure

```
src/
├── config/
│   └── features.ts          # Feature flags configuration
├── components/
│   └── Header.tsx            # Uses BLOG_ENABLED
├── pages/
│   ├── HomePage.tsx          # Uses BLOG_ENABLED
│   └── BlogListPage.tsx      # Uses SHOW_ALL_BLOG_POSTS
└── App.tsx                   # Uses BLOG_ENABLED for routing
```

### Adding New Feature Flags

1. Open `/src/config/features.ts`
2. Add the new flag to the `FeatureFlags` interface with JSDoc comments
3. Set the default value in the `FEATURES` object
4. Import and use the flag in your components:

```typescript
import { FEATURES } from '../config/features';

// Use in conditional rendering
{FEATURES.YOUR_NEW_FLAG && <YourComponent />}

// Use in conditional logic
if (FEATURES.YOUR_NEW_FLAG) {
  // Do something
}
```

## Testing Feature Flags

### Manual Testing

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Verify the blog link appears in navigation
4. Navigate to `/blog` and verify it loads
5. Change `BLOG_ENABLED` to `false` in `/src/config/features.ts`
6. Refresh the browser
7. Verify:
   - Blog link is gone from navigation
   - `/blog` redirects to home page
   - Latest posts section is hidden on homepage

### Testing Both Languages

Test with both English and Polish routes:

**English:**

- `/` - Homepage
- `/blog` - Blog list page

**Polish:**

- `/pl` - Homepage (Polish)
- `/pl/blog` - Blog list page (Polish)

Both should respect the `BLOG_ENABLED` flag identically.

## Migration from Old Implementation

The old implementation used a hardcoded boolean:

```typescript
// OLD (BlogListPage.tsx line 13)
const showAllPosts = false
```

This has been replaced with:

```typescript
// NEW (BlogListPage.tsx)
import { FEATURES } from "../config/features";

// Usage
{FEATURES.SHOW_ALL_BLOG_POSTS && /* ... */}
```

## Future Enhancements

Potential improvements to the feature flag system:

1. **Runtime Toggle** - Add admin UI to toggle flags without code changes
2. **Environment-Based** - Use `.env` files for different environments (dev/staging/prod)
3. **User-Based** - Enable features for specific users (A/B testing)
4. **Remote Configuration** - Fetch flags from a remote API or CMS
5. **Feature Flag Service** - Integrate with LaunchDarkly, Split.io, etc.

## Troubleshooting

### Blog still appears after disabling

1. Hard refresh the browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Check that you saved `/src/config/features.ts`
3. Verify the import statement exists in the file you're working on
4. Check browser console for any TypeScript errors

### TypeScript errors after adding new flag

1. Make sure you added the flag to the `FeatureFlags` interface
2. Ensure the flag is also added to the `FEATURES` object
3. Restart the TypeScript server in your IDE

### Changes not reflecting

1. In development, changes to `features.ts` require a browser refresh
2. In production, you need to rebuild: `npm run build`
3. Check that HMR (Hot Module Replacement) is working

## Related Files

- `/src/config/features.ts` - Feature flags configuration
- `/src/components/Header.tsx` - Navigation rendering (lines 10, 42-50)
- `/src/App.tsx` - Route registration (lines 6, 77-84, 92-99)
- `/src/pages/HomePage.tsx` - Latest posts section (lines 7, 15)
- `/src/pages/BlogListPage.tsx` - Post filtering (lines 12, 138)
