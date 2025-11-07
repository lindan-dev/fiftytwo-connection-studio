-- Enable pg_cron extension for scheduling tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for making HTTP requests from scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_net;