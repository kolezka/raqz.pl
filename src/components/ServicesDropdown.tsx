import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  RiArrowDownSLine,
  RiCodeLine,
  RiServerLine,
  RiCpuLine,
  RiToolsLine,
  RiRobotLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import servicesData from '../data/services.json'

const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
}

export default function ServicesDropdown() {
  const { t } = useTranslation()
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-gray-600">
          {t('navigation.services')}
          <RiArrowDownSLine className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

        <MenuItems
          transition
          className="absolute left-0 z-50 mt-3 max-w-4xl w-[min(100vw-2rem,64rem)] max-h-[80vh] origin-top-left rounded-xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 border border-gray-100/50 focus:outline-none overflow-y-auto overflow-x-hidden transition ease-out duration-200 data-closed:transform data-closed:opacity-0 data-closed:scale-95 data-closed:translate-y-2"
        >
          <div className='columns-2 gap-0'>
            {servicesData.serviceCategories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              return (
                <div key={category.id} className="bg-white break-inside-avoid">
                  <div className="px-4 py-3 bg-linear-to-r from-primary-50/80 to-primary-100/40">
                    <div className="flex items-center text-xs font-semibold text-gray-900">
                      <div className="p-1.5 bg-white/80 rounded-md mr-2 shadow-sm">
                        <IconComponent className="h-3 w-3 text-primary-600" aria-hidden="true" />
                      </div>
                      {t(`servicesDropdown.categories.${category.id}.name`)}
                    </div>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">{t(`servicesDropdown.categories.${category.id}.description`)}</p>
                  </div>
                  <div className="flex-1">
                    {category.services.map((service) => (
                      <MenuItem key={service.id}>
                        {({ focus }) => (
                          <Link
                            to={`/services/${service.id}`}
                            className={clsx(
                              'group flex items-center px-4 py-2 text-xs transition-all duration-200 hover:bg-primary-50/60 hover:border-l-2 hover:border-primary-300',
                              {
                                'bg-primary-50/60 text-gray-900 border-l-2 border-primary-400': focus,
                                'text-gray-700': !focus
                              }
                            )}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{t(`servicesDropdown.services.${service.id}.name`)}</div>
                              <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{t(`servicesDropdown.services.${service.id}.shortDescription`)}</div>
                            </div>
                            <div className={clsx(
                              'transition-opacity duration-200 text-primary-400 text-xs',
                              {
                                'opacity-100': focus,
                                'opacity-0': !focus
                              }
                            )}>
                              →
                            </div>
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full border-t border-gray-200/50 bg-linear-to-r from-primary-600 to-primary-700">
            <MenuItem>
              {({ focus }) => (
                <Link
                  to="/services"
                  className={clsx(
                    'block px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20',
                    {
                      'bg-white/20': focus
                    }
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{t('services.viewAll')}</span>
                    <span className="text-lg">→</span>
                  </div>
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
    </Menu>
  )
}