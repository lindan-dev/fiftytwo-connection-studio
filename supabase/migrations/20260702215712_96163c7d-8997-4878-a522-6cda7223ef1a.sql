
DROP POLICY IF EXISTS "Anyone can insert beta signups" ON public.beta_signups;
DROP POLICY IF EXISTS "Prevent public access to beta signups" ON public.beta_signups;
REVOKE ALL ON public.beta_signups FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.beta_signups TO service_role;
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
