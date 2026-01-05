"use client"
import { useViewTracker } from "@/hooks/useViewTracker"
import { useLanguage } from "../language-provider"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTimeInSection } from "@/hooks/useTimeInSection"
import { mergeRefs } from "@/hooks/mergeRefs"


export default function FeaturesSection() {
  const { language } = useLanguage()

  const viewTrackerRef = useViewTracker({
    action: 'view_features_section',
    category: 'visibility',
    label: 'Section Features',
    delay: 1500, // au moins 1.5s visible
  })

  const timeInSectionRef = useTimeInSection({
    action: 'view_features_section',
    category: 'time_in_section',
    label: 'Section Features',
    threshold: 0.5,
    minDuration: 1500,
  });

  const ref = mergeRefs(viewTrackerRef, timeInSectionRef);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={ref} id="features" className="py-20 bg-[#131313] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section title */}
        <div className="text-center">
          <h2 className="uppercase text-xs mb-6">
            {language === "fr" ? "Notre produit" : "Our product"}
          </h2>
        </div>
        <motion.h2
          className="text-3xl md:text-4xl text-center mb-16 max-w-2xl mx-auto text-[#ececec] font-thin"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {language === "fr" ? (
            <>
              Pourquoi Inside Runway est la <span className="font-blisstwin italic"> solution</span>
              <br />
              que la mode attendait ?
            </>
          ) : (
            <>
              Why Inside Runway is the <span className="font-blisstwin italic">solution</span>
              <br />
              fashion was waiting for ?
            </>
          )}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6 w-4/8 mx-auto font-corbel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Feature 01 - Full width */}
          <motion.div className="bg-white text-black rounded-[0.5rem] overflow-hidden" variants={itemVariants}>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden relative">
                  <Image src="/moodbaord-main.png" alt="Moodboard interface" className="w-[100%] h-[100%]" width={100} height={100} />
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="text-xl mb-2">
                    {language === "fr" ? (
                      <>
                        <div className="grid grid-cols-[auto_1fr] items-center">
                          <div className="text-5xl font-light hidden md:block">01.</div>
                          <div className="text-3xl p-4">
                            <span className="">Moodboards et Collections:</span><br />
                            <span className="font-blisstwin italic">Inspirez-vous, mixez, demandez.</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-[auto_1fr] items-center">
                          <div className="text-5xl font-light hidden md:block">01.</div>
                          <div className="text-3xl p-4">
                            <span className="">Moodboards and Collections:</span><br />
                            <span className="font-blisstwin italic">Get inspired, mix, request.</span>
                          </div>
                        </div>
                      </>
                    )}
                  </h3>

                  <div className="flex items-start space-x-4 mt-6">
                    <div className="text-md text-gray-900">
                      {language === "fr" ? (
                        <div className="">
                          Pour réaliser leurs projets, les stylistes doivent rechercher des marques pour dénicher des pièces et contacter les attachés de presse.
                          Inside Runway centralise tout sur une seule interface
                        </div>
                      ) : (
                        <div className="">
                          To complete their projects, stylists must research brands to find pieces and contact PRs.
                          Inside Runway centralizes everything in a single interface.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-black" />
                      <p className="text-sm text-gray-600">
                        {language === "fr"
                          ? "Créez des moodboards interactifs pour préparer vos shootings et propositions de looks."
                          : "Create interactive mood boards to prepare your photoshoots and look suggestions."}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-black" />
                      <p className="text-sm text-gray-600">
                        {language === "fr"
                          ? "Accédez aux collections de vos marques favorites et découvrez-en de nouvelles, sans perdre de temps."
                          : "Access collections from your favorite brands and discover new ones, without wasting time."}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-black" />
                      <p className="text-sm text-gray-600">
                        {language === "fr"
                          ? "Ciblez précisément les pièces dont vous avez besoin grâce à des filtres pour une recherche avancée."
                          : "Target the samples you need precisely using filters for advanced search."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two-column grid for the remaining features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 02 */}
            <motion.div className="bg-white text-black rounded-[0.5rem] overflow-hidden" variants={itemVariants}>
              <div className="p-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden relative mb-4">
                  <div className="w-full h-full relative">
                    <Image src="/moodboard.svg" alt="Collaboration interface" priority className="w-[100%] h-[100%]" width={100} height={100} />
                  </div>
                </div>

                <h3 className="text-xl mb-4">
                  {language === "fr" ? (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">02.</div>
                        <div className="text-3xl p-4">
                          <span className="">Une gestion <span className="font-blisstwin italic">collaborative</span> avec vos assistants.</span><br />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">02.</div>
                        <div className="text-3xl p-4">
                          <span className="">Collaborative management with your <span className="font-blisstwin italic">assistants</span>.</span><br />
                        </div>
                      </div>
                    </>
                  )}
                </h3>

                <div className="flex items-start space-x-4 mt-6">
                  <div className="text-md text-gray-900">
                    {language === "fr" ? (
                      <div className="">
                        Le stylisme est un travail d'équipe. Inside Runway permet aux stylistes de collaborer efficacement avec leurs assistants.
                      </div>
                    ) : (
                      <div className="">
                        Styling is a team effort. Inside Runway allows stylists to collaborate effectively with their assistants.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Collaborez avec vos équipes sur des projets communs."
                        : "Collaborate with your teams on joint projects."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Attribuer des tâches et partager l'avancée des demandes."
                        : "Assign tasks and share progress on requests."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Assurer un suivi clair et en temps réel, sans perte d’information."
                        : "Ensure clear, real-time monitoring without loss of information."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 03 */}
            <motion.div className="bg-white text-black rounded-[0.5rem] overflow-hidden" variants={itemVariants}>
              <div className="p-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden relative mb-4">
                  <Image src="/suivi.svg" alt="Tracking interface" priority className="w-[100%] h-[100%]" width={100} height={100} />
                </div>

                <h3 className="text-xl mb-4">
                  {language === "fr" ? (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">03.</div>
                        <div className="text-3xl p-4">
                          <span className=""><span className="font-blisstwin italic">Suivi</span> en temps réel et <span className="font-blisstwin italic">tracking</span> des pièces prêtées</span><br />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">03.</div>
                        <div className="text-3xl p-4">
                          <span className=""><span className="font-blisstwin italic">Real-time </span>  monitoring and <span className="font-blisstwin italic">tracking</span> of borrowed samples.</span><br />
                        </div>
                      </div>
                    </>
                  )}
                </h3>

                <div className="flex items-start space-x-4 mt-6">
                  <div className="text-md text-gray-900">
                    {language === "fr" ? (
                      <div className="">
                        Disposez d’un tableau de bord complet pour un suivi optimal.
                      </div>
                    ) : (
                      <div className="">
                        Have a complete dashboard for optimal monitoring.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Visualisez l’avancée de vos demandes presse en temps réel."
                        : "Visualize the progress of your press requests in real time."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Recevez des notifications sur la réception et le renvoi de vos prêts."
                        : "Receive notifications on the receipt and return of your loans."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Faites le tracking des pièces prêtées pour ne jamais perdre une référence."
                        : "Make tracking of pieces loaned to never lose a reference."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 04-A */}
            <motion.div className="bg-white text-black rounded-[0.5rem] overflow-hidden" variants={itemVariants}>
              <div className="p-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden relative mb-4">
                  <Image src="/calendrier.svg" alt="Organization interface" priority className="w-[100%] h-[100%]" width={100} height={100} />
                </div>

                <h3 className="text-xl mb-2">
                  {language === "fr" ? (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">04.</div>
                        <div className="text-3xl p-4">
                          <span className="">Une organisation optimisée pour <span className="font-blisstwin italic">showroom</span> et <span className="font-blisstwin italic">événements</span></span><br />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">04.</div>
                        <div className="text-3xl p-4">
                          <span className="">Optimized organization to <span className="font-blisstwin italic">energize</span> your <span className="font-blisstwin italic">events</span></span><br />
                        </div>
                      </div>
                    </>
                  )}
                </h3>
                <div className="flex items-start space-x-4 mt-6">
                  <div className="text-md text-gray-900">
                    {language === "fr" ? (
                      <div className="">
                        Inside Runway intègre un calendrier intelligent pour :.
                      </div>
                    ) : (
                      <div className="">
                        Inside Runway integrates an intelligent calendar for:
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Prenez rendez-vous avec les marques en showroom directement depuis la plateforme."
                        : "Book appointments with brands in showroom directly from the platform."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Recevez des invitations aux événements exclusifs proposés par les marques et bureaux de presse."
                        : "Receive invitations to exclusive events proposed by brands and press offices."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 04-B */}
            <motion.div className="bg-white text-black rounded-[0.5rem] overflow-hidden" variants={itemVariants}>
              <div className="p-6">
                <div className="w-full rounded-lg overflow-hidden relative flex justify-center">
                  <Image src="/ecosysteme.svg" alt="Ecosystem interface" priority width={392} height={100} />
                </div>

                <h3 className="text-xl mb-2">
                  {language === "fr" ? (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">05.</div>
                        <div className="text-3xl p-4">
                          <span className="">Un <span className="font-blisstwin italic">écosystème</span> dédié au développement de votre activité</span><br />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-[auto_1fr] items-center">
                        <div className="text-5xl font-light hidden md:block">05.</div>
                        <div className="text-3xl p-4">
                          <span className="">An <span className="font-blisstwin italic">ecosystem</span> dedicated to developing your business</span><br />
                        </div>
                      </div>
                    </>
                  )}
                </h3>

                <div className="flex items-start space-x-4 mt-6">
                  <div className="text-md text-gray-900">
                    {language === "fr" ? (
                      <div className="">
                        Inside Runway est un véritable écosystème pour développer son réseau professionnel,
                        favoriser les collaborations et créer des synergies entre créatifs.
                      </div>
                    ) : (
                      <div className="">
                        Inside Runway is a true ecosystem to develop your professional network,
                        favorize collaborations and create synergies between creatives.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Mettez en lumière votre créativité en partageant vos réalisations sur votre page de profil"
                        : "Highlight your creativity by sharing your creations on your profile page"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-black" />
                    <p className="text-sm text-gray-600">
                      {language === "fr"
                        ? "Échangez instantanément et multipliez les collaborations."
                        : "Exchange instantly and multiply collaborations."}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
