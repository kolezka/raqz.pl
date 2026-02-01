'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { generateFAQSchema } from '@/lib/schema'
import Script from 'next/script'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Get FAQ items from translations
  const faqItems = t.raw('items') as FAQItem[]

  // Generate FAQ schema for SEO
  const faqSchema = generateFAQSchema(faqItems)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (faqItems.length === 0) {
    return null
  }

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50"
      aria-labelledby="faq-heading"
    >
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{t('description')}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {item.question}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
