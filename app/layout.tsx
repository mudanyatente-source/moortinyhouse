import type React from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["georgia", "serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moortinyhouse.com'),
  title: {
    default: "Moor Tiny House | Doğayla İç İçe Modern Yaşam - Türkiye'nin Öncü Tiny House Üreticisi",
    template: "%s | Moor Tiny House"
  },
  description:
    "Emekliler, minimalistler ve doğa severler için Türkiye'nin en iyi tiny house çözümleri. Modern tasarım, ekonomik fiyat, sürdürülebilir yaşam. İstanbul & Bursa'da ücretsiz danışmanlık. Yazlık, hobi bahçesi evi, emeklilik konutu modelleri.",
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
    "moor tiny house",
    "emekli evi",
    "emeklilik konutu",
    "yazlık tiny house",
    "tatil evi",
    "hobi bahçesi evi",
    "bahçe evi",
    "doğada yaşam",
    "off-grid ev",
    "ekonomik ev",
    "uygun fiyatlı ev",
    "ikinci ev",
    "hafta sonu evi",
    "dağ evi",
    "orman evi",
    "minimalist yaşam",
    "basit yaşam",
    "finansal özgürlük",
    "küçük ev fiyatları",
    "mini ev modelleri",
    "taşınabilir ev",
    "konteyner ev alternatifi"
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
    siteName: "Moor Tiny House",
    title: "Moor Tiny House | Doğayla İç İçe Modern Yaşam - Türkiye'nin Öncü Tiny House Üreticisi",
    description: "Emekliler ve minimalistler için modern tiny house modelleri. Ekonomik, sürdürülebilir ve şık tasarım. İstanbul & Bursa'da ücretsiz keşif ve danışmanlık.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moor Tiny House - Modern Tiny House Çözümleri",
        type: "image/jpeg",
      },
      {
        url: "/beautiful-modern-tiny-house-in-nature-forest-setti.webp",
        width: 1200,
        height: 630,
        alt: "Doğada Modern Tiny House",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moor Tiny House | Modern & Ekonomik Yaşam",
    description: "Doğayla uyumlu, minimalist tiny house çözümleri. İstanbul & Bursa'da hizmet.",
    images: ["/og-image.jpg", "/beautiful-modern-tiny-house-in-nature-forest-setti.webp"],
    creator: "@moortinyhouse",
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

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache pages for 1 hour on Vercel

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
        
        {/* Performance & SEO Optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical Images Preload */}
        <link
          rel="preload"
          href="/orion/orion.webp"
          as="image"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/baverly/dış/tinhouse-1.jpeg"
          as="image"
          fetchPriority="high"
          type="image/jpeg"
        />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=yes" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`} style={themeStyle}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          storageKey="moortinyhouse-theme"
        >
          <SiteSettingsProvider settings={siteSettings}>
            <LanguageProvider>
               <SmoothScrollProvider>
                <PageViewTracker />
                {children}
                <SpeedInsights />
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
