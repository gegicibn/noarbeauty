-- Storage bucket za korisničke fotografije (30-dnevni retention)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'photos',
  'photos',
  false,  -- PRIVATNI bucket — pristup samo autorizovanim korisnicima
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Korisnik može da uploaduje samo u svoju fasciklu
CREATE POLICY "Korisnik uploaduje svoje fotke"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Korisnik može da čita samo svoje fotke
CREATE POLICY "Korisnik čita svoje fotke"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Korisnik može da briše svoje fotke
CREATE POLICY "Korisnik briše svoje fotke"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
