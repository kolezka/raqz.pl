import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout";
import "./i18n";

// Lazy load page components for better code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AllServicesPage = lazy(() => import("./pages/AllServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Loading component
function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center" role="status" aria-live="polite">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
          aria-hidden="true"
        />
        <p className="mt-4 text-gray-600">
          {t("common.loading", "Loading...")}
        </p>
      </div>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect language from URL path
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(en|pl)/);

    if (langMatch) {
      const detectedLang = langMatch[1];
      if (i18n.language !== detectedLang) {
        i18n.changeLanguage(detectedLang);
      }
    } else {
      // If no language in URL, redirect to default language
      const defaultLang = i18n.language || "en";
      if (path === "/") {
        window.history.replaceState(
          {},
          "",
          defaultLang === "en" ? "/" : `/${defaultLang}`
        );
      } else {
        window.history.replaceState(
          {},
          "",
          defaultLang === "en" ? path : `/${defaultLang}${path}`
        );
      }
    }

    // Update document lang attribute
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* English routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<AllServicesPage />} />
            <Route
              path="/services/:serviceId"
              element={<ServiceDetailPage />}
            />

            {/* Blog routes - conditionally rendered based on feature flag */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/category/:category" element={<BlogListPage />} />
            <Route path="/blog/tag/:tag" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Polish routes */}
            <Route path="/pl" element={<HomePage />} />
            <Route path="/pl/services" element={<AllServicesPage />} />
            <Route
              path="/pl/services/:serviceId"
              element={<ServiceDetailPage />}
            />

            <Route path="/pl/blog" element={<BlogListPage />} />
            <Route
              path="/pl/blog/category/:category"
              element={<BlogListPage />}
            />
            <Route path="/pl/blog/tag/:tag" element={<BlogListPage />} />
            <Route path="/pl/blog/:slug" element={<BlogPostPage />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
