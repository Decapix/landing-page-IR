"use client"
import Image from "next/image"
import { event } from '@/libs/gtab'
import { useViewTracker } from '@/hooks/useViewTracker'
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"
const socialMedia = [
  {
    name: "tiktok",
    icon: "/tiktok.svg",
    link: "https://www.tiktok.com/@insiderunway",
  },
  {
    name: "instagram",
    icon: "/instagram.svg",
    link: "https://www.instagram.com/inside_runway/",
  },
  {
    name: "linkedin",
    icon: "/linkedin.svg",
    link: "https://www.linkedin.com/company/insiderunway/",
  }
]

export default function Footer() {

  const viewTrackerRef = useViewTracker({
    action: 'view_footer_section',
    category: 'visibility',
    label: 'Section Footer',
    delay: 1500, // au moins 1.5s visible
  })

  const timeInSectionRef = useTimeInSection({
    action: 'view_footer_section',
    category: 'time_in_section',
    label: 'Section Footer',
    threshold: 0.5, 
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  return (
    <footer ref={ref} className="bg-[#131313] text-white py-12 md:py-4 h-auto rounded-t-[30px] font-corbel">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        {/* Logo + Slogan */}
        <div className="mb-6 flex flex-col items-center mt-12">
          <Image src="/logo-compose-white.png" alt="Inside Runway Logo" priority className="mb-12" width={100} height={100} />
          <p className="mt-2 text-gray-400 text-sm text-center">
            La plateforme qui révolutionne la collaboration entre les acteurs de la mode.
          </p>
        </div>

        {/* Liens légaux */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold mb-6">
          <a href="#" className="hover:underline">Politique de confidentialité</a>
          <a href="#" className="hover:underline">CGV</a>
          <a href="#" className="hover:underline">Mentions légales</a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center gap-4 mb-6">
          {socialMedia.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.name}
              className="text-white hover:text-gray-300 text-xl"
              onClick={() => {
                event({
                  action: 'click_social_media',
                  category: 'outbound',
                  label: platform.name,
                  value: 1,
                })
              }}
            >
              <Image src={platform.icon} alt={platform.name} priority className="w-[100%] h-[100%]" width={32} height={32} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs font-corbel">© {new Date().getFullYear()} INSIDE RUNWAY</p>
      </div>
    </footer>
  )
}
