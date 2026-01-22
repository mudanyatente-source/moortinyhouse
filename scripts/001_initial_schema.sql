-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to view their own data" ON public.admin_users
  FOR SELECT USING (auth.uid() = id);

-- Create site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES public.admin_users(id)
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated admins to read site settings" ON public.site_settings
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "Allow authenticated admins to update site settings" ON public.site_settings
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "Allow authenticated admins to insert site settings" ON public.site_settings
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create tiny house models table
CREATE TABLE IF NOT EXISTS public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  tagline_tr TEXT,
  tagline_en TEXT,
  description_tr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price DECIMAL(10, 2),
  size_sqm INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  main_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  features_tr JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  is_popular BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title_tr TEXT,
  seo_title_en TEXT,
  seo_description_tr TEXT,
  seo_description_en TEXT,
  seo_keywords_tr TEXT,
  seo_keywords_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read visible models" ON public.models
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Allow authenticated admins to manage models" ON public.models
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create portfolio/projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_tr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  model_id UUID REFERENCES public.models(id) ON DELETE SET NULL,
  location TEXT,
  completion_date DATE,
  main_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title_tr TEXT,
  seo_title_en TEXT,
  seo_description_tr TEXT,
  seo_description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read visible projects" ON public.portfolio_projects
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Allow authenticated admins to manage projects" ON public.portfolio_projects
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to read messages" ON public.contact_messages
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "Allow authenticated admins to update messages" ON public.contact_messages
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "Allow authenticated admins to delete messages" ON public.contact_messages
  FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create site analytics table for tracking page views
CREATE TABLE IF NOT EXISTS public.site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert analytics" ON public.site_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to read analytics" ON public.site_analytics
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create model views tracking
CREATE TABLE IF NOT EXISTS public.model_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.model_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert model views" ON public.model_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to read model views" ON public.model_views
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_tr TEXT,
  role_en TEXT,
  content_tr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read visible testimonials" ON public.testimonials
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Allow authenticated admins to manage testimonials" ON public.testimonials
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

COMMIT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_models_slug ON public.models(slug);
CREATE INDEX IF NOT EXISTS idx_models_visible ON public.models(is_visible);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_visible ON public.portfolio_projects(is_visible);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.site_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_model_views_model ON public.model_views(model_id);
CREATE INDEX IF NOT EXISTS idx_contact_created ON public.contact_messages(created_at);

COMMIT;

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('company_info', '{"name_tr": "Moor Tiny House", "name_en": "Moor Tiny House", "address": "Bursa, Türkiye", "phone": "+90 XXX XXX XX XX", "email": "info@moortinyhouse.com", "working_hours_tr": "Pazartesi - Cuma: 09:00 - 18:00", "working_hours_en": "Monday - Friday: 09:00 - 18:00"}'::jsonb),
  ('hero_section', '{"title_tr": "Doğayla Uyum İçinde Yaşam", "title_en": "Living in Harmony with Nature", "subtitle_tr": "Minimalist yaşamın lüksünü keşfedin", "subtitle_en": "Discover the luxury of minimalist living", "cta_text_tr": "Modelleri Keşfet", "cta_text_en": "Explore Models", "background_image": "/beautiful-modern-tiny-house-in-nature-forest-setti.jpg"}'::jsonb),
  ('sections_visibility', '{"hero": true, "models": true, "philosophy": true, "testimonials": true, "portfolio": true, "cta": true}'::jsonb),
  ('seo_defaults', '{"site_title_tr": "Moor Tiny House | Modern Tiny House Çözümleri", "site_title_en": "Moor Tiny House | Modern Tiny House Solutions", "site_description_tr": "Türkiye''nin önde gelen tiny house üreticisi. Modern, sürdürülebilir ve özelleştirilebilir tiny house modelleri.", "site_description_en": "Turkey''s leading tiny house manufacturer. Modern, sustainable and customizable tiny house models.", "keywords_tr": "tiny house, moor tiny house, mini ev, küçük ev, mobil ev, prefabrik ev, bursa tiny house, istanbul tiny house", "keywords_en": "tiny house, moor tiny house, small house, mobile home, prefab house, bursa tiny house, istanbul tiny house"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

COMMIT;
