-- Add unique constraint to prevent duplicate email signups
ALTER TABLE public.beta_signups 
ADD CONSTRAINT beta_signups_email_unique UNIQUE (email);