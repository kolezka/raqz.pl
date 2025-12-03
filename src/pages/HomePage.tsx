import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import SEOHead from '../components/SEOHead'
import LatestBlogPosts from '../components/blog/LatestBlogPosts'
import { FEATURES } from '../config/features'

export default function HomePage() {
  return (
    <>
      <SEOHead path="/" />
      <Hero />
      <Services />
      {FEATURES.BLOG_ENABLED && <LatestBlogPosts />}
      <About />
      <Contact />
    </>
  )
}