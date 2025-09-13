import { verifyJwt } from "@/helpers/jwt";
import { supabase } from "@/lib/supabaseClient";

export async function authenticate(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No authorization header or wrong format");
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJwt(token);

  if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
    console.error("Invalid token or missing email");
    return null;
  }

  const email = decoded.email;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    console.error("User not found");
    return null;
  }

  return user;
}
