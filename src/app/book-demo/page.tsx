"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

type UserType = "stylist" | "press_office" | "brand" | ""

export default function BookDemoPage() {
  const { language } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    userType: "" as UserType,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    socialMedia: "",
    role: "",
  })

  const userTypeOptions = [
    {
      value: "stylist" as UserType,
      labelEn: "Stylist",
      labelFr: "Styliste",
    },
    {
      value: "press_office" as UserType,
      labelEn: "Press Office",
      labelFr: "Bureau de presse",
    },
    {
      value: "brand" as UserType,
      labelEn: "Brand",
      labelFr: "Marque",
    },
  ]

  const handleSubmit = async () => {
    // Validation
    if (!formData.userType) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Veuillez sélectionner votre type de profil."
          : "Please select your profile type."
      )
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Veuillez remplir tous les champs requis."
          : "Please fill out all required fields."
      )
      return
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setIsError(true)
      setErrorMessage(
        language === "fr" ? "Email invalide." : "Invalid email."
      )
      return
    }

    if (!formData.phone) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Veuillez entrer votre numéro de téléphone."
          : "Please enter your phone number."
      )
      return
    }

    if (!formData.country) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Veuillez entrer votre pays."
          : "Please enter your country."
      )
      return
    }

    if (!formData.role) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Veuillez entrer votre fonction."
          : "Please enter your role."
      )
      return
    }

    setIsLoading(true)
    setIsError(false)

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setIsError(true)
        setErrorMessage(
          language === "fr"
            ? "Une erreur est survenue. Veuillez réessayer."
            : "An error occurred. Please try again."
        )
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage(
        language === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light mb-4">
              {language === "fr" ? "Réserver une démo" : "Book a demo"}
            </h1>
            <p className="text-gray-600 mb-8">
              {language === "fr"
                ? "Remplissez le formulaire ci-dessous et nous vous contacterons pour planifier une démonstration."
                : "Fill out the form below and we'll contact you to schedule a demonstration."}
            </p>

            {/* Error message */}
            {isError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[0.5rem] mb-6"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            {/* Success message */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-[0.5rem] p-8 text-center"
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">
                  {language === "fr"
                    ? "Demande envoyée !"
                    : "Request submitted!"}
                </h2>
                <p className="text-gray-600">
                  {language === "fr"
                    ? "Nous vous contacterons bientôt pour planifier votre démo."
                    : "We'll contact you soon to schedule your demo."}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center mt-6 text-black hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === "fr" ? "Retour à l'accueil" : "Back to home"}
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* User type selection - Radio buttons */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {language === "fr"
                      ? "Vous êtes *"
                      : "You are *"}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {userTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center px-4 py-3 border rounded-[0.5rem] cursor-pointer transition-colors ${
                          formData.userType === option.value
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={option.value}
                          checked={formData.userType === option.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userType: e.target.value as UserType,
                            })
                          }
                          className="sr-only"
                        />
                        <span>
                          {language === "fr" ? option.labelFr : option.labelEn}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "fr" ? "Prénom *" : "First name *"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "fr" ? "Nom *" : "Last name *"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "fr" ? "Email *" : "Email *"}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "fr" ? "Numéro de téléphone *" : "Phone number *"}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "fr" ? "Pays *" : "Country *"}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>

                {/* Social media */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "fr" ? "Réseaux sociaux" : "Social media"}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                    placeholder={
                      language === "fr"
                        ? "@votrecompte ou lien"
                        : "@youraccount or link"
                    }
                    value={formData.socialMedia}
                    onChange={(e) =>
                      setFormData({ ...formData, socialMedia: e.target.value })
                    }
                  />
                </div>

                {/* Role/Function */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "fr" ? "Fonction *" : "Role *"}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:border-black transition-colors"
                    placeholder={
                      language === "fr"
                        ? "Ex: Directeur artistique, Attaché de presse..."
                        : "E.g., Art Director, Press Attaché..."
                    }
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-[0.5rem] font-medium transition-colors ${
                    isLoading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <motion.span
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {language === "fr" ? "Envoi en cours..." : "Sending..."}
                    </span>
                  ) : language === "fr" ? (
                    "Envoyer la demande"
                  ) : (
                    "Submit request"
                  )}
                </motion.button>

                <p className="text-sm text-gray-500 text-center">
                  {language === "fr"
                    ? "* Champs obligatoires"
                    : "* Required fields"}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
