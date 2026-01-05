import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { LanguageProvider } from "../components/language-provider"
import { GA_TRACKING_ID } from "@/libs/gtab"
import Analytics from "@/components/analytics"
import { Urbanist } from 'next/font/google'
import "./globals.css"



// Configuration de la police Urbanist via next/font
const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Inside Runway",
  description: "Connect stylist @ brands to make press requests easy",
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
    
      <body className={urbanist.variable}>
         {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <Analytics />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
