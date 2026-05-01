-- Increment analyses_used za korisnika (poziva se nakon svake uspešne analize)
CREATE OR REPLACE FUNCTION increment_analyses_used(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET analyses_used = analyses_used + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reset analyses_used na početku svakog meseca (poziva se Supabase Cron-om)
CREATE OR REPLACE FUNCTION reset_monthly_analyses()
RETURNS void AS $$
BEGIN
  UPDATE profiles SET analyses_used = 0 WHERE plan = 'free';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Proveri da li korisnik može da uradi analizu
CREATE OR REPLACE FUNCTION can_analyze(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan plan_type;
  v_used INT;
BEGIN
  SELECT plan, analyses_used INTO v_plan, v_used
  FROM profiles WHERE id = user_id;

  IF v_plan = 'free' AND v_used >= 2 THEN RETURN FALSE; END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Daj pristup ovim funkcijama authenticated korisnicima
GRANT EXECUTE ON FUNCTION increment_analyses_used(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION can_analyze(UUID) TO authenticated;
