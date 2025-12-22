import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CLEANUP_DAYS = 16;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting cleanup-expired-signups function");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const sixteenDaysAgo = new Date(now.getTime() - CLEANUP_DAYS * 24 * 60 * 60 * 1000);

    // Find expired signups: 16+ days old, not completed
    const { data: expiredSignups, error: fetchError } = await supabase
      .from("beta_signups")
      .select("id, name, email")
      .eq("app_signup_completed", false)
      .lt("created_at", sixteenDaysAgo.toISOString());

    if (fetchError) {
      console.error("Error fetching expired signups:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${expiredSignups?.length || 0} expired signups to remove`);

    if (!expiredSignups || expiredSignups.length === 0) {
      return new Response(JSON.stringify({ success: true, removed: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Delete expired signups
    const expiredIds = expiredSignups.map((signup) => signup.id);
    
    const { error: deleteError } = await supabase
      .from("beta_signups")
      .delete()
      .in("id", expiredIds);

    if (deleteError) {
      console.error("Error deleting expired signups:", deleteError);
      throw deleteError;
    }

    const removedEmails = expiredSignups.map((s) => s.email).join(", ");
    console.log(`Removed ${expiredSignups.length} expired signups: ${removedEmails}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        removed: expiredSignups.length,
        emails: expiredSignups.map((s) => s.email),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in cleanup-expired-signups:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
