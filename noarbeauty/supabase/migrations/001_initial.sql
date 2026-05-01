-- NoarBeauty AI — Initial Schema
-- Pokrenuti u Supabase SQL Editor ili via: supabase db push

-- Enumeracije
CREATE TYPE plan_type AS ENUM ('free', 'pro', 'elite');
CREATE TYPE report_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE language_code AS ENUM ('sr', 'bs', 'en');

-- Profili (proširuje Supabase auth.users)
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT,
  plan            plan_type NOT NULL DEFAULT 'free',
  analyses_used   INT NOT NULL DEFAULT 0,
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Izveštaji
CREATE TABLE reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status          report_status NOT NULL DEFAULT 'pending',
  language        language_code NOT NULL DEFAULT 'sr',
  front_photo_url TEXT,
  left_photo_url  TEXT,
  right_photo_url TEXT,
  results         JSONB,
  pdf_url         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

-- Plaćanja (log)
CREATE TABLE payments (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id  TEXT UNIQUE NOT NULL,
  amount                    INT NOT NULL,
  currency                  TEXT NOT NULL DEFAULT 'rsd',
  status                    TEXT NOT NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indeksi
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);

-- Auto-updated_at za profiles
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile kada se registruje korisnik
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Korisnik vidi samo svoj profil"
  ON profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Korisnik vidi samo svoje izvestaje"
  ON reports FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Korisnik vidi samo svoja placanja"
  ON payments FOR SELECT USING (auth.uid() = user_id);
