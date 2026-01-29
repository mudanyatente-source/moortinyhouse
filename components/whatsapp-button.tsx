"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useSiteSettings } from "@/components/site-settings-provider"

export function WhatsAppButton() {
  const { company_info } = useSiteSettings()
  
  // Format phone number for WhatsApp (remove spaces, +, etc.)
  const formatPhoneForWhatsApp = (phone: string) => {
    if (!phone) return ""
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, "")
    // If starts with +90, keep it, otherwise add +90
    if (cleaned.startsWith("+90")) {
      return cleaned
    } else if (cleaned.startsWith("90")) {
      return "+" + cleaned
    } else if (cleaned.startsWith("0")) {
      return "+90" + cleaned.substring(1)
    } else {
      return "+90" + cleaned
    }
  }

  const phone = company_info?.phone || ""
  const whatsappNumber = formatPhoneForWhatsApp(phone)
  const whatsappMessage = encodeURIComponent("Merhaba, tiny house hakkında bilgi almak istiyorum.")
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${whatsappMessage}` : "#"

  // Debug: Log phone number to console (remove in production)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[WhatsApp] Phone from settings:', phone, 'Formatted:', whatsappNumber)
  }

  if (!phone || !whatsappNumber) return null

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center group transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      <span className="sr-only">WhatsApp ile iletişime geç</span>
    </motion.a>
  )
}
