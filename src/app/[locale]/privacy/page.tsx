import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Privacy Policy - raqz.pl',
    description: 'Privacy Policy and Cookie Information for raqz.pl',
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (locale === 'pl') {
    return <PrivacyPagePL />
  }

  return <PrivacyPageEN />
}

function PrivacyPageEN() {
  return (
    <div className="bg-white dark:bg-dark-900 pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: December 8, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Welcome to raqz.pl. We are committed to protecting your personal information and your
              right to privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By using our website, you consent to the data practices described in this policy. This
              policy is compliant with the General Data Protection Regulation (GDPR) and other
              applicable data protection laws.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information that you provide directly to us, as well as information
              automatically collected when you use our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Information You Provide
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
              <li>
                <strong>Contact Information:</strong> When you fill out our contact form, we collect
                your name, email address, phone number (optional), and message content.
              </li>
              <li>
                <strong>Communication Records:</strong> When you contact us, we may keep a record of
                your communication to help resolve any issues you might be facing.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone
                setting, browser plug-in types and versions, operating system and platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, products,
                and services (via Google Analytics).
              </li>
              <li>
                <strong>Device Data:</strong> Device type, unique device identifiers, network
                information.
              </li>
            </ul>
          </section>

          {/* 3. Cookies and Tracking Technologies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and
              store certain information. You can manage your cookie preferences at any time using
              our cookie settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Types of Cookies We Use
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Essential Cookies (Always Active)
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies are necessary for the website to function properly. They enable
                  basic features like page navigation, language preferences, and security.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      cookie_consent
                    </code>{' '}
                    - Stores your cookie preferences
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      NEXT_LOCALE
                    </code>{' '}
                    - Stores your language preference (English/Polish)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analytics Cookies (Toggleable)
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies help us understand how visitors interact with our website by
                  collecting and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to analyze website
                    traffic and user behavior. This includes cookies like{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _ga
                    </code>
                    ,{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _gid
                    </code>
                    , and{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _ga_*
                    </code>
                  </li>
                  <li>
                    <strong>Duration:</strong> Google Analytics cookies are typically stored for up
                    to 2 years
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Marketing Cookies (Toggleable)
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  These cookies are used to track visitors across websites to display relevant
                  advertisements. <strong>We currently do not use marketing cookies</strong>, but
                  this option is available for future use.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You can manage your cookie preferences at any time by clicking the "Cookie Settings"
                link in the footer or by using the cookie banner that appears on your first visit.
              </p>
            </div>
          </section>

          {/* 4. How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Responding to your inquiries and providing customer support</li>
              <li>Improving our website and services based on user feedback</li>
              <li>Analyzing website usage and performance</li>
              <li>Sending you updates and information about our services (with your consent)</li>
              <li>Complying with legal obligations and preventing fraud</li>
              <li>Protecting the security and integrity of our website</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              <strong>
                We do not sell, rent, or share your personal data with third parties for their
                marketing purposes.
              </strong>
            </p>
          </section>

          {/* 5. Data Storage and Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Data Storage and Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational security measures to protect
              your personal data against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Data is transmitted over secure HTTPS connections</li>
              <li>We use industry-standard encryption for data storage</li>
              <li>Access to personal data is restricted to authorized personnel only</li>
              <li>Regular security audits and updates are performed</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We retain your personal data only for as long as necessary to fulfill the purposes
              outlined in this privacy policy, unless a longer retention period is required by law.
            </p>
          </section>

          {/* 6. Your GDPR Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Your Rights Under GDPR
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you are a resident of the European Economic Area (EEA), you have certain data
              protection rights:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Right to Access:</strong> You can request copies of your personal data
              </li>
              <li>
                <strong>Right to Rectification:</strong> You can request correction of inaccurate or
                incomplete data
              </li>
              <li>
                <strong>Right to Erasure:</strong> You can request deletion of your personal data
                (right to be forgotten)
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You can request restriction of
                processing your personal data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You can request transfer of your data to
                another organization
              </li>
              <li>
                <strong>Right to Object:</strong> You can object to processing of your personal data
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time
                where we rely on consent
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              To exercise any of these rights, please contact us using the information provided in
              the "Contact Information" section below.
            </p>
          </section>

          {/* 7. Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our website uses the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Google Analytics:</strong> For website analytics and performance monitoring.
                Data is anonymized and used solely for improving user experience. Learn more at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Cloudflare Turnstile:</strong> For CAPTCHA verification on our contact form
                to prevent spam and abuse. Learn more at{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Cloudflare Privacy Policy
                </a>
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              These third-party services have their own privacy policies. We recommend reviewing
              their policies to understand how they handle your data.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our website is not intended for children under the age of 16. We do not knowingly
              collect personal information from children under 16. If you believe we have collected
              information from a child under 16, please contact us immediately, and we will take
              steps to delete such information.
            </p>
          </section>

          {/* 9. Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for other operational, legal, or regulatory reasons. We will notify you
              of any material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Updating the "Last updated" date at the top of this policy</li>
              <li>Posting a notice on our website homepage for significant changes</li>
              <li>Sending you an email notification (if you have provided your email)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how
              we are protecting your information.
            </p>
          </section>

          {/* 10. Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-lg">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">raqz.pl</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">Mikołajki, Mazury, Polska</p>
              <p className="text-gray-600 dark:text-gray-300">
                Email:{' '}
                <a
                  href="mailto:privacy@raqz.pl"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  privacy@raqz.pl
                </a>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              We will respond to your request within 30 days of receipt. If you are not satisfied
              with our response, you have the right to lodge a complaint with your local data
              protection authority.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

function PrivacyPagePL() {
  return (
    <div className="bg-white dark:bg-dark-900 pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Polityka Prywatności
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Ostatnia aktualizacja: 8 grudnia 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. Wprowadzenie */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Wprowadzenie
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Witamy na raqz.pl. Jesteśmy zobowiązani do ochrony Twoich danych osobowych i prawa do
              prywatności. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy,
              wykorzystujemy, ujawniamy i chronimy Twoje informacje podczas odwiedzania naszej
              strony internetowej.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Korzystając z naszej strony internetowej, wyrażasz zgodę na praktyki dotyczące danych
              opisane w niniejszej polityce. Polityka ta jest zgodna z Ogólnym Rozporządzeniem o
              Ochronie Danych (RODO) i innymi obowiązującymi przepisami o ochronie danych.
            </p>
          </section>

          {/* 2. Informacje, które zbieramy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Informacje, które zbieramy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Zbieramy informacje, które nam przekazujesz bezpośrednio, a także informacje
              automatycznie zbierane podczas korzystania z naszej strony internetowej.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Informacje, które podajesz
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
              <li>
                <strong>Dane kontaktowe:</strong> Kiedy wypełniasz nasz formularz kontaktowy,
                zbieramy Twoje imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie) oraz
                treść wiadomości.
              </li>
              <li>
                <strong>Zapisy komunikacji:</strong> Kiedy się z nami kontaktujesz, możemy
                przechowywać zapis Twojej komunikacji, aby pomóc rozwiązać wszelkie problemy, które
                możesz napotkać.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Automatycznie zbierane informacje
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Dane techniczne:</strong> Adres IP, typ i wersja przeglądarki, ustawienia
                strefy czasowej, typy i wersje wtyczek przeglądarki, system operacyjny i platforma.
              </li>
              <li>
                <strong>Dane o użytkowaniu:</strong> Informacje o tym, jak korzystasz z naszej
                strony internetowej, produktów i usług (za pośrednictwem Google Analytics).
              </li>
              <li>
                <strong>Dane urządzenia:</strong> Typ urządzenia, unikalne identyfikatory
                urządzenia, informacje o sieci.
              </li>
            </ul>
          </section>

          {/* 3. Pliki cookie i technologie śledzące */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Pliki cookie i technologie śledzące
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Używamy plików cookie i podobnych technologii śledzących do monitorowania aktywności
              na naszej stronie internetowej i przechowywania określonych informacji. Możesz
              zarządzać swoimi preferencjami dotyczącymi plików cookie w dowolnym momencie,
              korzystając z naszych ustawień plików cookie.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Rodzaje używanych plików cookie
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Niezbędne pliki cookie (Zawsze aktywne)
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Te pliki cookie są niezbędne do prawidłowego działania strony internetowej.
                  Umożliwiają podstawowe funkcje, takie jak nawigacja po stronie, preferencje
                  językowe i bezpieczeństwo.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      cookie_consent
                    </code>{' '}
                    - Przechowuje Twoje preferencje dotyczące plików cookie
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      NEXT_LOCALE
                    </code>{' '}
                    - Przechowuje Twoje preferencje językowe (angielski/polski)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pliki cookie analityczne (Do wyboru)
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Te pliki cookie pomagają nam zrozumieć, jak odwiedzający korzystają z naszej
                  strony internetowej, zbierając i raportując informacje w sposób anonimowy.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>
                    <strong>Google Analytics:</strong> Używamy Google Analytics do analizy ruchu na
                    stronie internetowej i zachowań użytkowników. Obejmuje to pliki cookie takie jak{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _ga
                    </code>
                    ,{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _gid
                    </code>{' '}
                    oraz{' '}
                    <code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">
                      _ga_*
                    </code>
                  </li>
                  <li>
                    <strong>Czas trwania:</strong> Pliki cookie Google Analytics są zwykle
                    przechowywane przez maksymalnie 2 lata
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pliki cookie marketingowe (Do wyboru)
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Te pliki cookie są używane do śledzenia odwiedzających w różnych witrynach w celu
                  wyświetlania odpowiednich reklam.{' '}
                  <strong>Obecnie nie używamy plików cookie marketingowych</strong>, ale ta opcja
                  jest dostępna do wykorzystania w przyszłości.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Możesz zarządzać swoimi preferencjami dotyczącymi plików cookie w dowolnym momencie,
                klikając link "Ustawienia plików cookie" w stopce lub korzystając z banera plików
                cookie, który pojawia się podczas pierwszej wizyty.
              </p>
            </div>
          </section>

          {/* 4. Jak wykorzystujemy Twoje informacje */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Jak wykorzystujemy Twoje informacje
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Zebrane informacje wykorzystujemy do:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Odpowiadania na Twoje zapytania i świadczenia obsługi klienta</li>
              <li>
                Ulepszania naszej strony internetowej i usług na podstawie opinii użytkowników
              </li>
              <li>Analizowania wykorzystania strony internetowej i jej wydajności</li>
              <li>Wysyłania aktualizacji i informacji o naszych usługach (za Twoją zgodą)</li>
              <li>Przestrzegania zobowiązań prawnych i zapobiegania oszustwom</li>
              <li>Ochrony bezpieczeństwa i integralności naszej strony internetowej</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              <strong>
                Nie sprzedajemy, nie wynajmujemy ani nie udostępniamy Twoich danych osobowych
                stronom trzecim do celów marketingowych.
              </strong>
            </p>
          </section>

          {/* 5. Przechowywanie danych i bezpieczeństwo */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Przechowywanie danych i bezpieczeństwo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Wdrażamy odpowiednie techniczne i organizacyjne środki bezpieczeństwa, aby chronić
              Twoje dane osobowe przed nieautoryzowanym dostępem, zmianą, ujawnieniem lub
              zniszczeniem.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Dane są przesyłane przez bezpieczne połączenia HTTPS</li>
              <li>
                Używamy szyfrowania zgodnego ze standardami branżowymi do przechowywania danych
              </li>
              <li>Dostęp do danych osobowych jest ograniczony tylko do upoważnionego personelu</li>
              <li>Przeprowadzamy regularne audyty bezpieczeństwa i aktualizacje</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Przechowujemy Twoje dane osobowe tylko tak długo, jak jest to niezbędne do realizacji
              celów określonych w niniejszej polityce prywatności, chyba że dłuższy okres
              przechowywania jest wymagany przez prawo.
            </p>
          </section>

          {/* 6. Twoje prawa RODO */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Twoje prawa zgodnie z RODO
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Jeśli jesteś mieszkańcem Europejskiego Obszaru Gospodarczego (EOG), masz określone
              prawa ochrony danych:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Prawo dostępu:</strong> Możesz poprosić o kopie swoich danych osobowych
              </li>
              <li>
                <strong>Prawo do sprostowania:</strong> Możesz poprosić o korektę niedokładnych lub
                niekompletnych danych
              </li>
              <li>
                <strong>Prawo do usunięcia:</strong> Możesz poprosić o usunięcie swoich danych
                osobowych (prawo do bycia zapomnianym)
              </li>
              <li>
                <strong>Prawo do ograniczenia przetwarzania:</strong> Możesz poprosić o ograniczenie
                przetwarzania swoich danych osobowych
              </li>
              <li>
                <strong>Prawo do przenoszenia danych:</strong> Możesz poprosić o przeniesienie
                swoich danych do innej organizacji
              </li>
              <li>
                <strong>Prawo do sprzeciwu:</strong> Możesz sprzeciwić się przetwarzaniu swoich
                danych osobowych
              </li>
              <li>
                <strong>Prawo do wycofania zgody:</strong> Możesz wycofać zgodę w dowolnym momencie,
                gdy opieramy się na zgodzie
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Aby skorzystać z któregokolwiek z tych praw, skontaktuj się z nami, korzystając z
              informacji podanych w sekcji "Informacje kontaktowe" poniżej.
            </p>
          </section>

          {/* 7. Usługi stron trzecich */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Usługi stron trzecich
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Nasza strona internetowa korzysta z następujących usług stron trzecich:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Google Analytics:</strong> Do analityki strony internetowej i monitorowania
                wydajności. Dane są anonimizowane i wykorzystywane wyłącznie w celu poprawy
                doświadczenia użytkownika. Dowiedz się więcej na{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Polityka prywatności Google
                </a>
              </li>
              <li>
                <strong>Cloudflare Turnstile:</strong> Do weryfikacji CAPTCHA w naszym formularzu
                kontaktowym w celu zapobiegania spamowi i nadużyciom. Dowiedz się więcej na{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Polityka prywatności Cloudflare
                </a>
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Te usługi stron trzecich mają własne polityki prywatności. Zalecamy zapoznanie się z
              ich politykami, aby zrozumieć, jak przetwarzają Twoje dane.
            </p>
          </section>

          {/* 8. Prywatność dzieci */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Prywatność dzieci
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Nasza strona internetowa nie jest przeznaczona dla dzieci poniżej 16 roku życia. Nie
              zbieramy świadomie danych osobowych od dzieci poniżej 16 roku życia. Jeśli uważasz, że
              zebraliśmy informacje od dziecka poniżej 16 roku życia, skontaktuj się z nami
              natychmiast, a podejmiemy kroki w celu usunięcia takich informacji.
            </p>
          </section>

          {/* 9. Zmiany w niniejszej Polityce Prywatności */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Zmiany w niniejszej Polityce Prywatności
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Możemy okresowo aktualizować niniejszą Politykę Prywatności, aby odzwierciedlić zmiany
              w naszych praktykach lub z innych powodów operacyjnych, prawnych lub regulacyjnych.
              Powiadomimy Cię o wszelkich istotnych zmianach poprzez:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Aktualizację daty "Ostatnia aktualizacja" u góry tej polityki</li>
              <li>
                Umieszczenie powiadomienia na stronie głównej naszej witryny w przypadku istotnych
                zmian
              </li>
              <li>Wysłanie powiadomienia e-mail (jeśli podałeś swój adres e-mail)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Zachęcamy do okresowego przeglądania niniejszej Polityki Prywatności, aby być na
              bieżąco z tym, jak chronimy Twoje informacje.
            </p>
          </section>

          {/* 10. Informacje kontaktowe */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Informacje kontaktowe
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Jeśli masz jakiekolwiek pytania, wątpliwości lub prośby dotyczące niniejszej Polityki
              Prywatności lub naszych praktyk dotyczących danych, skontaktuj się z nami:
            </p>
            <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-lg">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">raqz.pl</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">Mikołajki, Mazury, Polska</p>
              <p className="text-gray-600 dark:text-gray-300">
                Email:{' '}
                <a
                  href="mailto:privacy@raqz.pl"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  privacy@raqz.pl
                </a>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Odpowiemy na Twoje zapytanie w ciągu 30 dni od otrzymania. Jeśli nie jesteś zadowolony
              z naszej odpowiedzi, masz prawo złożyć skargę do lokalnego organu ochrony danych.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
