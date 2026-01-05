"use client"

import { useLanguage } from "./language-provider"

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className="flex items-center">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-sm ${
          language === "en" ? "text-black font-medium" : "text-gray-500 hover:text-black"
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-1 text-sm ${
          language === "fr" ? "text-black font-medium" : "text-gray-500 hover:text-black"
        }`}
      >
        FR
      </button>
    </div>
  )
}
