-- Add tracking fields to beta_signups table
ALTER TABLE public.beta_signups 
ADD COLUMN app_signup_completed BOOLEAN DEFAULT false,
ADD COLUMN app_signup_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN reminder_sent BOOLEAN DEFAULT false;