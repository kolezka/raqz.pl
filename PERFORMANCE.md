# Performance Monitoring Guide

This document describes the performance monitoring tools and optimizations implemented in the application.

## Bundle Analyzer

### What is it?

The bundle analyzer helps you visualize the size of webpack output files with an interactive zoomable treemap. This helps identify which dependencies are taking up the most space in your production bundle.

### How to use it

```bash
npm run build:analyze
```

This will:

1. Build your production bundle
2. Generate a detailed analysis
3. Automatically open an interactive HTML report in your browser (`dist/stats.html`)

### What to look for

- **Large dependencies**: Identify heavy libraries that could be replaced or lazy-loaded
- **Duplicate code**: Check for the same library bundled multiple times
- **Chunk sizes**: Ensure no single chunk is too large (aim for <200KB gzipped)
- **Tree-shaking effectiveness**: Verify unused code is being eliminated

### Understanding the report

The report shows three size metrics:

- **Stat size**: Size before any transformations
- **Parsed size**: Size after minification
- **Gzip size**: Size after compression (most relevant for users)

## Web Vitals Monitoring

### What are Web Vitals?

Web Vitals are Google's metrics for measuring real-world user experience on the web. This application monitors:

- **LCP (Largest Contentful Paint)**: How fast the main content loads
  - Good: < 2.5s
  - Needs Improvement: 2.5s - 4s
  - Poor: > 4s

- **INP (Interaction to Next Paint)**: How responsive the site is to user interactions
  - Good: < 200ms
  - Needs Improvement: 200ms - 500ms
  - Poor: > 500ms

- **CLS (Cumulative Layout Shift)**: Visual stability (how much content shifts)
  - Good: < 0.1
  - Needs Improvement: 0.1 - 0.25
  - Poor: > 0.25

- **FCP (First Contentful Paint)**: How fast the first content appears
  - Good: < 1.8s
  - Needs Improvement: 1.8s - 3s
  - Poor: > 3s

- **TTFB (Time to First Byte)**: Server response time
  - Good: < 800ms
  - Needs Improvement: 800ms - 1800ms
  - Poor: > 1800ms

### Development Monitoring

In development mode, Web Vitals are automatically logged to the console with color coding:

- ✅ Green = Good
- ⚠️ Yellow = Needs Improvement
- ❌ Red = Poor

#### Visual Monitor

A floating Web Vitals monitor is available in development:

- **Show/Hide**: Click the "📊 Vitals" button in the bottom-right corner
- **Keyboard Shortcut**: Press `Ctrl+Shift+V` to toggle the monitor
- **Real-time Updates**: Metrics update as you interact with the app

The monitor displays:

- Current values for all Web Vitals
- Color-coded ratings
- Formatted values (milliseconds or unitless)

### Production Analytics

In production, Web Vitals are automatically sent to your analytics service:

#### Google Analytics 4 Integration

If you have Google Analytics 4 (gtag) loaded, metrics are automatically sent as events:

```javascript
gtag('event', 'LCP', {
  value: 2345,
  event_category: 'Web Vitals',
  event_label: 'unique-metric-id',
  non_interaction: true,
})
```

#### Custom Analytics Endpoint

To send metrics to a custom endpoint, set the environment variable:

```bash
VITE_ANALYTICS_ENDPOINT=https://your-analytics.com/api/vitals
```

The metrics will be sent as JSON:

```json
{
  "name": "LCP",
  "value": 2345,
  "rating": "good",
  "id": "unique-metric-id",
  "navigationType": "navigate",
  "url": "https://your-site.com/page",
  "timestamp": 1701612345678
}
```

## Performance Optimizations Applied

### Component Memoization

The following components are wrapped with `React.memo` to prevent unnecessary re-renders:

- `Header` - Prevents re-render on every scroll event
- `ServicesDropdown` - Prevents re-render when parent updates
- `Services` - Static content, no need to re-render
- `LanguageSwitcher` - Prevents re-render on every parent update
- `AnimatedBackground` - Static animations, no props
- `BlogCard` - Prevents re-render in lists
- `Turnstile` - Prevents re-initialization

### Hook Optimizations

- **useScrollDirection**: Added passive scroll listener for better performance
- **useScrollAnimation**: Optimized dependency array to prevent observer recreation
- **useBlogPosts**: Memoized posts array to prevent Fuse.js recreation

### Callback Memoization

ContactForm callbacks are memoized with `useCallback`:

- `handleChange`
- `handleSubmit`
- `handleTurnstileVerify`
- `handleTurnstileError`
- `handleTurnstileExpire`

### Image Optimization

All images include optimization attributes:

- `loading="lazy"` or `loading="eager"` (based on priority)
- `decoding="async"` for non-blocking decoding
- `width` and `height` attributes to prevent layout shift

### Static Data Extraction

Moved static data outside components to prevent recreation:

- Icon maps in ServicesDropdown and Services
- Languages array in LanguageSwitcher

### Computation Memoization

- ServiceDetailPage: Memoized service lookup with `useMemo`
- LanguageSwitcher: Memoized current language computation

## Performance Budget

Current bundle size targets:

| Chunk        | Size (gzipped) | Status     |
| ------------ | -------------- | ---------- |
| Main         | < 200KB        | ✅         |
| React Core   | < 150KB        | ✅         |
| React Router | < 50KB         | ✅         |
| i18n         | < 100KB        | ✅         |
| Utils        | < 100KB        | ⚠️ Monitor |

Warning triggers at 600KB to catch any unusually large chunks.

## Monitoring Best Practices

1. **Check bundle size after adding dependencies**

   ```bash
   npm run build:analyze
   ```

2. **Monitor Web Vitals in development**
   - Press `Ctrl+Shift+V` to open the monitor
   - Check metrics after making changes
   - Aim for all green (good) ratings

3. **Test on real devices**
   - Use Chrome DevTools' Performance tab
   - Test on mobile devices (slower networks/CPUs)
   - Use Lighthouse for comprehensive audits

4. **Regular audits**
   - Run bundle analyzer monthly
   - Check Web Vitals in production analytics
   - Review and update optimizations

## Troubleshooting

### Bundle size increased significantly

1. Run `npm run build:analyze`
2. Identify the new/changed dependencies
3. Consider:
   - Lazy loading the feature
   - Using a smaller alternative library
   - Tree-shaking configuration
   - Code splitting

### Poor Web Vitals scores

**LCP (Slow loading)**

- Optimize images (WebP, proper sizing)
- Reduce render-blocking resources
- Use CDN for static assets
- Implement caching strategies

**INP (Slow interactions)**

- Add React.memo to expensive components
- Use useCallback/useMemo
- Defer non-critical JavaScript
- Break up long tasks

**CLS (Layout shifts)**

- Add width/height to images
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use CSS transforms instead of layout properties

**FCP (Slow first paint)**

- Reduce JavaScript bundle size
- Inline critical CSS
- Optimize server response time
- Use HTTP/2 or HTTP/3

**TTFB (Slow server)**

- Use CDN
- Implement caching
- Optimize backend queries
- Use edge computing

## Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [Bundle Analysis Guide](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Bundle Analysis](https://vitejs.dev/guide/build.html#load-performance-optimization)
