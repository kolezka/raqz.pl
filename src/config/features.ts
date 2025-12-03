/**
 * Feature Flags Configuration
 *
 * Centralized configuration for enabling/disabling application features.
 * Modify these values to control feature visibility across the application.
 */

export interface FeatureFlags {
  /**
   * Master toggle for the entire blog section
   * When false: Blog routes are disabled, blog links are hidden from navigation
   */
  BLOG_ENABLED: boolean;

  /**
   * Controls whether to show all blog posts or only featured posts
   * When false: Only posts marked with featured=true in frontmatter are displayed
   * When true: All published posts are displayed
   */
  SHOW_ALL_BLOG_POSTS: boolean;

  /**
   * Controls blog search functionality visibility
   * When false: Search component is hidden on blog list page
   */
  BLOG_SEARCH_ENABLED: boolean;

  /**
   * Controls blog category filtering visibility
   * When false: Category filters are hidden on blog list page
   */
  BLOG_CATEGORIES_ENABLED: boolean;
}

/**
 * Feature flags configuration
 * Edit these values to enable/disable features
 */
export const FEATURES: Readonly<FeatureFlags> = Object.freeze({
  BLOG_ENABLED: true,
  SHOW_ALL_BLOG_POSTS: false,
  BLOG_SEARCH_ENABLED: true,
  BLOG_CATEGORIES_ENABLED: true,
});

/**
 * Type guard to validate feature flags at runtime
 */
export function isValidFeatureFlag(key: string): key is keyof FeatureFlags {
  return key in FEATURES;
}
