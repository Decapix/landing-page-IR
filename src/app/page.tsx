import Header from "../components/header"
import Footer from "../components/footer"
import HeroSection from "../components/sections/hero-section"
import AboutSection from "../components/sections/about-section"
import FeaturesSection from "../components/sections/features-section"
import ContactSection from "../components/sections/contact-section"
import TestimonialsSection from "../components/sections/testimonials-section"

export default function Home() {
  
  return (
    <main className="min-h-screen">
      <Header />

      <HeroSection />

      <AboutSection />

      <FeaturesSection />

      <ContactSection />

      <TestimonialsSection />

      <Footer />
    </main>
  )
}
