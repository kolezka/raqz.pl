import {
  RiCodeLine,
  RiServerLine,
  RiCpuLine,
  RiToolsLine,
  RiRobotLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import servicesData from '../data/services.json'
import SEOHead from '../components/SEOHead'

const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
}

export default function AllServicesPage() {
  const { t, i18n } = useTranslation()
  const langPrefix = i18n.language === 'en' ? '' : `/${i18n.language}`

  return (
    <div className="bg-white pt-20">
      <SEOHead 
        title={`${t('services.title')} - ${t('meta.title')}`}
        path="/services" 
      />
      {/* Header */}
      <div className="bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('services.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('services.description')}
          </p>
        </div>
      </div>

      {/* Services by Category */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="space-y-24">
          {servicesData.serviceCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <div key={category.id}>
                <div className="mx-auto max-w-2xl text-center mb-16">
                  <div className="flex justify-center">
                    <IconComponent className="h-12 w-12 text-primary-600" />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {t(`serviceCategories.${category.id}`)}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    {t(`servicesDropdown.categories.${category.id}.description`)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="relative overflow-hidden rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{t(`servicesDropdown.services.${service.id}.name`)}</h3>
                        <p className="mt-2 text-sm text-gray-600">{t(`servicesDropdown.services.${service.id}.shortDescription`)}</p>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">{t('services.keyFeatures')}</h4>
                          <ul className="mt-2 text-sm text-gray-600">
                            {(t(`serviceDetails.${service.id}.features`, { returnObjects: true }) as string[]).slice(0, 3).map((feature: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                            {(t(`serviceDetails.${service.id}.features`, { returnObjects: true }) as string[]).length > 3 && (
                              <li className="text-gray-400">+ {(t(`serviceDetails.${service.id}.features`, { returnObjects: true }) as string[]).length - 3} {t('services.more')}</li>
                            )}
                          </ul>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1">
                          {service.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 3 && (
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                              +{service.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          {/* <p className="text-sm font-medium text-primary-600">{t(`serviceDetails.${service.id}.pricing`)}</p> */}
                          <Link
                            to={`${langPrefix}/services/${service.id}`}
                            className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500"
                          >
                            {t('services.learnMore')} <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('navigation.getStarted')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-50">
              {t('contact.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={`${langPrefix}/#contact`}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('navigation.contact')}
              </a>
              <Link to={`${langPrefix}/`} className="text-sm font-semibold leading-6 text-white">
                {t('hero.learnMore')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}