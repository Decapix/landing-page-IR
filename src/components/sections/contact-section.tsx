"use client"
import { useState } from "react"
import { useLanguage } from "../language-provider"
import { motion } from "framer-motion"
import { CheckCircle, ChevronDown } from "lucide-react"
import Image from "next/image"
import { LandingRegister } from "@/modules/landing/landing.module"
import { event } from '@/libs/gtab'
import { useViewTracker } from '@/hooks/useViewTracker'
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"
export default function ContactSection() {
  const { language } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    socialMedia: "",
    position: "",
    otherPosition: "",
    message: "",
    company: "", // honeypot field, must remain empty
    language: language
  });

  const [isError, setIsError] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState("")

  const viewTrackerRef = useViewTracker({
    action: 'view_contact_section',
    category: 'visibility',
    label: 'Section Contact',
    delay: 1500, // au moins 1.5s visible
  })

  const timeInSectionRef = useTimeInSection({
    action: 'view_contact_section',
    category: 'time_in_section',
    label: 'Section Contact',
    threshold: 0.5,
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    event({
      action: 'click_contact',
      category: 'form',
      label: 'Send contact form',
      value: 1,
    });



    if (!formData.lastName || !formData.firstName || !formData.email) {
      setIsSubmitted(false)
      setIsError(true)
      setIsErrorMessage(language === 'fr' ? 'Veuillez remplir tous les champs requis.' : 'Please fill out required fields.')
      setIsLoading(false)
      return
    }

    // Honeypot anti-spam: must be empty
    if (formData.company && formData.company.trim() !== '') {
      // ignore silently to avoid providing feedback to bots
      setIsSubmitted(false)
      setIsLoading(false)
      return
    }

    if (!formData.position) {
      setIsSubmitted(false)
      setIsError(true)
      setIsErrorMessage(language === 'fr' ? 'Veuillez indiquer votre position.' : 'Please indicate your position.')
      setIsLoading(false)
      return
    }

    if (formData.position === "other" && !formData.otherPosition) {
      setIsSubmitted(false)
      setIsError(true)
      setIsErrorMessage(language === 'fr' ? 'Veuillez préciser votre position.' : 'Please specify your position.')
      setIsLoading(false)
      return
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setIsSubmitted(false)
      setIsError(true)
      setIsErrorMessage(language === 'fr' ? "Email invalide." : "Invalid email.")
      setIsLoading(false)
      return
    }

    if (!formData.message || formData.message.trim().length < 10) {
      setIsSubmitted(false)
      setIsError(true)
      setIsErrorMessage(language === 'fr' ? 'Veuillez saisir un message (au moins 10 caractères).' : 'Please enter a message (at least 10 characters).')
      setIsLoading(false)
      return
    }


    setIsLoading(true)
    const payload = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      email: formData.email,
      socialMedia: formData.socialMedia,
      position: formData.position === "other" ? formData.otherPosition : formData.position,
      language: language,
      message: formData.message,
      company: formData.company,
    }

    try {
      const response = await LandingRegister(payload)
      if (response.success) {
        setIsSubmitted(true)
        setIsError(false)
        setIsErrorMessage("")
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          socialMedia: "",
          position: "",
          otherPosition: "",
          message: "",
          company: "",
          language: language
        })
      } else {
        setIsError(true)
        setIsErrorMessage(response.message)
      }
    } catch (error) {
      setIsError(true)
      setIsErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section ref={ref} id="contact" className="relative h-screen min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/shutterstock.jpg" alt="Fashion models" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {/* Section title */}
          <h2 className="uppercase tracking-wider text-sm text-white text-center mb-6">
            {language === "fr" ? "Suivez l'aventure" : "Follow the adventure"}
          </h2>

          {/* Main heading */}
          <h3 className="text-xl md:text-xl lg:text-4xl text-white text-center font-light mb-4">
            {language === "fr"
              ? "Inscrivez-vous et prenez part à la révolution"
              : "Sign up and take part in the revolution"}
          </h3>

          {/* Subtitle */}
          <p className="text-white text-center mb-8">
            {language === "fr" ? "Inside Runway sera bientôt disponible" : "Inside Runway will be available soon"}
          </p>

          {/* Form */}
          <div className="space-y-4 w-full md:w-[60%] rounded-[0.5rem] mx-auto">
            {isError && (
              <div className={`px-4 py-3 rounded relative mb-4 ${isError ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`} role="alert">
                <span className="block sm:inline">
                  {isErrorMessage || (language === "fr" 
                    ? isError ? isErrorMessage : "Inscription réussie"
                    : isError ? isErrorMessage : "Registration successful")}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={language === "fr" ? "Votre nom *" : "Your last name *"}
                className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563]"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <input
                type="text"
                placeholder={language === "fr" ? "Votre prénom *" : "Your first name *"}
                className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563]"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <input
              type="email"
              placeholder={language === "fr" ? "Votre email *" : "Your email *"}
              className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-[0.5rem] bg-white appearance-none text-[#4b5563]"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              >
                <option value="" disabled>
                  {language === "fr" ? "Position *" : "Position *"}
                </option>
                <option value="stylist">{language === "fr" ? "Styliste" : "Stylist"}</option>
                <option value="brandandpressoffice">{language === "fr" ? "Marque / Bureau de presse" : "Brand / Press office"}</option>
                <option value="other">{language === "fr" ? "Autre" : "Other"}</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {formData.position === "other" && (
              <input
                type="text"
                placeholder={language === "fr" ? "Précisez votre position *" : "Specify your position *"}
                className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563]"
                value={formData.otherPosition || ""}
                onChange={(e) => setFormData({ ...formData, otherPosition: e.target.value })}
              />
            )}

            <input
              type="text"
              placeholder={language === "fr" ? "Réseaux sociaux" : "Social media"}
              className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563]"
              value={formData.socialMedia}
              onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
            />

            {/* Message */}
            <textarea
              placeholder={language === "fr" ? "Votre message *" : "Your message *"}
              className="w-full px-4 py-3 rounded-[0.5rem] bg-white text-[#4b5563] min-h-[120px]"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            {/* Honeypot anti-spam - should remain empty; hidden from real users */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || isSubmitted}
              aria-busy={isLoading}
              className={`w-full py-3 rounded-[0.5rem] relative overflow-hidden ${isLoading || isSubmitted ? 'bg-gray-600 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-green-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isSubmitted ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: isSubmitted || isLoading ? 0 : 1 }}
              >
                {language === "fr" ? "Envoyer" : "Send"}
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSubmitted ? 1 : 0 }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4" /> {language === "fr" ? "Informations envoyées" : "Information sent"}
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 1 : 0 }}
              >
                <motion.div
                  className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
