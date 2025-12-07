import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import LatestBlogPosts from '@/components/blog/LatestBlogPosts'
import AnimatedBackground from '@/components/AnimatedBackground'
import { FEATURES } from '@/config/features'

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Hero />
      <Services />
      {FEATURES.BLOG_ENABLED && <LatestBlogPosts />}
      <About />
      {FEATURES.CONTACT && <Contact />}
    </div>
  )
}
