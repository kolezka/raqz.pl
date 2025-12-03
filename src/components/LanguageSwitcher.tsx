import { useTranslation } from 'react-i18next'
import { useState, useMemo, memo } from 'react'
import clsx from 'clsx'

// Move languages array outside component to prevent recreation on every render
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
] as const

export default memo(function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === i18n.language) || languages[0],
    [i18n.language]
  )

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)

    // Update URL with language prefix
    const currentPath = window.location.pathname
    const pathWithoutLang = currentPath.replace(/^\/(en|pl)/, '') || '/'
    const newPath = languageCode === 'en' ? pathWithoutLang : `/${languageCode}${pathWithoutLang}`

    window.history.replaceState({}, '', newPath)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="uppercase">{currentLanguage.code}</span>
        <svg
          className={clsx('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {languages.map(language => (
                <button
                  type="button"
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={clsx(
                    'flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100',
                    i18n.language === language.code && 'bg-gray-50 text-primary-600'
                  )}
                >
                  <span className="text-base">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
})
