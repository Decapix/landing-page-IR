"use client"

import { useLanguage } from "../language-provider"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Building2, ArrowDown } from "lucide-react"
import { useState } from "react"
import { useViewTracker } from '@/hooks/useViewTracker'
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"



export default function AboutSection() {
  const { language } = useLanguage();
  const [, setMobileMenuOpen] = useState(false)

  const viewTrackerRef = useViewTracker({
    action: 'view_about_section',
    category: 'visibility',
    label: 'Section About',
    delay: 1500, // au moins 1.5s visible
  });

  const timeInSectionRef = useTimeInSection({
    action: 'view_about_section',
    category: 'time_in_section',
    label: 'Section About',
    threshold: 0.5,
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={ref} id="about" className="py-32 bg-[#faf8f6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with overlapping cards */}
          <div className="relative">
            <motion.div
              className="overflow-hidden items flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-[24rem] rounded-2xl overflow-hidden">
                <Image src="/about.jpg" alt="Fashion model on runway" className="h-[100%] w-[100%]" width={100} height={100} />
              </div>

              {/* Stylist card */}
              <motion.div
                className="absolute top-[10.5rem] -left-3 bg-white rounded-[0.5rem] shadow-lg p-1 max-w-[300px] "
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 py-2">
                  <div className="bg-black rounded-full p-4 w-auto">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000000] text-sm mb-1">{language === "fr" ? "Styliste" : "Stylist"}</h3>
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Trouvez, réservez et suivez vos demandes presse en toute simplicité."
                        : "Find, reserve and track your press requests with ease."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Brand/Press Office card */}
              <motion.div
                className="absolute bottom-16 -right-4 bg-white rounded-[0.5rem] shadow-lg p-1 max-w-[380px]  "
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center space-x-2 py-2">
                  <div className="bg-black rounded-full p-4 w-auto">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000000] text-sm mb-1">
                      {language === "fr" ? "Marque / Bureau de presse" : "Brand / Press Office"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Donnez de la visibilité à vos collections et gérez vos prêts de samples avec efficacité."
                        : "Give visibility to your collections and manage your sample loans efficiently."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Text content */}
          <div>
            <motion.div
              className="space-y-6 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9 }}
            >
              <h2 className="uppercase tracking-wider text-xs text-[#000]">{language === "fr" ? "À propos" : "About"}</h2>

              <h3 className="text-[2.5rem] leading-tight text-[#000]">
                {language === "fr" ? (
                  <div>
                    La plateforme qui <span className="font-blisstwin italic text-[2.7rem]">révolutionne</span>
                    <br />
                    la <span className="font-blisstwin italic text-[2.7rem]">collaboration</span> entre les
                    <br />
                    acteurs de la <span className="font-blisstwin italic text-[2.7rem]">mode</span>.
                  </div>
                ) : (
                  <div>
                    The platform that <span className="italic font-blisstwin text-[2.7rem]">revolutionizes</span>
                    <br />
                    <span className="font-blisstwin italic text-[2.7rem]">collaboration</span> between
                    <br />
                    <span className="font-blisstwin italic text-[2.7rem]">fashion</span> actors.
                  </div>
                )}
              </h3>

              <p className="text-[#000]">
                {language === "fr"
                  ? "Inside Runway est la première plateforme conçue pour révolutionner le travail des stylistes et des attachés de presse et simplifier le processus des demandes presse."
                  : "Inside Runway is the first platform designed to revolutionize the work of stylists and press attachés and simplify the press request process."}
              </p>

              <p className="text-gray-800">
                {language === "fr" ? (
                  <>
                    Accès aux collections, création des moodboards et des looks, gestion des prêts et tracking de
                    samples. Inside Runway <span className="font-medium">simplifie</span>,{" "}
                    <span className="font-medium">centralise</span> et <span className="font-medium">fluidifie</span>{" "}
                    chaque interaction entre les stylistes, marques et bureaux de presse.
                  </>
                ) : (
                  <>
                    Access to collections, creation of moodboards and looks, loan management and sample tracking. Inside
                    Runway <span className="font-medium text-black">simplifies</span>,{" "}
                    <span className="font-medium text-black">centralizes</span> and{" "}
                    <span className="font-medium text-black">streamlines</span> every interaction between stylists, brands and
                    press offices.
                  </>
                )}
              </p>

              <div>
                <button onClick={() => scrollToSection("contact")} className="mt-4 bg-black text-white px-6 py-3 rounded-[0.5rem] hover:bg-gray-800 transition-colors flex items-center font-corbel">
                  {language === "fr" ? "Prenez part à la révolution" : "Take part in the revolution"}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
