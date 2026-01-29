"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSiteSettings } from "@/components/site-settings-provider"

export type Language = "en" | "tr" | "ar"

type Translations = {
  [key: string]: {
    en: string
    tr: string
    ar: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", tr: "Ana Sayfa", ar: "الرئيسية" },
  "nav.models": { en: "Models", tr: "Modeller", ar: "النماذج" },
  "nav.philosophy": { en: "Philosophy", tr: "Felsefe", ar: "الفلسفة" },
  "nav.portfolio": { en: "Portfolio", tr: "Portföy", ar: "معرض الأعمال" },
  "nav.stories": { en: "Stories", tr: "Hikayeler", ar: "القصص" },
  "nav.contact": { en: "Contact", tr: "İletişim", ar: "اتصل بنا" },
  "nav.bookTour": { en: "Book a Tour", tr: "Tur Rezervasyonu", ar: "احجز جولة" },
  "nav.admin": { en: "Admin", tr: "Admin", ar: "الإدارة" },

  // Hero Section
  "hero.badge": {
    en: "Sustainable Living Redefined",
    tr: "Sürdürülebilir Yaşam Yeniden Tanımlandı",
    ar: "إعادة تعريف الحياة المستدامة",
  },
  "hero.title1": { en: "Live Small,", tr: "Küçük Yaşa,", ar: "عش صغيرًا،" },
  "hero.title2": { en: "Dream Big", tr: "Büyük Hayal Kur", ar: "احلم كبيرًا" },
  "hero.subtitle": {
    en: "Discover the art of sustainable tiny house living. Handcrafted homes designed for modern minimalists seeking freedom and exceptional craftsmanship.",
    tr: "Sürdürülebilir minik ev yaşamının sanatını keşfedin. Özgürlük ve olağanüstü işçilik arayan modern minimalistler için el yapımı evler.",
    ar: "اكتشف فن العيش في المنازل الصغيرة المستدامة. منازل مصنوعة يدويًا مصممة للحداثيين الباحثين عن الحرية والحرفية الاستثنائية.",
  },
  "hero.explore": { en: "Explore Models", tr: "Modelleri Keşfet", ar: "استكشف النماذج" },
  "hero.watchStory": { en: "Watch Story", tr: "Hikayeyi İzle", ar: "شاهد القصة" },
  "hero.scroll": { en: "Scroll", tr: "Kaydır", ar: "مرر" },

  // Stats
  "stats.homesDelivered": { en: "Homes Delivered", tr: "Teslim Edilen Ev", ar: "منازل تم تسليمها" },
  "stats.uniqueModels": { en: "Unique Models", tr: "Özgün Model", ar: "نماذج فريدة" },
  "stats.happyClients": { en: "Happy Clients", tr: "Mutlu Müşteri", ar: "عملاء سعداء" },
  "stats.yearsExperience": { en: "Years Experience", tr: "Yıllık Deneyim", ar: "سنوات الخبرة" },
  "stats.happyFamilies": { en: "Happy Families", tr: "Mutlu Aile", ar: "عائلات سعيدة" },
  "stats.treesPlanted": { en: "Trees Planted", tr: "Dikilen Ağaç", ar: "أشجار مزروعة" },
  "stats.designAwards": { en: "Design Awards", tr: "Tasarım Ödülü", ar: "جوائز التصميم" },
  "stats.wasteRecycled": { en: "Waste Recycled", tr: "Geri Dönüştürülen Atık", ar: "نفايات معاد تدويرها" },

  // Featured Models
  "featured.badge": { en: "Our Collection", tr: "Koleksiyonumuz", ar: "مجموعتنا" },
  "featured.title1": { en: "Discover Your", tr: "Mükemmel Evinizi", ar: "اكتشف" },
  "featured.title2": { en: "Perfect Home", tr: "Keşfedin", ar: "منزلك المثالي" },
  "featured.viewAll": { en: "View All Models", tr: "Tüm Modelleri Gör", ar: "عرض جميع النماذج" },
  "featured.sqft": { en: "sqft", tr: "m²", ar: "قدم مربع" },

  // Model names and descriptions
  "model.aura.name": { en: "Aura", tr: "Aura", ar: "أورا" },
  "model.aura.tagline": { en: "The Ultimate Experience", tr: "Nihai Deneyim", ar: "التجربة المثالية" },
  "model.aura.description": {
    en: "Our flagship model combining luxury with sustainability. Perfect for couples seeking refined tiny living.",
    tr: "Lüksü sürdürülebilirlikle birleştiren amiral gemisi modelimiz. Rafine minik yaşam arayan çiftler için mükemmel.",
    ar: "نموذجنا الرائد الذي يجمع بين الفخامة والاستدامة. مثالي للأزواج الباحثين عن حياة صغيرة راقية.",
  },
  "model.nova.name": { en: "Nova", tr: "Nova", ar: "نوفا" },
  "model.nova.tagline": { en: "Family Harmony", tr: "Aile Uyumu", ar: "تناغم عائلي" },
  "model.nova.description": {
    en: "Thoughtfully designed for small families. Multiple zones ensure privacy while maintaining connection.",
    tr: "Küçük aileler için özenle tasarlandı. Çoklu bölgeler bağlantıyı korurken mahremiyeti sağlar.",
    ar: "مصمم بعناية للعائلات الصغيرة. مناطق متعددة تضمن الخصوصية مع الحفاظ على الاتصال.",
  },
  "model.zen.name": { en: "Zen", tr: "Zen", ar: "زن" },
  "model.zen.tagline": { en: "Minimalist Retreat", tr: "Minimalist İnziva", ar: "ملاذ بسيط" },
  "model.zen.description": {
    en: "Pure simplicity meets exceptional design. Ideal for solo adventurers and weekend getaways.",
    tr: "Saf sadelik olağanüstü tasarımla buluşuyor. Solo maceracılar ve hafta sonu kaçamakları için ideal.",
    ar: "البساطة النقية تلتقي بالتصميم الاستثنائي. مثالي للمغامرين المنفردين وعطلات نهاية الأسبوع.",
  },
  "model.horizon.name": { en: "Horizon", tr: "Horizon", ar: "هورايزن" },
  "model.horizon.tagline": { en: "Adventure Awaits", tr: "Macera Bekliyor", ar: "المغامرة في انتظارك" },
  "model.horizon.description": {
    en: "Built for the road. Take your home wherever your heart leads with this mobile masterpiece.",
    tr: "Yol için yapıldı. Bu mobil şaheserle evinizi kalbinizin götürdüğü her yere götürün.",
    ar: "صُنع للطريق. خذ منزلك أينما يقودك قلبك مع هذه التحفة المتنقلة.",
  },
  "model.terra.name": { en: "Terra", tr: "Terra", ar: "تيرا" },
  "model.terra.tagline": { en: "Grounded Living", tr: "Toprakla Bütünleşik Yaşam", ar: "حياة مترسخة" },
  "model.terra.description": {
    en: "Designed to become one with nature. Earth-integrated architecture for the eco-conscious.",
    tr: "Doğayla bir olmak için tasarlandı. Çevre bilincine sahip olanlar için toprakla bütünleşik mimari.",
    ar: "مصمم ليصبح واحدًا مع الطبيعة. هندسة معمارية متكاملة مع الأرض للواعين بيئيًا.",
  },
  "model.lux.name": { en: "Lux", tr: "Lux", ar: "لوكس" },
  "model.lux.tagline": { en: "Elevated Living", tr: "Yükseltilmiş Yaşam", ar: "حياة راقية" },
  "model.lux.description": {
    en: "No compromises. Our premium model with all the luxuries of a full-sized home.",
    tr: "Taviz yok. Tam boyutlu bir evin tüm lükslerine sahip premium modelimiz.",
    ar: "بدون تنازلات. نموذجنا الفاخر مع جميع رفاهيات المنزل كامل الحجم.",
  },

  // Orion Model
  "model.orion.name": { en: "Orion", tr: "Orion", ar: "أوريون" },
  "model.orion.tagline": { en: "Single Loft Compact Living", tr: "Tek Loftlu Kompakt Yaşam", ar: "معيشة مدمجة بعلية واحدة" },
  "model.orion.description": {
    en: "The Orion model is a compact tiny house design measuring 8-9 meters in length and 2.5 meters in width. With its single loft structure, it provides maximum space utilization. Its modern and minimal design offers a portable living space suitable for city life.",
    tr: "Orion modeli, 8-9 metre uzunluğunda ve 2.5 metre genişliğinde kompakt bir tiny house tasarımıdır. Tek loft yapısı ile maksimum alan kullanımı sağlar. Modern ve minimal tasarımı ile şehir hayatına uygun, taşınabilir bir yaşam alanı sunar.",
    ar: "نموذج أوريون هو تصميم منزل صغير مدمج يبلغ طوله 8-9 أمتار وعرضه 2.5 متر. مع هيكل العلية الواحدة، يوفر أقصى استفادة من المساحة. تصميمه الحديث والبسيط يوفر مساحة معيشة محمولة مناسبة للحياة الحضرية.",
  },
  
  // Beverly Model
  "model.beverly.name": { en: "Beverly", tr: "Beverly", ar: "بيفرلي" },
  "model.beverly.tagline": { en: "Spacious Living Space for Families", tr: "Aile İçin Geniş Yaşam Alanı", ar: "مساحة معيشة واسعة للعائلات" },
  "model.beverly.description": {
    en: "The Beverly model is a spacious tiny house design with a 3+1 room layout. Despite being 2.5 meters wide, it offers a comfortable living space for families thanks to its smart design. Ideal for families with children, this model provides a well-thought-out living experience.",
    tr: "Beverly modeli, 3+1 oda düzenine sahip geniş bir tiny house tasarımıdır. 2.5 metre genişliğinde olmasına rağmen, akıllı tasarım sayesinde aileler için rahat bir yaşam alanı sunar. Çocuklu aileler için ideal olan bu model, her detayı düşünülmüş bir yaşam deneyimi sağlar.",
    ar: "نموذج بيفرلي هو تصميم منزل صغير واسع بتخطيط 3+1 غرف. على الرغم من عرضه 2.5 متر، إلا أنه يوفر مساحة معيشة مريحة للعائلات بفضل تصميمه الذكي. مثالي للعائلات التي لديها أطفال، يوفر هذا النموذج تجربة معيشة مدروسة جيداً.",
  },

  // Model features
  "feature.smartHome": { en: "Smart Home Ready", tr: "Akıllı Ev Hazır", ar: "جاهز للمنزل الذكي" },
  "feature.premiumInsulation": { en: "Premium Insulation", tr: "Premium Yalıtım", ar: "عزل ممتاز" },
  "feature.heatedFloors": { en: "Heated Floors", tr: "Yerden Isıtma", ar: "أرضيات مُدفأة" },
  "feature.skyLounge": { en: "Sky Lounge", tr: "Teras", ar: "صالة السماء" },
  "feature.loftBedroom": { en: "Loft Bedroom", tr: "Çatı Katı Yatak Odası", ar: "غرفة نوم علوية" },
  "feature.fullKitchen": { en: "Full Kitchen", tr: "Tam Mutfak", ar: "مطبخ كامل" },
  "feature.storageSolutions": { en: "Storage Solutions", tr: "Depolama Çözümleri", ar: "حلول التخزين" },
  "feature.outdoorDeck": { en: "Outdoor Deck", tr: "Açık Teras", ar: "سطح خارجي" },
  "feature.meditationSpace": { en: "Meditation Space", tr: "Meditasyon Alanı", ar: "مساحة تأمل" },
  "feature.naturalMaterials": { en: "Natural Materials", tr: "Doğal Malzemeler", ar: "مواد طبيعية" },
  "feature.skylights": { en: "Skylights", tr: "Çatı Pencereleri", ar: "المناور" },
  "feature.compactKitchen": { en: "Compact Kitchen", tr: "Kompakt Mutfak", ar: "مطبخ مدمج" },
  "feature.roadLegal": { en: "Road Legal", tr: "Yol Yasal", ar: "قانوني للطريق" },
  "feature.offGridReady": { en: "Off-Grid Ready", tr: "Şebekeden Bağımsız", ar: "جاهز للعمل خارج الشبكة" },
  "feature.compactDesign": { en: "Compact Design", tr: "Kompakt Tasarım", ar: "تصميم مدمج" },
  "feature.durableBuild": { en: "Durable Build", tr: "Dayanıklı Yapı", ar: "بناء متين" },
  "feature.greenRoof": { en: "Green Roof", tr: "Yeşil Çatı", ar: "سقف أخضر" },
  "feature.earthWalls": { en: "Earth Walls", tr: "Toprak Duvarlar", ar: "جدران ترابية" },
  "feature.passiveSolar": { en: "Passive Solar", tr: "Pasif Güneş", ar: "طاقة شمسية سلبية" },
  "feature.waterRecycling": { en: "Water Recycling", tr: "Su Geri Dönüşümü", ar: "إعادة تدوير المياه" },
  "feature.doubleBathroom": { en: "Double Bathroom", tr: "Çift Banyo", ar: "حمام مزدوج" },
  "feature.homeOffice": { en: "Home Office", tr: "Ev Ofisi", ar: "مكتب منزلي" },
  "feature.wineStorage": { en: "Wine Storage", tr: "Şarap Deposu", ar: "تخزين النبيذ" },
  "feature.smartEverything": { en: "Smart Everything", tr: "Her Şey Akıllı", ar: "كل شيء ذكي" },

  // Hotspots
  "hotspot.aura.0.title": { en: "Triple-Pane Windows", tr: "Üçlü Cam Pencere", ar: "نوافذ ثلاثية الألواح" },
  "hotspot.aura.0.desc": { en: "Energy-efficient glazing with UV protection", tr: "UV korumalı enerji verimli cam", ar: "زجاج موفر للطاقة مع حماية من الأشعة فوق البنفسجية" },
  "hotspot.aura.1.title": { en: "Sustainable Cedar", tr: "Sürdürülebilir Sedir", ar: "أرز مستدام" },
  "hotspot.aura.1.desc": { en: "FSC-certified cedar siding, naturally weather-resistant", tr: "FSC sertifikalı sedir kaplama, doğal hava direnci", ar: "كسوة أرز معتمدة من FSC، مقاومة للطقس بشكل طبيعي" },
  "hotspot.aura.2.title": { en: "Steel Frame", tr: "Çelik İskelet", ar: "هيكل فولاذي" },
  "hotspot.aura.2.desc": { en: "Galvanized steel chassis, 50-year durability guarantee", tr: "Galvanizli çelik şasi, 50 yıl dayanıklılık garantisi", ar: "هيكل فولاذي مجلفن، ضمان متانة 50 عامًا" },
  
  "hotspot.nova.0.title": { en: "Expandable Deck", tr: "Genişletilebilir Teras", ar: "سطح قابل للتوسيع" },
  "hotspot.nova.0.desc": { en: "Hydraulic deck system doubles outdoor living space", tr: "Hidrolik teras sistemi açık hava yaşam alanını ikiye katlar", ar: "نظام سطح هيدروليكي يضاعف مساحة المعيشة الخارجية" },
  "hotspot.nova.1.title": { en: "Solar Ready", tr: "Güneş Enerjisi Hazır", ar: "جاهز للطاقة الشمسية" },
  "hotspot.nova.1.desc": { en: "Pre-wired for 4kW solar panel system", tr: "4kW güneş paneli sistemi için ön kablolama", ar: "مجهز مسبقًا لنظام ألواح شمسية بقدرة 4 كيلووات" },
  "hotspot.nova.2.title": { en: "Foundation Options", tr: "Temel Seçenekleri", ar: "خيارات الأساس" },
  "hotspot.nova.2.desc": { en: "Trailer, permanent, or floating foundation", tr: "Römork, kalıcı veya yüzen temel", ar: "أساس مقطورة أو دائم أو عائم" },
  
  "hotspot.zen.0.title": { en: "Living Roof", tr: "Yeşil Çatı", ar: "سقف حي" },
  "hotspot.zen.0.desc": { en: "Optional green roof with native plants", tr: "Yerli bitkilerle opsiyonel yeşil çatı", ar: "سقف أخضر اختياري مع نباتات محلية" },
  "hotspot.zen.1.title": { en: "Bamboo Interior", tr: "Bambu İç Mekan", ar: "داخلية من الخيزران" },
  "hotspot.zen.1.desc": { en: "Sustainable bamboo flooring and accents", tr: "Sürdürülebilir bambu zemin ve aksanlar", ar: "أرضيات وإكسسوارات من الخيزران المستدام" },
  "hotspot.zen.2.title": { en: "Rainwater System", tr: "Yağmur Suyu Sistemi", ar: "نظام مياه الأمطار" },
  "hotspot.zen.2.desc": { en: "Integrated rainwater collection ready", tr: "Entegre yağmur suyu toplama hazır", ar: "جاهز لتجميع مياه الأمطار المتكامل" },
  
  "hotspot.horizon.0.title": { en: "Aerodynamic Design", tr: "Aerodinamik Tasarım", ar: "تصميم ديناميكي هوائي" },
  "hotspot.horizon.0.desc": { en: "Wind-tunnel tested for fuel efficiency", tr: "Yakıt verimliliği için rüzgar tüneli testli", ar: "مختبر في نفق الرياح لكفاءة الوقود" },
  "hotspot.horizon.1.title": { en: "All-Terrain Tires", tr: "Arazi Lastikleri", ar: "إطارات لجميع التضاريس" },
  "hotspot.horizon.1.desc": { en: "Premium off-road capable wheel package", tr: "Premium arazi kabiliyetli tekerlek paketi", ar: "حزمة عجلات متميزة قادرة على الطرق الوعرة" },
  "hotspot.horizon.2.title": { en: "Lithium Battery", tr: "Lityum Batarya", ar: "بطارية ليثيوم" },
  "hotspot.horizon.2.desc": { en: "400Ah lithium battery bank included", tr: "400Ah lityum batarya bankası dahil", ar: "مرفق بنك بطاريات ليثيوم بسعة 400 أمبير ساعة" },
  
  "hotspot.terra.0.title": { en: "Living Roof", tr: "Yeşil Çatı", ar: "سقف حي" },
  "hotspot.terra.0.desc": { en: "1200 native plants, 40% energy savings", tr: "1200 yerli bitki, %40 enerji tasarrufu", ar: "1200 نبات محلي، توفير 40% من الطاقة" },
  "hotspot.terra.1.title": { en: "Rammed Earth", tr: "Sıkıştırılmış Toprak", ar: "تربة مدكوكة" },
  "hotspot.terra.1.desc": { en: "Thermal mass walls maintain 68°F year-round", tr: "Termal kütle duvarları yıl boyunca 20°C sıcaklık sağlar", ar: "جدران الكتلة الحرارية تحافظ على 20 درجة مئوية على مدار السنة" },
  "hotspot.terra.2.title": { en: "Greywater System", tr: "Gri Su Sistemi", ar: "نظام المياه الرمادية" },
  "hotspot.terra.2.desc": { en: "Full water recycling reduces usage 60%", tr: "Tam su geri dönüşümü kullanımı %60 azaltır", ar: "إعادة تدوير المياه الكاملة تقلل الاستخدام بنسبة 60%" },
  
  "hotspot.lux.0.title": { en: "Italian Marble", tr: "İtalyan Mermer", ar: "رخام إيطالي" },
  "hotspot.lux.0.desc": { en: "Carrara marble countertops and bathroom", tr: "Carrara mermer tezgah ve banyo", ar: "أرفف وحمام من رخام كرارا" },
  "hotspot.lux.1.title": { en: "Smart Glass", tr: "Akıllı Cam", ar: "زجاج ذكي" },
  "hotspot.lux.1.desc": { en: "Electrochromic windows, app controlled", tr: "Elektrokromik pencereler, uygulama kontrollü", ar: "نوافذ كهروضوئية، يتم التحكم بها عبر التطبيق" },
  "hotspot.lux.2.title": { en: "Underfloor Heating", tr: "Yerden Isıtma", ar: "تدفئة أرضية" },
  "hotspot.lux.2.desc": { en: "Hydronic heating throughout", tr: "Her yerde hidronik ısıtma", ar: "تدفئة هيدروليكية في جميع أنحاء المنزل" },

  // Models page
  "models.badge": { en: "Our Collection", tr: "Koleksiyonumuz", ar: "مجموعتنا" },
  "models.title1": { en: "Find Your", tr: "Mükemmel", ar: "ابحث عن" },
  "models.title2": { en: "Perfect Fit", tr: "Uyumu Bulun", ar: "التناسب المثالي" },
  "models.subtitle": {
    en: "Each model is a masterpiece of sustainable design. Hover over the hotspots to explore the technical details that make our homes exceptional.",
    tr: "Her model sürdürülebilir tasarımın bir şaheseridir. Evlerimizi istisnai kılan teknik detayları keşfetmek için noktaların üzerine gelin.",
    ar: "كل نموذج هو تحفة من التصميم المستدام. مرر فوق النقاط الساخنة لاستكشاف التفاصيل التقنية التي تجعل منازلنا استثنائية.",
  },
  "models.filter": { en: "Filter", tr: "Filtrele", ar: "تصفية" },
  "models.allModels": { en: "All Models", tr: "Tüm Modeller", ar: "جميع النماذج" },
  "models.small": { en: "< 26 m²", tr: "< 26 m²", ar: "< 26 م²" },
  "models.medium": { en: "26-37 m²", tr: "26-37 m²", ar: "26-37 م²" },
  "models.large": { en: "> 37 m²", tr: "> 37 m²", ar: "> 37 م²" },
  "models.explore": { en: "Explore", tr: "Keşfet", ar: "استكشف" },
  "models.learnMore": { en: "Learn More", tr: "Daha Fazla", ar: "اعرف المزيد" },
  "models.requestQuote": { en: "Request Quote", tr: "Teklif İste", ar: "طلب عرض سعر" },
  "models.viewAllPhotos": { en: "View All Photos", tr: "Tüm Fotoğrafları Gör", ar: "عرض جميع الصور" },
  "models.photoGallery": { en: "Photo Gallery", tr: "Fotoğraf Galerisi", ar: "معرض الصور" },
  "models.allPhotos": { en: "All", tr: "Tümü", ar: "الكل" },
  "models.exterior": { en: "Exterior", tr: "Dış Mekan", ar: "الخارج" },
  "models.interior": { en: "Interior", tr: "İç Mekan", ar: "الداخل" },
  "models.backToModels": { en: "Back to Models", tr: "Modellere Dön", ar: "العودة إلى النماذج" },
  "models.contactForInfo": {
    en: "Contact us for detailed information about this model. We'd be happy to provide you with a personalized quote and detailed information.",
    tr: "Beğendiğiniz model hakkında detaylı bilgi almak için bizimle iletişime geçin. Size özel fiyat teklifi ve detaylı bilgi sunmaktan mutluluk duyarız.",
    ar: "اتصل بنا للحصول على معلومات مفصلة حول هذا النموذج. سنكون سعداء لتقديم عرض أسعار مخصص ومعلومات مفصلة."
  },
  "models.noModels": { en: "No models available", tr: "Henüz model bulunmuyor", ar: "لا توجد نماذج متاحة" },

  // Specs
  "specs.size": { en: "Size", tr: "Boyut", ar: "الحجم" },
  "specs.capacity": { en: "Capacity", tr: "Kapasite", ar: "السعة" },
  "specs.ecoRating": { en: "Eco Rating", tr: "Eko Derece", ar: "التصنيف البيئي" },
  "specs.bedrooms": { en: "Bedrooms", tr: "Yatak Odası", ar: "غرف النوم" },
  "specs.bathrooms": { en: "Bathrooms", tr: "Banyo", ar: "الحمامات" },
  "specs.features": { en: "Features", tr: "Özellikler", ar: "الميزات" },
  "specs.technicalDetails": { en: "Technical Details", tr: "Teknik Detaylar", ar: "التفاصيل الفنية" },

  // Philosophy section
  "philosophy.badge": { en: "Our Philosophy", tr: "Felsefemiz", ar: "فلسفتنا" },
  "philosophy.title1": { en: "Building Homes That", tr: "Dünyayı Onurlandıran", ar: "بناء منازل" },
  "philosophy.title2": { en: "Honor the Earth", tr: "Evler İnşa Ediyoruz", ar: "تحترم الأرض" },
  "philosophy.subtitle": {
    en: "We believe that beautiful homes and environmental responsibility are not mutually exclusive. Every Moortinyhouse is a promise kept—to our customers, to our craftspeople, and to the planet.",
    tr: "Güzel evlerin ve çevresel sorumluluğun birbirini dışlamadığına inanıyoruz. Her Moortinyhouse, müşterilerimize, zanaatkarlarımıza ve gezegene verilen bir sözdür.",
    ar: "نؤمن بأن المنازل الجميلة والمسؤولية البيئية ليست متناقضة. كل Moortinyhouse هو وعد محقق - لعملائنا ولحرفيينا وللكوكب.",
  },
  "philosophy.buildingFor": { en: "Building for", tr: "İçin İnşa Ediyoruz", ar: "نبني من أجل" },
  "philosophy.tomorrow": { en: "Tomorrow", tr: "Yarın", ar: "الغد" },
  "philosophy.buildingDesc": {
    en: "We believe that living small doesn't mean compromising on comfort or values. Every Moortinyhouse is a testament to sustainable craftsmanship, designed to minimize environmental impact while maximizing quality of life.",
    tr: "Küçük yaşamanın konfordan veya değerlerden ödün vermek anlamına gelmediğine inanıyoruz. Her Moortinyhouse, yaşam kalitesini en üst düzeye çıkarırken çevresel etkiyi en aza indirmek için tasarlanmış sürdürülebilir işçiliğin bir kanıtıdır.",
    ar: "نؤمن أن العيش في مساحة صغيرة لا يعني التنازل عن الراحة أو القيم. كل Moortinyhouse هو شهادة على الحرفية المستدامة، مصمم لتقليل التأثير البيئي مع تعظيم جودة الحياة.",
  },
  "philosophy.learnStory": { en: "Learn Our Story", tr: "Hikayemizi Öğrenin", ar: "تعرف على قصتنا" },
  "philosophy.coreValues": { en: "Our Core Values", tr: "Temel Değerlerimiz", ar: "قيمنا الأساسية" },
  "philosophy.ourJourney": { en: "Our Journey", tr: "Yolculuğumuz", ar: "رحلتنا" },

  // Philosophy values
  "philosophy.sustainable.title": { en: "Sustainable Materials", tr: "Sürdürülebilir Malzemeler", ar: "مواد مستدامة" },
  "philosophy.sustainable.desc": {
    en: "We source 100% FSC-certified timber and use only non-toxic, eco-friendly finishes. Every material is chosen for its environmental impact and longevity.",
    tr: "100% FSC sertifikalı kereste tedarik ediyor ve sadece toksik olmayan, çevre dostu kaplamalar kullanıyoruz. Her malzeme çevresel etkisi ve dayanıklılığı için seçilir.",
    ar: "نحصل على أخشاب معتمدة 100% من FSC ونستخدم فقط التشطيبات غير السامة والصديقة للبيئة. يتم اختيار كل مادة لتأثيرها البيئي وطول عمرها.",
  },
  "philosophy.energy.title": { en: "Energy Efficiency", tr: "Enerji Verimliliği", ar: "كفاءة الطاقة" },
  "philosophy.energy.desc": {
    en: "Our homes achieve an average 80% reduction in energy consumption through superior insulation, passive solar design, and smart energy systems.",
    tr: "Evlerimiz üstün yalıtım, pasif güneş tasarımı ve akıllı enerji sistemleri sayesinde ortalama %80 enerji tüketimi azalması sağlar.",
    ar: "تحقق منازلنا انخفاضًا بمعدل 80% في استهلاك الطاقة من خلال العزل الفائق والتصميم الشمسي السلبي وأنظمة الطاقة الذكية.",
  },
  "philosophy.zeroWaste.title": { en: "Zero Waste Manufacturing", tr: "Sıfır Atık Üretim", ar: "تصنيع بدون نفايات" },
  "philosophy.zeroWaste.desc": {
    en: "Our workshop recycles 98% of all materials. Wood scraps become furniture, metal becomes art, and nothing goes to landfill.",
    tr: "Atölyemiz tüm malzemelerin %98'ini geri dönüştürür. Ahşap artıkları mobilya olur, metal sanat olur ve hiçbir şey çöpe gitmez.",
    ar: "ورشتنا تعيد تدوير 98% من جميع المواد. بقايا الخشب تصبح أثاثًا، والمعدن يصبح فنًا، ولا شيء يذهب إلى المكب.",
  },
  "philosophy.ventilation.title": { en: "Natural Ventilation", tr: "Doğal Havalandırma", ar: "تهوية طبيعية" },
  "philosophy.ventilation.desc": {
    en: "Every home is designed to maximize natural airflow, reducing the need for mechanical cooling and creating healthier living spaces.",
    tr: "Her ev doğal hava akışını en üst düzeye çıkarmak için tasarlanmış, mekanik soğutma ihtiyacını azaltır ve daha sağlıklı yaşam alanları yaratır.",
    ar: "كل منزل مصمم لتحقيق أقصى تدفق طبيعي للهواء، مما يقلل الحاجة إلى التبريد الميكانيكي ويخلق مساحات معيشة أكثر صحة.",
  },
  "philosophy.carbon.title": { en: "Carbon Negative", tr: "Karbon Negatif", ar: "سلبي الكربون" },
  "philosophy.carbon.desc": {
    en: "Through our partnership with reforestation programs, each Moortinyhouse results in 3x the trees planted compared to those used in construction.",
    tr: "Ağaçlandırma programlarıyla ortaklığımız sayesinde, her Moortinyhouse, inşaatta kullanılanlara kıyasla 3 kat daha fazla ağaç dikilmesini sağlar.",
    ar: "من خلال شراكتنا مع برامج إعادة التحريج، ينتج عن كل Moortinyhouse زراعة أشجار تعادل 3 أضعاف تلك المستخدمة في البناء.",
  },
  "philosophy.water.title": { en: "Water Conservation", tr: "Su Tasarrufu", ar: "الحفاظ على المياه" },
  "philosophy.water.desc": {
    en: "Optional rainwater harvesting and greywater recycling systems can reduce water consumption by up to 70%.",
    tr: "İsteğe bağlı yağmur suyu toplama ve gri su geri dönüşüm sistemleri su tüketimini %70'e kadar azaltabilir.",
    ar: "أنظمة حصاد مياه الأمطار الاختيارية وإعادة تدوير المياه الرمادية يمكن أن تقلل استهلاك المياه بنسبة تصل إلى 70%.",
  },
  "philosophy.solar.title": { en: "Solar Integration", tr: "Güneş Entegrasyonu", ar: "تكامل الطاقة الشمسية" },
  "philosophy.solar.desc": {
    en: "Ready for off-grid living with pre-installed solar panel mounting systems.",
    tr: "Önceden kurulmuş güneş paneli montaj sistemleri ile şebekeden bağımsız yaşama hazır.",
    ar: "جاهز للعيش خارج الشبكة مع أنظمة تركيب الألواح الشمسية المثبتة مسبقًا.",
  },

  // Philosophy quote
  "philosophy.quote": {
    en: "We don't just build tiny houses. We craft vessels for the life you've always dreamed of living.",
    tr: "Biz sadece minik evler inşa etmiyoruz. Hayalini kurduğunuz yaşam için gemiler üretiyoruz.",
    ar: "نحن لا نبني مجرد منازل صغيرة. نحن نصنع أوعية للحياة التي طالما حلمت بها.",
  },
  "philosophy.quoteAuthor": { en: "Emma Moortgat", tr: "Emma Moortgat", ar: "إيما مورتجات" },
  "philosophy.quoteRole": {
    en: "Founder & Lead Designer",
    tr: "Kurucu ve Baş Tasarımcı",
    ar: "المؤسسة والمصممة الرئيسية",
  },

  // Timeline
  "timeline.2014.title": { en: "The Beginning", tr: "Başlangıç", ar: "البداية" },
  "timeline.2014.desc": {
    en: "Founded with a single prototype in a backyard workshop.",
    tr: "Arka bahçe atölyesinde tek bir prototiple kuruldu.",
    ar: "تأسست مع نموذج أولي واحد في ورشة الفناء الخلفي.",
  },
  "timeline.2016.title": { en: "First Customer", tr: "İlk Müşteri", ar: "أول عميل" },
  "timeline.2016.desc": {
    en: "Delivered our first custom tiny home to a young couple in Oregon.",
    tr: "İlk özel minik evimizi Oregon'daki genç bir çifte teslim ettik.",
    ar: "سلمنا أول منزل صغير مخصص لنا لزوجين شابين في أوريغون.",
  },
  "timeline.2018.title": { en: "Sustainability Certified", tr: "Sürdürülebilirlik Sertifikası", ar: "معتمد للاستدامة" },
  "timeline.2018.desc": {
    en: "Achieved Green Building certification for all our models.",
    tr: "Tüm modellerimiz için Yeşil Bina sertifikası aldık.",
    ar: "حصلنا على شهادة المباني الخضراء لجميع نماذجنا.",
  },
  "timeline.2020.title": { en: "50 Homes Milestone", tr: "50 Ev Kilometre Taşı", ar: "إنجاز 50 منزل" },
  "timeline.2020.desc": {
    en: "Celebrated 50 homes delivered across North America.",
    tr: "Kuzey Amerika genelinde 50 ev teslimatını kutladık.",
    ar: "احتفلنا بتسليم 50 منزلاً في جميع أنحاء أمريكا الشمالية.",
  },
  "timeline.2022.title": { en: "Innovation Award", tr: "İnovasyon Ödülü", ar: "جائزة الابتكار" },
  "timeline.2022.desc": {
    en: "Received the Sustainable Design Innovation Award.",
    tr: "Sürdürülebilir Tasarım İnovasyon Ödülü'nü aldık.",
    ar: "حصلنا على جائزة الابتكار في التصميم المستدام.",
  },
  "timeline.2025.title": { en: "Carbon Negative", tr: "Karbon Negatif", ar: "سلبي الكربون" },
  "timeline.2025.desc": {
    en: "Achieved carbon negative status in our manufacturing process.",
    tr: "Üretim sürecimizde karbon negatif statüsüne ulaştık.",
    ar: "حققنا حالة سلبية الكربون في عملية التصنيع لدينا.",
  },

  // Testimonials
  "testimonials.badge": { en: "Customer Stories", tr: "Müşteri Hikayeleri", ar: "قصص العملاء" },
  "testimonials.title1": { en: "Dreams", tr: "Hayaller", ar: "أحلام" },
  "testimonials.title2": { en: "Delivered", tr: "Teslim Edildi", ar: "تم تسليمها" },
  "testimonials.subtitle": {
    en: "Real stories from real families who took the leap into tiny living. Discover how Moortinyhouse transformed their lives.",
    tr: "Minik yaşama adım atan gerçek ailelerden gerçek hikayeler. Moortinyhouse'un hayatlarını nasıl dönüştürdüğünü keşfedin.",
    ar: "قصص حقيقية من عائلات حقيقية اتخذت الخطوة نحو العيش الصغير. اكتشف كيف غيرت Moortinyhouse حياتهم.",
  },
  "testimonials.owner": { en: "Owner", tr: "Sahibi", ar: "مالك" },
  "testimonials.readMore": { en: "Read More Stories", tr: "Daha Fazla Hikaye Oku", ar: "اقرأ المزيد من القصص" },

  // Stories section (homepage)
  "stories.badge": { en: "Stories", tr: "Hikayeler", ar: "قصص" },
  "stories.title1": { en: "Dreams", tr: "Hayaller", ar: "أحلام" },
  "stories.title2": { en: "Delivered", tr: "Teslim Edildi", ar: "تم تسليمها" },

  // CTA Section
  "cta.badge": { en: "Start Your Journey", tr: "Yolculuğunuza Başlayın", ar: "ابدأ رحلتك" },
  "cta.title1": { en: "Ready to Live", tr: "Farklı Yaşamaya", ar: "هل أنت مستعد للعيش" },
  "cta.title2": { en: "Differently?", tr: "Hazır mısınız?", ar: "بشكل مختلف؟" },
  "cta.subtitle": {
    en: "Take the first step towards your dream of sustainable tiny living. Schedule a tour of our showroom or speak with our design consultants to explore the possibilities.",
    tr: "Sürdürülebilir minik yaşam hayalinize doğru ilk adımı atın. Showroom'umuzu gezin veya tasarım danışmanlarımızla olasılıkları keşfedin.",
    ar: "اتخذ الخطوة الأولى نحو حلمك بالعيش الصغير المستدام. حدد موعدًا لجولة في معرضنا أو تحدث مع مستشاري التصميم لدينا لاستكشاف الإمكانيات.",
  },
  "cta.schedule": { en: "Schedule a Tour", tr: "Tur Planla", ar: "حدد موعد جولة" },
  "cta.contactUs": { en: "Contact Us", tr: "Bize Ulaşın", ar: "اتصل بنا" },
  "cta.warranty": { en: "10 Year Warranty", tr: "10 Yıl Garanti", ar: "ضمان 10 سنوات" },
  "cta.certified": { en: "Certified Sustainable", tr: "Sertifikalı Sürdürülebilir", ar: "مستدام معتمد" },
  "cta.custom": { en: "Custom Designs", tr: "Özel Tasarımlar", ar: "تصاميم مخصصة" },

  // Portfolio
  "portfolio.badge": { en: "Portfolio", tr: "Portföy", ar: "معرض الأعمال" },
  "portfolio.title1": { en: "Delivered", tr: "Teslim Edilen", ar: "تم تسليمها" },
  "portfolio.title2": { en: "Dreams", tr: "Hayaller", ar: "أحلام" },
  "portfolio.subtitle": {
    en: "Explore our portfolio of completed tiny homes across the country. Each one tells a unique story of sustainable living.",
    tr: "Ülke genelinde tamamlanan minik evlerden oluşan portföyümüzü keşfedin. Her biri sürdürülebilir yaşamın benzersiz bir hikayesini anlatır.",
    ar: "استكشف معرض أعمالنا من المنازل الصغيرة المكتملة في جميع أنحاء البلاد. كل واحد منها يروي قصة فريدة عن الحياة المستدامة.",
  },

  // Contact page
  "contact.badge": { en: "Get in Touch", tr: "İletişime Geçin", ar: "تواصل معنا" },
  "contact.title1": { en: "Let's Start Your", tr: "Yolculuğunuza", ar: "لنبدأ" },
  "contact.title2": { en: "Journey", tr: "Başlayalım", ar: "رحلتك" },
  "contact.subtitle": {
    en: "Ready to explore tiny living? Whether you have questions, want to schedule a tour, or discuss a custom design, we're here to help.",
    tr: "Minik yaşamı keşfetmeye hazır mısınız? Sorularınız varsa, tur planlamak istiyorsanız veya özel tasarım görüşmek istiyorsanız, yardımcı olmak için buradayız.",
    ar: "هل أنت مستعد لاستكشاف الحياة الصغيرة؟ سواء كانت لديك أسئلة أو تريد حجز جولة أو مناقشة تصميم مخصص، نحن هنا للمساعدة.",
  },
  "contact.email.title": { en: "Email Us", tr: "E-posta Gönderin", ar: "راسلنا" },
  "contact.email.desc": {
    en: "We typically respond within 24 hours",
    tr: "Genellikle 24 saat içinde yanıt veriyoruz",
    ar: "نرد عادة في غضون 24 ساعة",
  },
  "contact.phone.title": { en: "Call Us", tr: "Bizi Arayın", ar: "اتصل بنا" },
  "contact.phone.desc": { en: "Mon-Fri, 9am-6pm EST", tr: "Pzt-Cum, 09:00-18:00", ar: "الاثنين-الجمعة، 9ص-6م" },
  "contact.visit.title": { en: "Visit Us", tr: "Bizi Ziyaret Edin", ar: "قم بزيارتنا" },
  "contact.visit.desc": { en: "Schedule an appointment first", tr: "Önce randevu alın", ar: "حدد موعدًا أولاً" },
  "contact.form.help": {
    en: "What can we help you with?",
    tr: "Size nasıl yardımcı olabiliriz?",
    ar: "كيف يمكننا مساعدتك؟",
  },
  "contact.form.tour": { en: "Schedule a Tour", tr: "Tur Planla", ar: "حدد موعد جولة" },
  "contact.form.general": { en: "General Inquiry", tr: "Genel Soru", ar: "استفسار عام" },
  "contact.form.custom": { en: "Custom Design", tr: "Özel Tasarım", ar: "تصميم مخصص" },
  "contact.form.firstName": { en: "First Name", tr: "Ad", ar: "الاسم الأول" },
  "contact.form.lastName": { en: "Last Name", tr: "Soyad", ar: "اسم العائلة" },
  "contact.form.email": { en: "Email", tr: "E-posta", ar: "البريد الإلكتروني" },
  "contact.form.phone": { en: "Phone (Optional)", tr: "Telefon (İsteğe Bağlı)", ar: "الهاتف (اختياري)" },
  "contact.form.preferredDate": { en: "Preferred Date", tr: "Tercih Edilen Tarih", ar: "التاريخ المفضل" },
  "contact.form.message": { en: "Message", tr: "Mesaj", ar: "الرسالة" },
  "contact.form.messagePlaceholder": {
    en: "Tell us about your tiny house dreams...",
    tr: "Minik ev hayallerinizden bahsedin...",
    ar: "أخبرنا عن أحلامك في المنزل الصغير...",
  },
  "contact.form.send": { en: "Send Message", tr: "Mesaj Gönder", ar: "إرسال الرسالة" },
  "contact.form.sending": { en: "Sending...", tr: "Gönderiliyor...", ar: "جاري الإرسال..." },
  "contact.form.success": { en: "Message Sent!", tr: "Mesaj Gönderildi!", ar: "تم إرسال الرسالة!" },
  "contact.form.successDesc": {
    en: "Thank you for reaching out. We'll get back to you within 24 hours.",
    tr: "Bize ulaştığınız için teşekkürler. 24 saat içinde size döneceğiz.",
    ar: "شكراً لتواصلك معنا. سنرد عليك في غضون 24 ساعة.",
  },
  "contact.form.sendAnother": { en: "Send Another Message", tr: "Başka Mesaj Gönder", ar: "إرسال رسالة أخرى" },
  "contact.showroom.title": { en: "Visit Our Showroom", tr: "Showroom'umuzu Ziyaret Edin", ar: "قم بزيارة معرضنا" },
  "contact.showroom.desc": {
    en: "Experience our tiny homes in person. Tour multiple models and meet our design team.",
    tr: "Minik evlerimizi bizzat deneyimleyin. Birden fazla modeli gezin ve tasarım ekibimizle tanışın.",
    ar: "جرب منازلنا الصغيرة شخصياً. قم بجولة في نماذج متعددة والتقِ بفريق التصميم لدينا.",
  },
  "contact.showroom.hours": { en: "Open Hours", tr: "Açılış Saatleri", ar: "ساعات العمل" },
  "contact.showroom.schedule": {
    en: "Monday - Saturday: 10am - 6pm",
    tr: "Pazartesi - Cumartesi: 10:00 - 18:00",
    ar: "الاثنين - السبت: 10ص - 6م",
  },
  "contact.showroom.sunday": { en: "Sunday: By Appointment", tr: "Pazar: Randevu ile", ar: "الأحد: بموعد مسبق" },

  // Footer
  "footer.tagline": {
    en: "Crafting sustainable tiny homes for those who seek freedom, simplicity, and connection with nature.",
    tr: "Özgürlük, sadelik ve doğayla bağlantı arayanlar için sürdürülebilir minik evler üretiyoruz.",
    ar: "نصنع منازل صغيرة مستدامة لأولئك الذين يبحثون عن الحرية والبساطة والاتصال بالطبيعة.",
  },
  "footer.explore": { en: "Explore", tr: "Keşfet", ar: "استكشف" },
  "footer.company": { en: "Company", tr: "Şirket", ar: "الشركة" },
  "footer.followUs": { en: "Follow Us", tr: "Bizi Takip Edin", ar: "تابعنا" },
  "footer.newsletter": { en: "Newsletter", tr: "Bülten", ar: "النشرة الإخبارية" },
  "footer.emailPlaceholder": { en: "Your email", tr: "E-postanız", ar: "بريدك الإلكتروني" },
  "footer.join": { en: "Join", tr: "Katıl", ar: "انضم" },
  "footer.rights": { en: "All rights reserved.", tr: "Tüm hakları saklıdır.", ar: "جميع الحقوق محفوظة." },
  "footer.privacy": { en: "Privacy Policy", tr: "Gizlilik Politikası", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms of Service", tr: "Hizmet Şartları", ar: "شروط الخدمة" },
  "footer.models": { en: "Models", tr: "Modeller", ar: "النماذج" },
  "footer.gallery": { en: "Gallery", tr: "Galeri", ar: "المعرض" },
  "footer.philosophy": { en: "Philosophy", tr: "Felsefe", ar: "الفلسفة" },
  "footer.stories": { en: "Stories", tr: "Hikayeler", ar: "القصص" },
  "footer.aboutUs": { en: "About Us", tr: "Hakkımızda", ar: "معلومات عنا" },
  "footer.contact": { en: "Contact", tr: "İletişim", ar: "اتصل بنا" },
  "footer.faq": { en: "FAQ", tr: "SSS", ar: "الأسئلة الشائعة" },
  "footer.blog": { en: "Blog", tr: "Blog", ar: "المدونة" },
  "footer.liveSimply": { en: "Live Simply", tr: "Sade Yaşa", ar: "عش ببساطة" },
  "footer.dreamBig": { en: "Dream Big", tr: "Büyük Hayal Kur", ar: "احلم كبيرًا" },

  // Admin
  "admin.title": { en: "Admin Dashboard", tr: "Admin Paneli", ar: "لوحة الإدارة" },
  "admin.welcome": { en: "Welcome to Admin Panel", tr: "Admin Paneline Hoş Geldiniz", ar: "مرحبًا بك في لوحة الإدارة" },
  "admin.overview": { en: "Overview", tr: "Genel Bakış", ar: "نظرة عامة" },
  "admin.inquiries": { en: "Inquiries", tr: "Sorgular", ar: "الاستفسارات" },
  "admin.models": { en: "Models", tr: "Modeller", ar: "النماذج" },
  "admin.content": { en: "Content", tr: "İçerik", ar: "المحتوى" },
  "admin.settings": { en: "Settings", tr: "Ayarlar", ar: "الإعدادات" },
  "admin.logout": { en: "Logout", tr: "Çıkış", ar: "تسجيل الخروج" },
  "admin.totalInquiries": { en: "Total Inquiries", tr: "Toplam Sorgu", ar: "إجمالي الاستفسارات" },
  "admin.newThisWeek": { en: "New This Week", tr: "Bu Hafta Yeni", ar: "جديد هذا الأسبوع" },
  "admin.scheduledTours": { en: "Scheduled Tours", tr: "Planlanan Turlar", ar: "الجولات المجدولة" },
  "admin.conversionRate": { en: "Conversion Rate", tr: "Dönüşüm Oranı", ar: "معدل التحويل" },
  "admin.recentInquiries": { en: "Recent Inquiries", tr: "Son Sorgular", ar: "الاستفسارات الأخيرة" },
  "admin.viewAll": { en: "View All", tr: "Tümünü Gör", ar: "عرض الكل" },
  "admin.pending": { en: "Pending", tr: "Beklemede", ar: "معلق" },
  "admin.responded": { en: "Responded", tr: "Yanıtlandı", ar: "تم الرد" },
  "admin.login": { en: "Admin Login", tr: "Admin Girişi", ar: "تسجيل دخول المسؤول" },
  "admin.password": { en: "Password", tr: "Şifre", ar: "كلمة المرور" },
  "admin.signIn": { en: "Sign In", tr: "Giriş Yap", ar: "تسجيل الدخول" },
  "admin.wrongPassword": { en: "Wrong password", tr: "Yanlış şifre", ar: "كلمة المرور خاطئة" },
  "admin.quickStats": { en: "Quick Stats", tr: "Hızlı İstatistikler", ar: "إحصائيات سريعة" },
  "admin.popularModels": { en: "Popular Models", tr: "Popüler Modeller", ar: "النماذج الشائعة" },
  "admin.recentActivity": { en: "Recent Activity", tr: "Son Aktivite", ar: "النشاط الأخير" },

  // Common
  "common.loading": { en: "Loading...", tr: "Yükleniyor...", ar: "جاري التحميل..." },
  "common.error": { en: "An error occurred", tr: "Bir hata oluştu", ar: "حدث خطأ" },
  "common.success": { en: "Success!", tr: "Başarılı!", ar: "نجاح!" },
  "common.cancel": { en: "Cancel", tr: "İptal", ar: "إلغاء" },
  "common.save": { en: "Save", tr: "Kaydet", ar: "حفظ" },
  "common.delete": { en: "Delete", tr: "Sil", ar: "حذف" },
  "common.edit": { en: "Edit", tr: "Düzenle", ar: "تعديل" },
  "common.close": { en: "Close", tr: "Kapat", ar: "إغلاق" },
  "common.back": { en: "Back", tr: "Geri", ar: "رجوع" },
  "common.next": { en: "Next", tr: "İleri", ar: "التالي" },
  "common.previous": { en: "Previous", tr: "Önceki", ar: "السابق" },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr") // Default Türkçe
  const [mounted, setMounted] = useState(false)
  const settings = useSiteSettings()

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language
    if (saved && ["en", "tr", "ar"].includes(saved)) {
      setLanguage(saved)
    } else {
      // İlk açılışta Türkçe kullan
      setLanguage("tr")
      localStorage.setItem("language", "tr")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const t = (key: string): string => {
    const override = settings.content_overrides?.[language]?.[key]
    if (override && override.trim()) return override
    return translations[key]?.[language] || key
  }

  const dir = language === "ar" ? "rtl" : "ltr"

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
