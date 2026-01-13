import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Rate limiting: 2 emails per second max, so we add 500ms delay between emails
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const EMAIL_DELAY_MS = 550; // Slightly over 500ms to be safe

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FIRST_REMINDER_DAYS = 2;
const SECOND_REMINDER_DAYS = 7;
const THIRD_REMINDER_DAYS = 14;
const ADMIN_EMAIL = "fiftytwoormore@lindaninc.com";

// Day 2: Gentle check-in
const getFirstReminderEmail = (name: string) => ({
  subject: "Quick check-in from Fiftytwoormore 💜",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hey ${name},</h1>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Just a quick note—we noticed you signed up for the Fiftytwoormore beta a couple of days ago but haven't had a chance to download the app yet.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        No rush at all. Life happens, and we totally get it.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Whenever you're ready, your spot is waiting. It only takes a minute to get started.
      </p>
      
      <div style="margin: 30px 0;">
        <a href="https://fiftytwoormore.com" style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
          Complete Your Signup
        </a>
      </div>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Looking forward to having you both on board. 💜
      </p>
      
      <p style="color: #888; font-size: 14px; margin-top: 30px;">
        — The Fiftytwoormore Team
      </p>
    </div>
  `,
});

// Day 7: Friendly nudge with value reminder
const getSecondReminderEmail = (name: string) => ({
  subject: "Still thinking about it? We'd love to have you 💭",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hey ${name},</h1>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        A week ago, you signed up for the Fiftytwoormore beta. We're still holding your spot—but wanted to check in.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        If you've been on the fence, here's what other couples are telling us:
      </p>
      
      <ul style="color: #555; font-size: 16px; line-height: 1.8; padding-left: 20px;">
        <li>"It's like a quiet nudge to stay connected—without any pressure."</li>
        <li>"We didn't realize how much time had slipped by until we started tracking."</li>
        <li>"Simple. Private. Actually helpful."</li>
      </ul>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        No quizzes. No coaching. Just a simple weekly log to help you and your partner stay in sync.
      </p>
      
      <div style="margin: 30px 0;">
        <a href="https://fiftytwoormore.com" style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
          Get Started Now
        </a>
      </div>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Hope to see you inside soon. 💜
      </p>
      
      <p style="color: #888; font-size: 14px; margin-top: 30px;">
        — The Fiftytwoormore Team
      </p>
    </div>
  `,
});

// Day 14: Final reminder with 2-day warning
const getThirdReminderEmail = (name: string) => ({
  subject: "Your spot is about to open up 🌷",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hey ${name},</h1>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        We wanted to reach out one last time.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        It's been two weeks since you signed up for the Fiftytwoormore beta, and we haven't seen you complete your registration yet. We're keeping our beta small to give every couple the best experience—so <strong>in the next 2 days, we'll be opening your spot to another couple on the waitlist</strong>.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        If now isn't the right time, we completely understand. Relationships have seasons, and sometimes the timing just isn't there.
      </p>
      
      <div style="margin: 30px 0;">
        <a href="https://fiftytwoormore.com" style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
          Keep My Spot
        </a>
      </div>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        And if you decide later that you'd like to try Fiftytwoormore, you're always welcome to sign up again. We'd love to have you whenever the time is right.
      </p>
      
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Wishing you and your partner all the best. 💜
      </p>
      
      <p style="color: #888; font-size: 14px; margin-top: 30px;">
        — The Fiftytwoormore Team
      </p>
    </div>
  `,
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting send-user-reminders function");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    
    // Use calendar days: a signup on Day X is eligible for Day-2 reminder on Day X+2 (any time)
    // We compare against the END of the target day to include all signups from that calendar day
    const getEndOfDay = (date: Date) => {
      const d = new Date(date);
      d.setUTCHours(23, 59, 59, 999);
      return d;
    };
    
    const today = new Date(now);
    today.setUTCHours(0, 0, 0, 0);
    
    // Calculate the end of the target signup day for each reminder
    // E.g., for Day-2 reminder on Jan 13: eligible if signed up on or before Jan 11 23:59:59
    const twoDaysAgoEnd = getEndOfDay(new Date(today.getTime() - FIRST_REMINDER_DAYS * 24 * 60 * 60 * 1000));
    const sevenDaysAgoEnd = getEndOfDay(new Date(today.getTime() - SECOND_REMINDER_DAYS * 24 * 60 * 60 * 1000));
    const fourteenDaysAgoEnd = getEndOfDay(new Date(today.getTime() - THIRD_REMINDER_DAYS * 24 * 60 * 60 * 1000));
    
    console.log(`Calendar day calculation - Today: ${today.toISOString()}`);
    console.log(`First reminder cutoff (day ${FIRST_REMINDER_DAYS}): ${twoDaysAgoEnd.toISOString()}`);
    console.log(`Second reminder cutoff (day ${SECOND_REMINDER_DAYS}): ${sevenDaysAgoEnd.toISOString()}`);
    console.log(`Third reminder cutoff (day ${THIRD_REMINDER_DAYS}): ${fourteenDaysAgoEnd.toISOString()}`);

    // First reminder: signed up 2+ calendar days ago, not completed, first reminder not sent
    const { data: firstReminderUsers, error: firstError } = await supabase
      .from("beta_signups")
      .select("id, name, email")
      .eq("app_signup_completed", false)
      .eq("first_reminder_sent", false)
      .lte("created_at", twoDaysAgoEnd.toISOString());

    if (firstError) {
      console.error("Error fetching first reminder users:", firstError);
      throw firstError;
    }

    console.log(`Found ${firstReminderUsers?.length || 0} users for first reminder (day 2)`);

    // Send first reminders
    for (const user of firstReminderUsers || []) {
      const emailContent = getFirstReminderEmail(user.name);
      
      const { error: emailError } = await resend.emails.send({
        from: "fiftytwoormore <noreply@updates.lindaninc.com>",
        to: [user.email],
        cc: [ADMIN_EMAIL],
        subject: emailContent.subject,
        html: emailContent.html,
      });

      if (emailError) {
        console.error(`Error sending first reminder to ${user.email}:`, emailError);
        continue;
      }

      console.log(`First reminder (day 2) sent to ${user.email}`);

      await supabase
        .from("beta_signups")
        .update({ first_reminder_sent: true })
        .eq("id", user.id);

      // Rate limit: wait before sending next email
      await delay(EMAIL_DELAY_MS);
    }

    // Second reminder: signed up 7+ calendar days ago, not completed, second reminder not sent
    const { data: secondReminderUsers, error: secondError } = await supabase
      .from("beta_signups")
      .select("id, name, email")
      .eq("app_signup_completed", false)
      .eq("second_reminder_sent", false)
      .lte("created_at", sevenDaysAgoEnd.toISOString());

    if (secondError) {
      console.error("Error fetching second reminder users:", secondError);
      throw secondError;
    }

    console.log(`Found ${secondReminderUsers?.length || 0} users for second reminder (day 7)`);

    // Send second reminders
    for (const user of secondReminderUsers || []) {
      const emailContent = getSecondReminderEmail(user.name);
      
      const { error: emailError } = await resend.emails.send({
        from: "fiftytwoormore <noreply@updates.lindaninc.com>",
        to: [user.email],
        cc: [ADMIN_EMAIL],
        subject: emailContent.subject,
        html: emailContent.html,
      });

      if (emailError) {
        console.error(`Error sending second reminder to ${user.email}:`, emailError);
        continue;
      }

      console.log(`Second reminder (day 7) sent to ${user.email}`);

      await supabase
        .from("beta_signups")
        .update({ second_reminder_sent: true })
        .eq("id", user.id);

      // Rate limit: wait before sending next email
      await delay(EMAIL_DELAY_MS);
    }

    // Third reminder: signed up 14+ calendar days ago, not completed, third reminder not sent
    const { data: thirdReminderUsers, error: thirdError } = await supabase
      .from("beta_signups")
      .select("id, name, email")
      .eq("app_signup_completed", false)
      .eq("third_reminder_sent", false)
      .lte("created_at", fourteenDaysAgoEnd.toISOString());

    if (thirdError) {
      console.error("Error fetching third reminder users:", thirdError);
      throw thirdError;
    }

    console.log(`Found ${thirdReminderUsers?.length || 0} users for third reminder (day 14)`);

    // Send third reminders
    for (const user of thirdReminderUsers || []) {
      const emailContent = getThirdReminderEmail(user.name);
      
      const { error: emailError } = await resend.emails.send({
        from: "fiftytwoormore <noreply@updates.lindaninc.com>",
        to: [user.email],
        cc: [ADMIN_EMAIL],
        subject: emailContent.subject,
        html: emailContent.html,
      });

      if (emailError) {
        console.error(`Error sending third reminder to ${user.email}:`, emailError);
        continue;
      }

      console.log(`Third reminder (day 14) sent to ${user.email}`);

      await supabase
        .from("beta_signups")
        .update({ third_reminder_sent: true })
        .eq("id", user.id);

      // Rate limit: wait before sending next email
      await delay(EMAIL_DELAY_MS);
    }

    const summary = {
      firstReminders: firstReminderUsers?.length || 0,
      secondReminders: secondReminderUsers?.length || 0,
      thirdReminders: thirdReminderUsers?.length || 0,
    };

    console.log("Completed send-user-reminders:", summary);

    return new Response(JSON.stringify({ success: true, ...summary }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-user-reminders:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
