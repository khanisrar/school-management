import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: dbError } = await supabase
      .from("email_otps")
      .insert([{ email, otp, expires_at: expiresAt }]);

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    await sendEmail(
      email,
      "Your OTP Code",
      `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
    );

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
