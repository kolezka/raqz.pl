/* eslint-disable react-refresh/only-export-components */
import type { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react'
import { createElement } from 'react'
import { Link } from 'react-router-dom'

// Custom heading components with anchor links
function Heading({
  level,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const id =
    typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined

  const className =
    level === 1
      ? 'text-4xl font-bold mt-8 mb-4 text-gray-900'
      : level === 2
        ? 'text-3xl font-bold mt-8 mb-4 text-gray-900 border-b border-gray-200 pb-2'
        : level === 3
          ? 'text-2xl font-semibold mt-6 mb-3 text-gray-800'
          : level === 4
            ? 'text-xl font-semibold mt-4 mb-2 text-gray-800'
            : 'text-lg font-medium mt-3 mb-2 text-gray-700'

  return createElement(tag, { id, className, ...props }, children)
}

// Custom paragraph component
function P({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  )
}

// Custom link component
function A({
  href,
  children,
  ...props
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700 underline transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={href || '#'}
      className="text-primary-600 hover:text-primary-700 underline transition-colors"
    >
      {children}
    </Link>
  )
}

// Custom list components
function Ul({ children, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ul>
  )
}

function Ol({ children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ol>
  )
}

function Li({ children, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className="ml-4" {...props}>
      {children}
    </li>
  )
}

// Custom code block component
function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  )
}

function Code({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="bg-gray-100 text-primary-600 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  )
}

// Custom blockquote component
function Blockquote({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="border-l-4 border-primary-500 pl-4 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  )
}

// Custom table components
function Table({ children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto mb-6">
      <table
        className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function Thead({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  )
}

function Tbody({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200" {...props}>
      {children}
    </tbody>
  )
}

function Tr({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>{children}</tr>
}

function Th({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  )
}

function Td({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="px-6 py-4 text-sm text-gray-700" {...props}>
      {children}
    </td>
  )
}

// Custom horizontal rule
function Hr(props: HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-8 border-gray-300" {...props} />
}

// Custom image component with lazy loading
function Img({
  src,
  alt,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLImageElement> & { src?: string; alt?: string },
  HTMLImageElement
>) {
  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      className="rounded-lg w-full h-auto my-6"
      {...props}
    />
  )
}

// Custom strong component
function Strong({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  )
}

// Custom em component
function Em({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <em className="italic" {...props}>
      {children}
    </em>
  )
}

// Export all custom components
export const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={1} {...props} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={2} {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={3} {...props} />,
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={4} {...props} />,
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={5} {...props} />,
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => <Heading level={6} {...props} />,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  hr: Hr,
  img: Img,
  strong: Strong,
  em: Em,
}
