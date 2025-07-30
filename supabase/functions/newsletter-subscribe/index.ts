import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    // Validate email
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "TechPulse <noreply@jaytechkenya.com>",
      to: [email],
      subject: "Welcome to TechPulse Newsletter!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb; text-align: center;">Welcome to TechPulse!</h1>
          <p>Thank you for subscribing to our newsletter. You'll now receive the latest tech news, startup insights, and industry trends directly in your inbox.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin: 0 0 10px 0;">What to expect:</h3>
            <ul style="color: #475569;">
              <li>🚀 Breaking startup news and funding announcements</li>
              <li>📊 Weekly market analysis and tech trends</li>
              <li>💡 Exclusive interviews with industry leaders</li>
              <li>🔧 Latest product launches and innovations</li>
            </ul>
          </div>
          
          <p style="color: #64748b;">Stay tuned for your first newsletter coming soon!</p>
          
          <hr style="border: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #94a3b8; font-size: 14px; text-align: center;">
            You can unsubscribe at any time by replying to any newsletter email.
            <br>
            © 2024 TechPulse. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Newsletter subscription successful:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to subscribe to newsletter", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);