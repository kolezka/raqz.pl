import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import LatestBlogPosts from '@/components/blog/LatestBlogPosts'
import AnimatedBackground from '@/components/AnimatedBackground'
import { FEATURES } from '@/config/features'

// ISR: Revalidate every 1 hour
export const revalidate = 3600
export const dynamic = 'force-static'

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Hero />

      <About />
      <Services />

      {/* <Clients /> */}
      <AboutMe />

      {/* <TechStack /> */}
      {FEATURES.BLOG_ENABLED && <LatestBlogPosts />}
      {FEATURES.FAQ_ENABLED && <FAQ />}
      {FEATURES.CONTACT && <Contact />}
    </div>
  )
}
