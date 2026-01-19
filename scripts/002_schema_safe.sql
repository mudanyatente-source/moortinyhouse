-- Tiny House Website - Complete Database Schema (Safe Version)
-- This script safely creates or updates all required tables and policies

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Allow admins to view their own data" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to update their own data" ON admin_users;
DROP POLICY IF EXISTS "Public read access to site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin write access to site settings" ON site_settings;
DROP POLICY IF EXISTS "Public read access to published models" ON tiny_house_models;
DROP POLICY IF EXISTS "Admin full access to models" ON tiny_house_models;
DROP POLICY IF EXISTS "Public read access to portfolio" ON portfolio_projects;
DROP POLICY IF EXISTS "Admin full access to portfolio" ON portfolio_projects;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin read access to contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin update access to contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can create page views" ON analytics_page_views;
DROP POLICY IF EXISTS "Admin read access to page views" ON analytics_page_views;
DROP POLICY IF EXISTS "Anyone can create events" ON analytics_events;
DROP POLICY IF EXISTS "Admin read access to events" ON analytics_events;
DROP POLICY IF EXISTS "Public read access to approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access to testimonials" ON testimonials;

-- Enable Row Level Security on all tables
ALTER TABLE IF EXISTS admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tiny_house_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

CREATE TABLE IF NOT EXISTS tiny_house_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price_starting DECIMAL(10, 2),
  size_sqft INTEGER,
  bedrooms DECIMAL(3, 1),
  bathrooms DECIMAL(3, 1),
  features JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]',
  floor_plan_url TEXT,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  location TEXT,
  completion_date DATE,
  model_id UUID REFERENCES tiny_house_models(id),
  description TEXT,
  images JSONB DEFAULT '[]',
  testimonial TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  interested_model TEXT,
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  device_type TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path TEXT,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_location TEXT,
  author_image_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_id UUID REFERENCES portfolio_projects(id),
  model_id UUID REFERENCES tiny_house_models(id),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_models_published ON tiny_house_models(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_models_slug ON tiny_house_models(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON portfolio_projects(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_date ON analytics_page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_path ON analytics_page_views(page_path, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved, display_order) WHERE is_approved = true;

-- Create Row Level Security Policies

-- Admin Users: Admins can view and update their own data
CREATE POLICY "Allow admins to view their own data"
  ON admin_users FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Allow admins to update their own data"
  ON admin_users FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Site Settings: Public read, admin write
CREATE POLICY "Public read access to site settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin write access to site settings"
  ON site_settings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Tiny House Models: Public can read published, admins have full access
CREATE POLICY "Public read access to published models"
  ON tiny_house_models FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admin full access to models"
  ON tiny_house_models FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Portfolio Projects: Public can read published, admins have full access
CREATE POLICY "Public read access to portfolio"
  ON portfolio_projects FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admin full access to portfolio"
  ON portfolio_projects FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Contact Messages: Anyone can insert, admins can read/update
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin read access to contact messages"
  ON contact_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admin update access to contact messages"
  ON contact_messages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Analytics: Anyone can create, admins can read
CREATE POLICY "Anyone can create page views"
  ON analytics_page_views FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin read access to page views"
  ON analytics_page_views FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Anyone can create events"
  ON analytics_events FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin read access to events"
  ON analytics_events FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Testimonials: Public can read approved, admins have full access
CREATE POLICY "Public read access to approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Admin full access to testimonials"
  ON testimonials FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

-- Insert default site settings
INSERT INTO site_settings (key, value, description)
VALUES 
  ('site_name', '"Tiny House Living Solutions"', 'Website name'),
  ('site_tagline', '"Dream Tiny, Live Large"', 'Website tagline'),
  ('contact_email', '"info@tinyhousesolutions.com"', 'Contact email address'),
  ('contact_phone', '"(555) 123-4567"', 'Contact phone number'),
  ('business_hours', '{"monday": "9am-5pm", "tuesday": "9am-5pm", "wednesday": "9am-5pm", "thursday": "9am-5pm", "friday": "9am-5pm", "saturday": "10am-3pm", "sunday": "Closed"}', 'Business hours'),
  ('social_media', '{"facebook": "", "instagram": "", "pinterest": "", "youtube": ""}', 'Social media links'),
  ('address', '{"street": "123 Tiny House Lane", "city": "Portland", "state": "OR", "zip": "97201"}', 'Business address'),
  ('analytics_enabled', 'true', 'Enable analytics tracking'),
  ('maintenance_mode', 'false', 'Site maintenance mode')
ON CONFLICT (key) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_models_updated_at ON tiny_house_models;
CREATE TRIGGER update_models_updated_at
  BEFORE UPDATE ON tiny_house_models
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolio_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
