import { NextResponse } from "next/server";
import { authenticate } from "@/helpers/auth";

export async function POST(req: Request) {
  const user = await authenticate(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ message: "User exists", email: user.email });
}
