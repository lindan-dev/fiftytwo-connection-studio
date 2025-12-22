ALTER TABLE public.beta_signups 
ADD COLUMN first_reminder_sent boolean DEFAULT false,
ADD COLUMN second_reminder_sent boolean DEFAULT false;