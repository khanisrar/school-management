// app/api/school/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Convert File → Buffer (needed for Supabase upload in Node.js)
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Skip authentication during build time
const shouldSkipAuth = process.env.NEXT_PHASE === "phase-production-build";

export async function POST(req: Request) {
  // Skip authentication during build
  if (!shouldSkipAuth) {
    const { authenticate } = await import("@/helpers/auth");
    const user = await authenticate(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const image = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const fileBuffer = await fileToBuffer(image);

      const { error: uploadError } = await supabase.storage
        .from("schoolimages")
        .upload(fileName, fileBuffer, {
          contentType: image.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("schoolimages")
        .getPublicUrl(fileName);
      imageUrl = data?.publicUrl || null;
    }

    const { error } = await supabase
      .from("schools")
      .insert([
        { name, address, city, state, contact, email_id, image: imageUrl },
      ]);

    if (error) throw error;

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error: unknown) {
    console.error("Error inserting school:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to add school", details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from("schools").select("*");
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching schools:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch schools", details: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  // Skip authentication during build
  if (!shouldSkipAuth) {
    const { authenticate } = await import("@/helpers/auth");
    const user = await authenticate(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "School ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("schools")
      .delete()
      .eq("id", Number(id));
    if (error) throw error;

    return NextResponse.json({ message: "School deleted successfully!" });
  } catch (error: unknown) {
    console.error("Error deleting school:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to delete school", details: message },
      { status: 500 }
    );
  }
}
