import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckBetaRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: CheckBetaRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Checking beta status for email: ${email}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user exists in beta_signups
    const { data: betaUser, error: queryError } = await supabase
      .from("beta_signups")
      .select("*")
      .eq("email", email)
      .single();

    if (queryError && queryError.code !== "PGRST116") {
      console.error("Error querying beta_signups:", queryError);
      throw queryError;
    }

    if (!betaUser) {
      console.log(`User ${email} is not a beta user`);
      return new Response(
        JSON.stringify({ 
          isBetaUser: false 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`User ${email} is a beta user, checking conversion status`);

    // If beta user exists and hasn't been marked as converted yet, mark them now
    if (!betaUser.app_signup_completed) {
      const { error: updateError } = await supabase
        .from("beta_signups")
        .update({
          app_signup_completed: true,
          app_signup_completed_at: new Date().toISOString(),
        })
        .eq("id", betaUser.id);

      if (updateError) {
        console.error("Error updating beta signup:", updateError);
        throw updateError;
      }

      console.log(`Marked ${email} as converted to app signup`);
    }

    return new Response(
      JSON.stringify({
        isBetaUser: true,
        signupDate: betaUser.created_at,
        name: betaUser.name,
        partnerName: betaUser.partner_name,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in check-beta-status function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
