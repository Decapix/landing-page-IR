"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "../language-provider"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useViewTracker } from "@/hooks/useViewTracker"
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"

export default function HeroSection() {
  const { language } = useLanguage()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const viewTrackerRef = useViewTracker({
    action: 'view_hero_section',
    category: 'visibility',
    label: 'Section Hero',
    delay: 1500, // au moins 1.5s visible
  })

  const timeInSectionRef = useTimeInSection({
    action: 'view_hero_section',
    category: 'time_in_section',
    label: 'Section Hero',
    threshold: 0.5,
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  const images = [
    {
      src: "/temp_13.jpg",
      alt: "Fashion model in olive green outfit",
    },
    {
      src: "/temp_16.jpg",
      alt: "Fashion model in olive green outfit",
    },
    {
      src: "/temp_9.jpg",
      alt: "Fashion model in black dress with structured shoulders",
    },
    {
      src: "/temp_12.jpg",
      alt: "Fashion model in black blazer dress",
    },
    {
      src: "/temp_14.jpg",
      alt: "Fashion model in olive green outfit",
    },
    {
      src: "/temp_15.jpg",
      alt: "Fashion model in olive green outfit",
    },
    {
      src: "/temp_8.jpg",
      alt: "Fashion model in yellow coat with black scarf",
    },
    {
      src: "/temp_17.jpg",
      alt: "Fashion model in olive green outfit",
    },
    {
      src: "/temp_19.jpg",
      alt: "Fashion model in olive green outfit",
    },
  ]

  // Check if we can scroll in either direction
  const checkScrollability = () => {
    if (!carouselRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollability)
      // Initial check
      checkScrollability()

      return () => carousel.removeEventListener("scroll", checkScrollability)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const carousel = carouselRef.current
    const scrollAmount = 300 // Fixed scroll amount

    if (direction === "left") {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

    // Check scrollability after scrolling
    setTimeout(checkScrollability, 300)
  }

  return (
    <section ref={ref} id="hero" className="pt-28 pb-16 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <div className="relative w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
            <Image src="/logo-simple.svg" alt="Inside Runway Logo" width={32} height={32} />
          </div>

          {/* Brand name */}
          <div className="tracking-widest text-sm text-[#000] mb-4 font-urbanist">INSIDE RUNWAY</div>

          {/* Divider */}
          <div className="w-32 h-px bg-gray-400 mb-12"></div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl text-[#000] sm:text-2xl md:text-3xl lg:text-5xl text-center font-light mb-10 max-w-4xl leading-relaxed space-x-2 px-4"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-thin"
            >{language === "fr" ? "Connecter les" : "Connect"} </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-blisstwin"
            >{language === "fr" ? "créatifs" : "creatives"}</motion.span>,
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-thin"
            >{language === "fr" ? "inspirer la" : "inspire"}</motion.span> <br className="hidden xs:block" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-light font-blisstwin"
            >{language === "fr" ? "mode" : "fashion"}</motion.span>,<br className="hidden xs:block" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-thin"
            >{language === "fr" ? "briller" : "shine"}</motion.span> <br className="hidden xs:block" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-light font-blisstwin"
            >{language === "fr" ? "ensemble" : "together"}</motion.span>.
          </motion.h1>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 pb-12 px-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] h-[auto] rounded-lg overflow-hidden">
                <div className="w-full h-full relative">
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover rounded-[0.5rem]" width={'auto'} height={'auto'} />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-0 right-4 flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className={`p-2 transition-colors ${canScrollLeft ? "text-black hover:text-gray-600" : "text-gray-300 cursor-not-allowed"}`}
              aria-label="Previous slide"
              disabled={!canScrollLeft}
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-2 transition-colors ${canScrollRight ? "text-black hover:text-gray-600" : "text-gray-300 cursor-not-allowed"}`}
              aria-label="Next slide"
              disabled={!canScrollRight}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
