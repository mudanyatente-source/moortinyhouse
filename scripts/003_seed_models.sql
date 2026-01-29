-- Seed initial models from the hardcoded data
-- This script will insert the 6 models that are currently hardcoded in the app

INSERT INTO public.models (
  slug, 
  name_tr, 
  name_en, 
  tagline_tr, 
  tagline_en, 
  description_tr, 
  description_en, 
  size_sqm, 
  bedrooms, 
  bathrooms, 
  main_image, 
  features_tr, 
  features_en, 
  is_popular, 
  is_visible, 
  display_order,
  seo_title_tr,
  seo_title_en,
  seo_description_tr,
  seo_description_en
) VALUES
-- Aura Model
(
  'aura',
  'Aura',
  'Aura',
  'Nihai Deneyim',
  'The Ultimate Experience',
  'Lüksü sürdürülebilirlikle birleştiren amiral gemisi modelimiz. Rafine minik yaşam arayan çiftler için mükemmel.',
  'Our flagship model combining luxury with sustainability. Perfect for couples seeking refined tiny living.',
  30, -- 320 sqft ≈ 30 m²
  1,
  1,
  '/luxury-modern-tiny-house-exterior-wood-siding-larg.jpg',
  '["Akıllı Ev Hazır", "Premium Yalıtım", "Yerden Isıtma", "Teras"]'::jsonb,
  '["Smart Home Ready", "Premium Insulation", "Heated Floors", "Sky Lounge"]'::jsonb,
  true,
  false, -- Gizli yap
  1,
  'Aura - Tiny House Modelleri | Moortinyhouse',
  'Aura - Tiny House Models | Moortinyhouse',
  'Aura hakkında detaylı bilgi. Lüksü sürdürülebilirlikle birleştiren amiral gemisi modelimiz. Rafine minik yaşam arayan çiftler için mükemmel.',
  'Learn more about Aura. Our flagship model combining luxury with sustainability. Perfect for couples seeking refined tiny living.'
),
-- Nova Model
(
  'nova',
  'Nova',
  'Nova',
  'Aile Uyumu',
  'Family Harmony',
  'Küçük aileler için özenle tasarlandı. Çoklu bölgeler bağlantıyı korurken mahremiyeti sağlar.',
  'Thoughtfully designed for small families. Multiple zones ensure privacy while maintaining connection.',
  42, -- 450 sqft ≈ 42 m²
  2,
  1,
  '/modern-tiny-house-family-home-exterior-porch-garde.jpg',
  '["Çatı Katı Yatak Odası", "Tam Mutfak", "Depolama Çözümleri", "Açık Teras"]'::jsonb,
  '["Loft Bedroom", "Full Kitchen", "Storage Solutions", "Outdoor Deck"]'::jsonb,
  true,
  false, -- Gizli yap
  2,
  'Nova - Tiny House Modelleri | Moortinyhouse',
  'Nova - Tiny House Models | Moortinyhouse',
  'Nova hakkında detaylı bilgi. Küçük aileler için özenle tasarlandı. Çoklu bölgeler bağlantıyı korurken mahremiyeti sağlar.',
  'Learn more about Nova. Thoughtfully designed for small families. Multiple zones ensure privacy while maintaining connection.'
),
-- Zen Model
(
  'zen',
  'Zen',
  'Zen',
  'Minimalist İnziva',
  'Minimalist Retreat',
  'Saf sadelik olağanüstü tasarımla buluşuyor. Solo maceracılar ve hafta sonu kaçamakları için ideal.',
  'Pure simplicity meets exceptional design. Ideal for solo adventurers and weekend getaways.',
  20, -- 220 sqft ≈ 20 m²
  1,
  1,
  '/minimalist-tiny-house-japanese-inspired-exterior-p.jpg',
  '["Meditasyon Alanı", "Doğal Malzemeler", "Çatı Pencereleri", "Kompakt Mutfak"]'::jsonb,
  '["Meditation Space", "Natural Materials", "Skylights", "Compact Kitchen"]'::jsonb,
  false,
  false, -- Gizli yap
  3,
  'Zen - Tiny House Modelleri | Moortinyhouse',
  'Zen - Tiny House Models | Moortinyhouse',
  'Zen hakkında detaylı bilgi. Saf sadelik olağanüstü tasarımla buluşuyor. Solo maceracılar ve hafta sonu kaçamakları için ideal.',
  'Learn more about Zen. Pure simplicity meets exceptional design. Ideal for solo adventurers and weekend getaways.'
),
-- Horizon Model
(
  'horizon',
  'Horizon',
  'Horizon',
  'Macera Bekliyor',
  'Adventure Awaits',
  'Yol için yapıldı. Bu mobil şaheserle evinizi kalbinizin götürdüğü her yere götürün.',
  'Built for the road. Take your home wherever your heart leads with this mobile masterpiece.',
  26, -- 280 sqft ≈ 26 m²
  1,
  1,
  '/mobile-tiny-house-on-wheels-adventure-travel-mount.jpg',
  '["Yol Yasal", "Şebekeden Bağımsız", "Kompakt Tasarım", "Dayanıklı Yapı"]'::jsonb,
  '["Road Legal", "Off-Grid Ready", "Compact Design", "Durable Build"]'::jsonb,
  false,
  false, -- Gizli yap
  4,
  'Horizon - Tiny House Modelleri | Moortinyhouse',
  'Horizon - Tiny House Models | Moortinyhouse',
  'Horizon hakkında detaylı bilgi. Yol için yapıldı. Bu mobil şaheserle evinizi kalbinizin götürdüğü her yere götürün.',
  'Learn more about Horizon. Built for the road. Take your home wherever your heart leads with this mobile masterpiece.'
),
-- Terra Model
(
  'terra',
  'Terra',
  'Terra',
  'Toprakla Bütünleşik Yaşam',
  'Grounded Living',
  'Doğayla bir olmak için tasarlandı. Çevre bilincine sahip olanlar için toprakla bütünleşik mimari.',
  'Designed to become one with nature. Earth-integrated architecture for the eco-conscious.',
  35, -- 380 sqft ≈ 35 m²
  2,
  1,
  '/terra-tiny-house-green-roof-eco.jpg',
  '["Yeşil Çatı", "Toprak Duvarlar", "Pasif Güneş", "Su Geri Dönüşümü"]'::jsonb,
  '["Green Roof", "Earth Walls", "Passive Solar", "Water Recycling"]'::jsonb,
  false,
  false, -- Gizli yap
  5,
  'Terra - Tiny House Modelleri | Moortinyhouse',
  'Terra - Tiny House Models | Moortinyhouse',
  'Terra hakkında detaylı bilgi. Doğayla bir olmak için tasarlandı. Çevre bilincine sahip olanlar için toprakla bütünleşik mimari.',
  'Learn more about Terra. Designed to become one with nature. Earth-integrated architecture for the eco-conscious.'
),
-- Lux Model
(
  'lux',
  'Lux',
  'Lux',
  'Yükseltilmiş Yaşam',
  'Elevated Living',
  'Taviz yok. Tam boyutlu bir evin tüm lükslerine sahip premium modelimiz.',
  'No compromises. Our premium model with all the luxuries of a full-sized home.',
  46, -- 500 sqft ≈ 46 m²
  2,
  2,
  '/luxury-premium-tiny-house-modern-architecture-high.jpg',
  '["Çift Banyo", "Ev Ofisi", "Şarap Deposu", "Her Şey Akıllı"]'::jsonb,
  '["Double Bathroom", "Home Office", "Wine Storage", "Smart Everything"]'::jsonb,
  true,
  false, -- Gizli yap
  6,
  'Lux - Tiny House Modelleri | Moortinyhouse',
  'Lux - Tiny House Models | Moortinyhouse',
  'Lux hakkında detaylı bilgi. Taviz yok. Tam boyutlu bir evin tüm lükslerine sahip premium modelimiz.',
  'Learn more about Lux. No compromises. Our premium model with all the luxuries of a full-sized home.'
)
ON CONFLICT (slug) DO NOTHING;
