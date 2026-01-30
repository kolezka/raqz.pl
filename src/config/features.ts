/**
 * Feature Flags Configuration
 *
 * Centralized configuration for enabling/disabling application features.
 * Modify these values to control feature visibility across the application.
 */

export interface FeatureFlags {
  CONTACT: boolean
  /**
   * Master toggle for the entire blog section
   * When false: Blog routes are disabled, blog links are hidden from navigation
   */
  BLOG_ENABLED: boolean

  /**
   * Master toggle for the portfolio section
   * When false: Portfolio route shows feature disabled page, portfolio links are hidden
   */
  PORTFOLIO_ENABLED: boolean

  /**
   * Master toggle for the CV/Resume section
   * When false: CV route shows feature disabled page
   */
  CV_ENABLED: boolean

  /**
   * Controls whether the maintenance/work-in-progress overlay is displayed
   * When true: Full-page overlay blocks all interaction, users cannot access content
   * When false: Normal site operation
   */
  MAINTENANCE_MODE: boolean

  /**
   * Controls whether to show all blog posts or only featured posts
   * When false: Only posts marked with featured=true in frontmatter are displayed
   * When true: All published posts are displayed
   */
  SHOW_ALL_BLOG_POSTS: boolean

  /**
   * Controls blog search functionality visibility
   * When false: Search component is hidden on blog list page
   */
  BLOG_SEARCH_ENABLED: boolean

  /**
   * Controls blog category filtering visibility
   * When false: Category filters are hidden on blog list page
   */
  BLOG_CATEGORIES_ENABLED: boolean
}

/**
 * Feature flags configuration
 * Edit these values to enable/disable features
 */
export const FEATURES: Readonly<FeatureFlags> = Object.freeze({
  CONTACT: true,
  BLOG_ENABLED: true,
  PORTFOLIO_ENABLED: false,
  CV_ENABLED: true,
  SHOW_ALL_BLOG_POSTS: true,
  BLOG_SEARCH_ENABLED: true,
  BLOG_CATEGORIES_ENABLED: true,
  MAINTENANCE_MODE: false,
})

/**
 * Type guard to validate feature flags at runtime
 */
export function isValidFeatureFlag(key: string): key is keyof FeatureFlags {
  return key in FEATURES
}
