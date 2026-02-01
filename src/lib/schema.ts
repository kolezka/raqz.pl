/**
 * Schema.org Structured Data utilities
 * Generates JSON-LD markup for SEO optimization
 *
 * Validate with: https://search.google.com/test/rich-results
 */

export const BASE_URL = 'https://raqz.pl'

export interface OrganizationSchemaOptions {
  locale: string
  name?: string
  description?: string
}

export interface WebSiteSchemaOptions {
  locale: string
  name?: string
  description?: string
}

export interface ServiceSchemaOptions {
  locale: string
  serviceName: string
  serviceDescription: string
  categoryName: string
  serviceUrl: string
  pricing?: string
  features?: string[]
}

export interface LocalBusinessSchemaOptions {
  locale: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Organization Schema
 * Represents the company/business entity
 */
export function generateOrganizationSchema(options: OrganizationSchemaOptions) {
  const { locale } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'raqz.pl',
    alternateName: 'RaqZpl Solutions',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/ico.svg`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    description:
      locale === 'pl'
        ? 'Kompleksowe rozwiązania IT - tworzenie aplikacji webowych i mobilnych, AI, blockchain, infrastruktura chmurowa i wsparcie 24/7 dla nowoczesnych, rozwijających się firm.'
        : 'Comprehensive IT solutions - web and mobile app development, AI, blockchain, cloud infrastructure, and 24/7 support for modern, growing businesses.',
    foundingDate: '2018',
    founder: {
      '@type': 'Person',
      name: 'Mariusz Rakus',
      jobTitle: 'Senior Full-Stack Engineer',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mikołajki',
      addressRegion: 'Mazury',
      addressCountry: 'PL',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Poland',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 52.2297,
          longitude: 21.0122,
        },
        geoRadius: '5000',
      },
    ],
    sameAs: ['https://github.com/kolezka', 'https://www.linkedin.com/in/mariusz-rakus/'],
    telephone: '+48 519 375 240',
    email: 'mariusz@raqz.pl',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48 519 375 240',
      email: 'mariusz@raqz.pl',
      contactType: 'customer service',
      availableLanguage: ['Polish', 'English'],
    },
    knowsAbout: [
      'Web Development',
      'Mobile Development',
      'AI Integrations',
      'Blockchain Development',
      'E-commerce Solutions',
      'Cloud Infrastructure',
      'Software Engineering',
    ],
  }
}

/**
 * WebSite Schema
 * Represents the website with search action
 */
export function generateWebSiteSchema(options: WebSiteSchemaOptions) {
  const { locale, name, description } = options
  const localePath = locale === 'en' ? '' : `/${locale}`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}${localePath}/#website`,
    url: `${BASE_URL}${localePath || '/'}`,
    name: name || 'raqz.pl',
    description:
      description ||
      (locale === 'pl'
        ? 'Profesjonalne tworzenie stron internetowych, aplikacji mobilnych, hosting i usługi infrastruktury IT.'
        : 'Professional web development, mobile apps, hosting, and IT infrastructure services.'),
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: locale === 'en' ? 'en-US' : 'pl-PL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}${localePath}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * LocalBusiness Schema
 * For local SEO - represents the business with location
 */
export function generateLocalBusinessSchema(options: LocalBusinessSchemaOptions) {
  const { locale } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'raqz.pl',
    alternateName: 'RaqZpl Solutions',
    url: BASE_URL,
    logo: `${BASE_URL}/ico.svg`,
    image: `${BASE_URL}/og-image.png`,
    telephone: '+48 519 375 240',
    email: 'mariusz@raqz.pl',
    description:
      locale === 'pl'
        ? 'Usługi IT dla rozwijających się firm - tworzenie aplikacji, automatyzacja AI, rozwiązania blockchain.'
        : 'IT services for growing businesses - app development, AI automation, blockchain solutions.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mikołajki',
      addressRegion: 'Warmińsko-Mazurskie',
      postalCode: '11-730',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.801139,
      longitude: 21.572194,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 52.2297,
        longitude: 21.0122,
      },
      geoRadius: '5000000',
    },
    areaServed: ['Poland', 'European Union', 'United States'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'pl' ? 'Usługi IT' : 'IT Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'pl' ? 'Tworzenie aplikacji webowych' : 'Web Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'pl' ? 'Aplikacje mobilne' : 'Mobile Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'pl' ? 'Integracje AI' : 'AI Integrations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'pl' ? 'Rozwój Blockchain' : 'Blockchain Development',
          },
        },
      ],
    },
  }
}

/**
 * Service Schema
 * For individual service pages
 */
export function generateServiceSchema(options: ServiceSchemaOptions) {
  const { locale, serviceName, serviceDescription, categoryName, serviceUrl, pricing, features } =
    options
  const localePath = locale === 'en' ? '' : `/${locale}`

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}${serviceUrl}/#service`,
    name: serviceName,
    description: serviceDescription,
    url: `${BASE_URL}${serviceUrl}`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    serviceType: categoryName,
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}${localePath}/#contact`,
      servicePhone: '+48 519 375 240',
      availableLanguage: ['Polish', 'English'],
    },
  }

  if (pricing) {
    schema.offers = {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: pricing,
        priceCurrency: pricing.includes('PLN') ? 'PLN' : 'USD',
      },
    }
  }

  if (features && features.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${serviceName} Features`,
      itemListElement: features.map((feature, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: feature,
          },
        },
      })),
    }
  }

  return schema
}

/**
 * BreadcrumbList Schema
 * For navigation breadcrumbs
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * WebPage Schema
 * For individual pages
 */
export function generateWebPageSchema(options: {
  locale: string
  title: string
  description: string
  url: string
  dateModified?: string
}) {
  const { locale, title, description, url, dateModified } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}${url}/#webpage`,
    url: `${BASE_URL}${url}`,
    name: title,
    description,
    isPartOf: {
      '@id': `${BASE_URL}${locale === 'en' ? '' : `/${locale}`}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: locale === 'en' ? 'en-US' : 'pl-PL',
    ...(dateModified && { dateModified }),
  }
}

/**
 * FAQPage Schema
 * For FAQ sections (if needed in the future)
 */
export function generateFAQSchema(
  faqs: Array<{
    question: string
    answer: string
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Person Schema (for AboutMe section)
 */
export function generatePersonSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Mariusz Rakus',
    givenName: 'Mariusz',
    familyName: 'Rakus',
    jobTitle: 'Senior Full-Stack Engineer',
    description:
      locale === 'pl'
        ? 'Senior Full-Stack Engineer z ponad 7-letnim doświadczeniem w budowaniu produktów webowych i mobilnych.'
        : 'Senior Full-Stack Engineer with 7+ years of experience building web and mobile products end-to-end.',
    url: BASE_URL,
    image: `${BASE_URL}/og-image.png`,
    telephone: '+48 519 375 240',
    email: 'mariusz@raqz.pl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gdańsk',
      addressCountry: 'PL',
    },
    sameAs: ['https://github.com/kolezka', 'https://www.linkedin.com/in/mariusz-rakus/'],
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    knowsAbout: [
      'React',
      'React Native',
      'TypeScript',
      'Node.js',
      'Python',
      'Web3',
      'AI/ML',
      'Cloud Infrastructure',
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Uniwersytet WSB Merito Gdańsk',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Uniwersytet Warmińsko-Mazurski w Olsztynie',
      },
    ],
  }
}

/**
 * Combine multiple schemas into a graph
 */
export function combineSchemas(schemas: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { '@context': _, ...rest } = schema
      return rest
    }),
  }
}
