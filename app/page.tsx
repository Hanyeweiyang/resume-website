import type { Metadata } from "next"
import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import DynamicBackground from "@/components/dynamic-background"

export const metadata: Metadata = {
  title: "郑嘉煌 | 全栈开发工程师",
  description: "郑嘉煌的个人作品集和简历，专注于React、Next.js和现代Web技术的全栈开发工程师。",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <DynamicBackground />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <ScrollToTop />
    </main>
  )
}
