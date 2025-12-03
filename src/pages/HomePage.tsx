import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";
import SEOHead from "../components/SEOHead";
import LatestBlogPosts from "../components/blog/LatestBlogPosts";
import { FEATURES } from "../config/features";
import AnimatedBackground from "../components/AnimatedBackground";

export default function HomePage() {
  return (
    <>
      <SEOHead path="/" />
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <AnimatedBackground />
        </div>
        <Hero />
        <Services />
        {FEATURES.BLOG_ENABLED && <LatestBlogPosts />}

        <About />
        <Contact />
      </div>
    </>
  );
}
