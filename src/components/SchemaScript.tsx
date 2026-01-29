import Script from 'next/script'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@/lib/schema'

interface SchemaScriptProps {
  locale: string
  name?: string
  description?: string
}

/**
 * Global Schema.org structured data component
 * Adds Organization, WebSite, and LocalBusiness schemas
 */
export default function SchemaScript({ locale, name, description }: SchemaScriptProps) {
  const organizationSchema = generateOrganizationSchema({ locale })
  const webSiteSchema = generateWebSiteSchema({ locale, name, description })
  const localBusinessSchema = generateLocalBusinessSchema({ locale })

  const combinedSchema = combineSchemas([organizationSchema, webSiteSchema, localBusinessSchema])

  return (
    <Script
      id="schema-org-global"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  )
}
