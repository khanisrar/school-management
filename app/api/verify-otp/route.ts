import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { signJwt } from "@/helpers/jwt";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const { data: otpData, error: otpError } = await supabase
      .from("email_otps")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (otpError || !otpData) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }
    await supabase.from("email_otps").delete().eq("email", email);

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!existingUser) {
      await supabase.from("users").insert([{ email }]);
    }

    // 4️⃣ Generate custom JWT (for client-side auth)
    const token = signJwt({ email });

    // 5️⃣ Return token to client
    return NextResponse.json({ message: "OTP verified", token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
