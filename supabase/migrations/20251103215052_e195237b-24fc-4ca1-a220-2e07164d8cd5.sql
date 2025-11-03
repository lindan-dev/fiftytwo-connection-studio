-- Add SELECT policy to prevent public access to beta signups
-- This protects personal information (emails, names) from being harvested
-- Data can only be accessed via backend tools with service role key

CREATE POLICY "Prevent public access to beta signups"
ON public.beta_signups
FOR SELECT
USING (false);