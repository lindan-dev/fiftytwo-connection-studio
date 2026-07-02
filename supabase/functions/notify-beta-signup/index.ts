import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  name: string;
  email: string;
  partnerName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const expected = `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`;
  if (req.headers.get("authorization") !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { name, email, partnerName }: NotificationRequest = await req.json();

    console.log(`Sending notification for new beta signup: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "fiftytwoormore <noreply@updates.lindaninc.com>",
      to: ["fiftytwoormore@lindaninc.com"],
      subject: "New Beta Signup - fiftytwoormore",
      html: `
        <h2>New Beta Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${partnerName ? `<p><strong>Partner Name:</strong> ${partnerName}</p>` : ''}
        <p><em>Signed up at ${new Date().toLocaleString()}</em></p>
      `,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
