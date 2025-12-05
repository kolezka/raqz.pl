import { useTranslation } from 'react-i18next'
import { useMemo, memo, useEffect } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { RiArrowDownSLine } from 'react-icons/ri'

// Move languages array outside component to prevent recreation on every render
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
] as const

function LanguageSwitcherContent({
  close,
  open,
  currentLanguage,
  changeLanguage,
  i18n,
}: {
  close: () => void
  open: boolean
  currentLanguage: (typeof languages)[number]
  changeLanguage: (languageCode: string, close: () => void) => void
  i18n: ReturnType<typeof useTranslation>['i18n']
}) {
  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        close()
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [open, close])

  return (
    <>
      <PopoverButton className="inline-flex w-full justify-center items-center text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-gray-600 focus:outline-none cursor-pointer">
        <span className="text-base mr-1">{currentLanguage.flag}</span>
        <span className="uppercase mr-2">{currentLanguage.code}</span>
        <RiArrowDownSLine className="-mr-1 h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-50 mt-2 w-40 rounded-xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 focus:outline-none overflow-hidden transition ease-out duration-200 data-closed:transform data-closed:opacity-0 data-closed:scale-95 data-closed:translate-y-[-16px]"
      >
        <div className="py-1">
          {languages.map(language => (
            <button
              type="button"
              key={language.code}
              onClick={() => changeLanguage(language.code, close)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-all duration-200 hover:bg-primary-50/60 focus:bg-primary-50/60 focus:text-gray-900 text-left ${
                i18n.language === language.code
                  ? 'bg-primary-50/60 text-primary-600 border-l-2 border-primary-300'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-base">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      </PopoverPanel>
    </>
  )
}

export default memo(function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === i18n.language) || languages[0],
    [i18n.language]
  )

  const changeLanguage = (languageCode: string, close: () => void) => {
    i18n.changeLanguage(languageCode)
    close()

    // Update URL with language prefix
    const currentPath = window.location.pathname
    const pathWithoutLang = currentPath.replace(/^\/(en|pl)/, '') || '/'
    const newPath = languageCode === 'en' ? pathWithoutLang : `/${languageCode}${pathWithoutLang}`

    window.history.replaceState({}, '', newPath)
  }

  return (
    <Popover className="relative inline-block text-left">
      {({ close, open }) => (
        <LanguageSwitcherContent
          close={close}
          open={open}
          currentLanguage={currentLanguage}
          changeLanguage={changeLanguage}
          i18n={i18n}
        />
      )}
    </Popover>
  )
})
