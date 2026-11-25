import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import DynamicBackground from "@/components/dynamic-background"
import { getContactConfig } from "@/lib/contact-config"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <DynamicBackground />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact canSubmit={Boolean(getContactConfig())} />
      <ScrollToTop />
    </main>
  )
}
