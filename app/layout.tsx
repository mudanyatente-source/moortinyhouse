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
    default: "Moortinyhouse | Tiny House Türkiye - Minimalist & Sürdürülebilir Yaşam",
    template: "%s | Moortinyhouse"
  },
  description:
    "Türkiye'nin önde gelen tiny house üreticisi. Emekliler, minimalistler ve doğa severler için İstanbul ve Bursa'da özel tasarım küçük evler. Yazlık, hobi bahçesi evi, emeklilik konutu çözümleri. Ekonomik, sürdürülebilir ve özgür yaşam.",
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
    siteName: "Moortinyhouse",
    title: "Moortinyhouse | Tiny House Türkiye - Minimalist & Sürdürülebilir Yaşam",
    description: "Emekliler, minimalistler ve doğa severler için özel tasarım tiny house modelleri. İstanbul ve Bursa'da ekonomik, sürdürülebilir küçük ev çözümleri.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moortinyhouse - Tiny House Türkiye - Minimalist Yaşam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moortinyhouse | Tiny House Türkiye - Minimalist Yaşam",
    description: "Emekliler, minimalistler ve doğa severler için özel tasarım tiny house. İstanbul ve Bursa'da ekonomik küçük ev çözümleri.",
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
          href="/beautiful-modern-tiny-house-in-nature-forest-setti.webp"
          as="image"
          fetchPriority="high"
          type="image/webp"
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={true}>
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
