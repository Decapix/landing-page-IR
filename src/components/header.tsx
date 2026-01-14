"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import LanguageSwitcher from "./language-switcher"
import { ArrowDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { useMobile } from "../hooks/use-mobile"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  // const isMobile = useMobile()

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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm rounded-b-[0.98rem]" : " shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-b-[0.95rem]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-start" onClick={() => scrollToSection("hero")}>
            <Image src="/logo-compose.svg" alt="Inside Runway Logo" priority className="h-10 cursor-pointer" width={100} height={100} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-6 flex-1 ml-40">
            <button
              onClick={() => scrollToSection("about")}
              className="text-black hover:text-gray-600 transition-colors text-sm"
            >
              {language === "fr" ? "À propos" : "About"}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-black hover:text-gray-600 transition-colors text-sm"
            >
              {language === "fr" ? "Notre produit" : "Our product"}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-black hover:text-gray-600 transition-colors text-sm"
            >
              {language === "fr" ? "Témoignages" : "Testimonials"}
            </button>
            {/* <button
              onClick={() => scrollToSection("contact")}
              className="text-black hover:text-gray-600 transition-colors text-sm"
            >
              {language === "fr" ? "Nous contacter" : "Contact us"}
            </button> */}
          </div>

          <div className="flex items-center gap-4">

            {/* CTA Buttons */}
            <Link
              href="/book-demo"
              className="hidden md:flex items-center bg-white text-black border border-black px-4 py-2 rounded-[0.5rem] hover:bg-gray-100 transition-colors text-sm"
            >
              {language === "fr" ? "Réserver une démo" : "Book a demo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex items-center bg-black text-white px-4 py-2 rounded-[0.5rem] hover:bg-gray-800 transition-colors text-sm"
            >
              {language === "fr" ? "Prenez part à la révolution" : "Join the revolution"}
              <ArrowDown className="ml-2 h-4 w-4" />
            </button>
            {/* Language Switcher - Desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col space-y-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg 
                  className="w-6 h-6 transform transition-transform duration-300 ease-in-out" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                <div className="space-y-1.5 transition-all duration-300 ease-in-out">
                  <span className="w-6 h-0.5 bg-black block transition-transform duration-300 ease-in-out"></span>
                  <span className="w-6 h-0.5 bg-black block transition-transform duration-300 ease-in-out"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-black hover:text-gray-600"
            >
              {language === "fr" ? "A propos" : "About"}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left py-2 text-black hover:text-gray-600"
            >
              {language === "fr" ? "Notre produit" : "Our product"}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left py-2 text-black hover:text-gray-600"
            >
              {language === "fr" ? "Témoignages" : "Testimonials"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-black hover:text-gray-600"
            >
              {language === "fr" ? "Nous contacter" : "Contact us"}
            </button>

            <div className="pt-2 border-t">
              <LanguageSwitcher />
            </div>

            <Link
              href="/book-demo"
              className="flex items-center bg-white text-black border border-black px-4 py-2 rounded-[0.5rem] w-full justify-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === "fr" ? "Réserver une démo" : "Book a demo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center bg-black text-white px-4 py-2 rounded-[0.5rem] w-full justify-center mt-2"
            >
              {language === "fr" ? "Prenez part à la révolution" : "Join the revolution"}
              <ArrowDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
