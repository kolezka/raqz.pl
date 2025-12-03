import { useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ServicesDropdown from "./ServicesDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { FEATURES } from "../config/features";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.replace("#", ""));
  if (element) {
    const headerOffset = 80; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection(15);
  const { t, i18n } = useTranslation();

  // Get language prefix for URLs
  const langPrefix = useMemo(
    () => (i18n.language === "en" ? "" : `/${i18n.language}`),
    [i18n.language]
  );

  const navigation = useMemo(
    () => {
      const items = [
        { name: t("navigation.home"), href: `${langPrefix}/`, type: "link" },
        {
          name: t("navigation.services"),
          href: `${langPrefix}/services`,
          type: "dropdown",
        },
        ...(FEATURES.BLOG_ENABLED
          ? [
              {
                name: t("navigation.blog"),
                href: `${langPrefix}/blog`,
                type: "link" as const,
              },
            ]
          : []),
        {
          name: t("navigation.about"),
          href: `${langPrefix}/#about`,
          type: "anchor",
        },
        {
          name: t("navigation.contact"),
          href: `${langPrefix}/#contact`,
          type: "anchor",
        },
      ];
      return items;
    },
    [langPrefix, i18n.language]
  );

  // Check if user is still in the hero section
  const isInHeroSection = useMemo(
    () => scrollY < window.innerHeight,
    [scrollY]
  );

  // Only allow hiding when we're well past the hero section (200px buffer)
  const canHideHeader = useMemo(
    () => scrollY > window.innerHeight + 200,
    [scrollY]
  );

  // Header visibility logic when fixed
  // Show when: scrolling up, can't hide yet, or mobile menu open
  const shouldShowFixedHeader = useMemo(
    () => scrollDirection === "up" || !canHideHeader || mobileMenuOpen,
    [scrollDirection, canHideHeader, mobileMenuOpen]
  );

  return (
    <header
      className={clsx(
        "top-0 left-0 right-0 z-50 border-b",
        // Position: absolute in hero, fixed outside
        isInHeroSection ? "absolute" : "fixed",
        // Background styling - consistent style in hero section
        isInHeroSection
          ? "backdrop-blur-md border-none"
          : "bg-white/50 backdrop-blur-md border-gray-200/20",
        // Visibility - only hide when we can and when scrolling down
        !isInHeroSection && !shouldShowFixedHeader
          ? "-translate-y-full"
          : "translate-y-0",
        // Only animate translate, not position changes
        "transition-transform duration-150 ease-in-out"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to={`${langPrefix}/`}
            className="-m-1.5 p-1.5 group"
            aria-label={t('navigation.home', 'Home')}
          >
            <span
              className="text-2xl font-bold transition-all duration-300 text-primary-600 inline-block group-hover:scale-105 group-hover:rotate-1"
              aria-hidden="true"
            >
              raqz.pl
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-gray-700 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenuLine className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.type === "dropdown" ? (
                <ServicesDropdown />
              ) : item.type === "link" ? (
                <Link
                  to={item.href}
                  className="text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection(item.href.split("#")[1])}
                  className="text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <LanguageSwitcher />
          {/* <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="text-sm font-semibold leading-6 transition-all duration-300 text-gray-900 hover:text-primary-600 group"
          >
            {t("navigation.getStarted")} <span aria-hidden="true" className="inline-block group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </button> */}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 bg-gray-900/25" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition duration-300 ease-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between">
            <Link
              to={`${langPrefix}/`}
              className="-m-1.5 p-1.5"
              aria-label={t('navigation.home', 'Home')}
            >
              <span className="text-xl font-bold text-primary-600" aria-hidden="true">RaqZpl</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <RiCloseLine className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : item.type === "dropdown" ? (
                    <Link
                      key={item.name}
                      to={`${langPrefix}/services`}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => {
                        scrollToSection(item.href.split("#")[1]);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 text-left w-full"
                    >
                      {item.name}
                    </button>
                  )
                )}
              </div>
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 text-left w-full"
                >
                  {t("navigation.getStarted")}
                </button>
              </div>
              <div className="px-4 py-3 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
