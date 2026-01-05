"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "../dictionaries/en"
import { fr } from "../dictionaries/fr"

type Language = "en" | "fr"
type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const dictionaries = {
    en,
    fr,
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        dictionary: dictionaries[language],
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
