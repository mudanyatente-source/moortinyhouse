export type SiteSettings = {
  company_info: {
    name_tr?: string
    name_en?: string
    email?: string
    phone?: string
    address?: string
  }
  social_media: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  map: {
    embed_html?: string
  }
  seo: {
    meta_title_tr?: string
    meta_title_en?: string
    meta_description_tr?: string
    meta_description_en?: string
  }
  page_seo?: Record<
    string,
    {
      title_tr?: string
      title_en?: string
      description_tr?: string
      description_en?: string
    }
  >
  content_overrides?: Record<string, Record<string, string>>
  theme?: {
    accent?: string
    accent_foreground?: string
  }
}

export const defaultSiteSettings: SiteSettings = {
  company_info: {
    name_tr: 'Moortinyhouse',
    name_en: 'Moortinyhouse',
    email: 'hello@moortinyhouse.com',
    phone: '+1 (555) 123-4567',
    address: 'Portland, Oregon'
  },
  social_media: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    youtube: '#',
    tiktok: '#'
  },
  map: {
    embed_html: ''
  },
  seo: {
    meta_title_tr: 'Moortinyhouse | Sustainable Tiny House Living',
    meta_title_en: 'Moortinyhouse | Sustainable Tiny House Living',
    meta_description_tr: 'Discover the art of sustainable tiny house living.',
    meta_description_en: 'Discover the art of sustainable tiny house living.'
  },
  page_seo: {
    home: {
      title_tr: 'Ana Sayfa | Moortinyhouse',
      title_en: 'Home | Moortinyhouse',
      description_tr: 'Moortinyhouse ana sayfa açıklaması.',
      description_en: 'Moortinyhouse home page description.'
    },
    models: {
      title_tr: 'Modeller | Moortinyhouse',
      title_en: 'Models | Moortinyhouse',
      description_tr: 'Tiny house modelleri.',
      description_en: 'Tiny house models.'
    },
    portfolio: {
      title_tr: 'Portföy | Moortinyhouse',
      title_en: 'Portfolio | Moortinyhouse',
      description_tr: 'Tamamlanan projeler.',
      description_en: 'Completed projects.'
    },
    philosophy: {
      title_tr: 'Felsefemiz | Moortinyhouse',
      title_en: 'Philosophy | Moortinyhouse',
      description_tr: 'Marka yaklaşımı ve üretim felsefesi.',
      description_en: 'Our approach and building philosophy.'
    },
    testimonials: {
      title_tr: 'Yorumlar | Moortinyhouse',
      title_en: 'Testimonials | Moortinyhouse',
      description_tr: 'Müşteri yorumları.',
      description_en: 'Customer testimonials.'
    },
    contact: {
      title_tr: 'İletişim | Moortinyhouse',
      title_en: 'Contact | Moortinyhouse',
      description_tr: 'Bizimle iletişime geçin.',
      description_en: 'Get in touch with us.'
    }
  }
  ,
  content_overrides: {
    tr: {},
    en: {},
    ar: {}
  },
  theme: {
    accent: '',
    accent_foreground: ''
  }
}
