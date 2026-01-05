"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { AdminLogin } from "@/modules/admin/admin.module"


export default function DashboardLogin() {
  const { language } = useLanguage()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await AdminLogin({ code, email });
      
      if (!response.success) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(language === "fr" ? "Code ou email invalide" : "Invalid code or email");
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[0.5rem] shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light mb-2">
            {language === "fr" ? "Connexion Admin" : "Admin Login"}
          </h1>
          <p className="text-gray-600">
            {language === "fr" 
              ? "Veuillez entrer vos identifiants d'administration" 
              : "Please enter your admin credentials"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              {language === "fr" ? "Code d'accès" : "Access Code"}
            </label>
            <input
              id="code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full text-[#000000] px-4 py-2 border border-gray-300 rounded-[0.5rem] focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[#000000] px-4 py-2 border border-gray-300 rounded-[0.5rem] focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-[0.5rem] hover:bg-gray-800 transition-colors"
          >
            {language === "fr" ? "Se connecter" : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
