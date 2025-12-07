import type { MDXComponents } from 'mdx/types'
import { mdxComponents as customComponents } from '@/components/blog/MDXComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  }
}
