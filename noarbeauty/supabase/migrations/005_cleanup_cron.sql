-- Automatsko brisanje fotografija starijih od 90 dana
-- Pokreće se svaki dan u 3:00 AM via pg_cron (Supabase Pro ima pg_cron)
-- Za Supabase Free: pokreni ručno ili via Supabase Edge Function cron

CREATE OR REPLACE FUNCTION cleanup_old_photos()
RETURNS void AS $$
DECLARE
  r RECORD;
BEGIN
  -- Pronađi izveštaje starije od 90 dana sa front_photo_url
  FOR r IN
    SELECT id, user_id
    FROM reports
    WHERE
      front_photo_url IS NOT NULL
      AND created_at < NOW() - INTERVAL '90 days'
  LOOP
    -- Briši iz storage-a (path format: user_id/report_id/front.jpg)
    PERFORM storage.delete('photos', r.user_id::text || '/' || r.id::text || '/front.jpg');
    PERFORM storage.delete('photos', r.user_id::text || '/' || r.id::text || '/front.png');
    PERFORM storage.delete('photos', r.user_id::text || '/' || r.id::text || '/front.webp');

    -- Obriši URL iz baze
    UPDATE reports
    SET front_photo_url = NULL
    WHERE id = r.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ako imaš Supabase Pro sa pg_cron:
-- SELECT cron.schedule('cleanup-old-photos', '0 3 * * *', 'SELECT cleanup_old_photos()');
