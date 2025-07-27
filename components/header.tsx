"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "首页", href: "#" },
  { name: "技能", href: "#skills" },
  { name: "经验", href: "#experience" },
  { name: "项目", href: "#projects" },
  { name: "联系", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/20" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="text-xl font-bold logo-text"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("#")
                }}
                data-text="郑嘉煌"
              >
                郑嘉煌
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
              <ModeToggle />
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden space-x-2">
              <ModeToggle />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="切换菜单"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/20"
            >
              <div className="container max-w-6xl mx-auto px-4 py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(item.href)}
                      className="w-full justify-start text-lg hover:bg-primary/10"
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style jsx>{`
        .logo-text {
          position: relative;
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        
        /* 浏览器兼容性回退 */
        @supports not (-webkit-background-clip: text) {
          .logo-text {
            background: none;
            -webkit-text-fill-color: initial;
            color: hsl(var(--primary));
          }
        }
        
        /* 确保在不支持的浏览器中显示正常文字 */
        .logo-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: hsl(var(--primary));
          z-index: -1;
          -webkit-text-fill-color: initial;
        }
        
        /* 当支持 background-clip 时隐藏回退文字 */
        @supports (-webkit-background-clip: text) {
          .logo-text::before {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
