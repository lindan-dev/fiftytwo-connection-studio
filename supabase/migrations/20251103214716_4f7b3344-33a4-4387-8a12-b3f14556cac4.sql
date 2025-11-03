-- Create beta_signups table
CREATE TABLE public.beta_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  partner_name TEXT,
  relationship_duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public signup form)
CREATE POLICY "Anyone can insert beta signups"
ON public.beta_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Create index on email
CREATE INDEX idx_beta_signups_email ON public.beta_signups(email);

-- Create index on created_at
CREATE INDEX idx_beta_signups_created_at ON public.beta_signups(created_at DESC);