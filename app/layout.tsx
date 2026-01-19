import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { LanguageProvider } from "@/lib/i18n"
import { PageViewTracker } from "@/components/page-view-tracker"
import { SiteSettingsProvider } from "@/components/site-settings-provider"
import { getSiteSettings } from "@/lib/settings"
import { SeoSchema } from "@/components/seo-schema"
import { WhatsAppButton } from "@/components/whatsapp-button"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moortinyhouse.com'),
  title: {
    default: "Moortinyhouse | Tiny House Türkiye - İstanbul & Bursa",
    template: "%s | Moortinyhouse"
  },
  description:
    "Türkiye'nin önde gelen tiny house üreticisi. İstanbul ve Bursa'da modern, sürdürülebilir ve özelleştirilebilir tiny house modelleri. Mini ev, küçük ev, mobil ev çözümleri.",
  keywords: [
    "tiny house",
    "tiny house türkiye",
    "mini ev",
    "küçük ev",
    "mobil ev",
    "prefabrik ev",
    "tiny house istanbul",
    "tiny house bursa",
    "sürdürülebilir ev",
    "ekolojik ev",
    "minimalist ev",
    "modern tiny house",
    "tiny house fiyatları",
    "tiny house modelleri",
    "moor tiny house"
  ],
  authors: [{ name: "Moortinyhouse" }],
  creator: "Moortinyhouse",
  publisher: "Moortinyhouse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: "https://moortinyhouse.com",
    siteName: "Moortinyhouse",
    title: "Moortinyhouse | Tiny House Türkiye - İstanbul & Bursa",
    description: "Türkiye'nin önde gelen tiny house üreticisi. İstanbul ve Bursa'da modern, sürdürülebilir ve özelleştirilebilir tiny house modelleri.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moortinyhouse - Tiny House Türkiye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moortinyhouse | Tiny House Türkiye",
    description: "Türkiye'nin önde gelen tiny house üreticisi. İstanbul ve Bursa'da modern tiny house modelleri.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://moortinyhouse.com",
    languages: {
      'tr-TR': 'https://moortinyhouse.com',
      'en-US': 'https://moortinyhouse.com/en',
    },
  },
  verification: {
    // Google Search Console verification code buraya eklenecek
    // google: 'verification-code-here',
  },
  category: 'Tiny House Manufacturing',
  classification: 'Business',
  generator: 'Next.js'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getSiteSettings()
  const themeStyle: React.CSSProperties = {
    ...(siteSettings.theme?.accent ? ({ ['--accent' as any]: siteSettings.theme.accent } as any) : {}),
    ...(siteSettings.theme?.accent_foreground
      ? ({ ['--accent-foreground' as any]: siteSettings.theme.accent_foreground } as any)
      : {}),
  }

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <SeoSchema settings={siteSettings} type="Organization" pageType="home" />
        <link rel="canonical" href="https://moortinyhouse.com" />
        <link rel="alternate" hrefLang="tr" href="https://moortinyhouse.com" />
        <link rel="alternate" hrefLang="en" href="https://moortinyhouse.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://moortinyhouse.com" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`} style={themeStyle}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <SiteSettingsProvider settings={siteSettings}>
            <LanguageProvider>
              <SmoothScrollProvider>
                <PageViewTracker />
                {children}
                <WhatsAppButton />
              </SmoothScrollProvider>
            </LanguageProvider>
          </SiteSettingsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
