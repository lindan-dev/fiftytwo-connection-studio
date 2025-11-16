import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting check for unconverted beta signups...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate the date 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // Query for unconverted signups older than 2 days that haven't had reminders sent
    const { data: unconvertedUsers, error: queryError } = await supabase
      .from("beta_signups")
      .select("*")
      .eq("app_signup_completed", false)
      .eq("reminder_sent", false)
      .lt("created_at", twoDaysAgo.toISOString());

    if (queryError) {
      console.error("Error querying unconverted signups:", queryError);
      throw queryError;
    }

    if (!unconvertedUsers || unconvertedUsers.length === 0) {
      console.log("No unconverted signups found");
      return new Response(
        JSON.stringify({ message: "No unconverted signups found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${unconvertedUsers.length} unconverted signups`);

    // Format the email content
    const userList = unconvertedUsers.map((user, index) => {
      const signupDate = new Date(user.created_at);
      const daysAgo = Math.floor((Date.now() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
      
      return `${index + 1}. ${user.name} (${user.email})
   - Signed up: ${daysAgo} days ago
   - Partner: ${user.partner_name || 'Not provided'}`;
    }).join('\n\n');

    const emailHtml = `
      <h2>Beta Signups Pending Conversion - ${unconvertedUsers.length} user${unconvertedUsers.length > 1 ? 's' : ''}</h2>
      <p>The following beta signups have not yet signed up for the app:</p>
      <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${userList}</pre>
      <hr style="margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">This is an automated reminder for beta signups older than 2 days who haven't completed app signup.</p>
    `;

    // Send notification email
    const emailResponse = await resend.emails.send({
      from: "fiftytwoormore <noreply@updates.lindaninc.com>",
      to: ["fiftytwoormore@lindaninc.com"],
      subject: `Beta Signups Pending Conversion - ${unconvertedUsers.length} user${unconvertedUsers.length > 1 ? 's' : ''}`,
      html: emailHtml,
    });

    console.log("Notification email sent successfully:", emailResponse);

    // Mark users as reminder_sent = true
    const userIds = unconvertedUsers.map(u => u.id);
    const { error: updateError } = await supabase
      .from("beta_signups")
      .update({ reminder_sent: true })
      .in("id", userIds);

    if (updateError) {
      console.error("Error updating reminder_sent status:", updateError);
      throw updateError;
    }

    console.log(`Marked ${userIds.length} users as reminder_sent = true`);

    return new Response(
      JSON.stringify({
        message: `Processed ${unconvertedUsers.length} unconverted signups`,
        emailSent: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in check-unconverted-signups function:", error);
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
