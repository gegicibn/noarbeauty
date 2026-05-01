-- Supabase Storage bucket za PDF izveštaje
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'reports',
  'reports',
  true,
  10485760,  -- 10MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- RLS: korisnik može da čita samo svoje fajlove
CREATE POLICY "Korisnik čita svoje PDF-ove"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Servis može da upisuje PDF-ove"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'reports');

CREATE POLICY "Servis može da ažurira PDF-ove"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'reports');
