"use client"

import { useState } from "react"
import { useLanguage } from "../language-provider"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useViewTracker } from "@/hooks/useViewTracker"
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"

export default function TestimonialsSection() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewTrackerRef = useViewTracker({
    action: 'view_testimonials_section',
    category: 'visibility',
    label: 'Section Testimonials',
    delay: 1500, // au moins 1.5s visible
  })

  const timeInSectionRef = useTimeInSection({
    action: 'view_testimonials_section',
    category: 'time_in_section',
    label: 'Section Testimonials',
    threshold: 0.5,
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  const testimonials = [
    {
      quote: {
        fr: "Bravo pour Inside Runway, c'est une plateforme dont on va se servir; c'est l'outil du futur",
        en: "Congratulations to Inside Runway, it's a platform we're going to use; it's the tool of the future",
      },
      author: "Marilyn Fitoussi",
      title: {
        fr: "Styliste de la série Emily in Paris",
        en: "Stylist for the Emily in Paris series",
      },
    },
    {
      quote: {
        fr: "Inside Runway, la plateforme qui révolutionne le secteur de la mode.",
        en: "Inside Runway, the platform that revolutionizes the fashion industry.",
      },
      author: "Vogue France",
      title: {
        fr: "Vogue France",
        en: "Vogue France",
      },
    },
    {
      quote: {
        fr: "Inside Runway, le chaînon digital manquant de l’industrie de la mode",
        en: "Inside Runway, the missing digital link in the fashion industry.",
      },
      author: "Madame Figaro",
      title: {
        fr: "Madame Figaro",
        en: "Madame Figaro",
      },
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section title */}
          <h2 className="uppercase tracking-wider text-sm mb-6 text-[#000]">
            {language === "fr" ? "Témoignages" : "Testimonials"}
          </h2>

          {/* Subtitle */}
          <h3 className="text-3xl font-light mb-16 text-[#000]">
            {language === "fr" ? (
              <>
                Ils en <span className="font-blisstwin italic">parlent</span> déjà
              </>
            ) : (
              <>
                They're already <span className="font-blisstwin italic">talking</span> about it
              </>
            )}
          </h3>

          {/* Testimonial carousel */}
          <div className="relative w-full py-10">
            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#4b5563] transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={24} className="text-[#000]" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#4b5563] transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={24} className="text-[#000]" />
            </button>

            {/* Quote marks */}
            <div className="flex justify-center mb-6">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 60C14.6667 60 10 58.1667 6 54.5C2 50.8333 0 46.3333 0 41C0 36.3333 1.5 31.8333 4.5 27.5C7.5 23.1667 11.3333 19.5 16 16.5C20.6667 13.5 25.6667 11.3333 31 10C36.3333 8.66667 41.3333 8 46 8V16C38.6667 16.6667 32.5 18.8333 27.5 22.5C22.5 26.1667 19.3333 30.3333 18 35C19.3333 34.3333 21 34 23 34C27 34 30.3333 35.5 33 38.5C35.6667 41.5 37 45.1667 37 49.5C37 53.8333 35.5 57.3333 32.5 60C29.5 62.6667 25.3333 64 20 64V60ZM63 60C57.6667 60 53 58.1667 49 54.5C45 50.8333 43 46.3333 43 41C43 36.3333 44.5 31.8333 47.5 27.5C50.5 23.1667 54.3333 19.5 59 16.5C63.6667 13.5 68.6667 11.3333 74 10C79.3333 8.66667 84.3333 8 89 8V16C81.6667 16.6667 75.5 18.8333 70.5 22.5C65.5 26.1667 62.3333 30.3333 61 35C62.3333 34.3333 64 34 66 34C70 34 73.3333 35.5 76 38.5C78.6667 41.5 80 45.1667 80 49.5C80 53.8333 78.5 57.3333 75.5 60C72.5 62.6667 68.3333 64 63 64V60Z"
                  fill="#222222"
                />
              </svg>
            </div>

            {/* Testimonial content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto px-10"
            >
              <blockquote className="text-2xl text-[#000] md:text-3xl italic font-serif mb-8 leading-relaxed">
                "{language === "fr" ? testimonials[currentIndex].quote.fr : testimonials[currentIndex].quote.en}"
              </blockquote>

              <div className="mb-12">
                <h4 className="font-medium text-xl mb-1 text-[#000]">{testimonials[currentIndex].author}</h4>
                <p className="text-[#4b5563]">
                  {language === "fr" ? testimonials[currentIndex].title.fr : testimonials[currentIndex].title.en}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-lg h-px bg-gray-500"></div>
        </motion.div>
      </div>
    </section>
  )
}
