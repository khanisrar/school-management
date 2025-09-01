import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const image = formData.get("image") as File | null;


    let imageName: string | null = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageName = Date.now() + "-" + image.name;
      const fs = require("fs");
      fs.writeFileSync(`public/schoolImages/${imageName}`, buffer);
    }

    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imageName]
    );

    return NextResponse.json({ message: "School added successfully!" });
  }
  
catch (error: any) {
  console.error("Error inserting school:", error);
  return NextResponse.json(
    { error: "Failed to add school", details: error.message },
    { status: 500 }
  );
}
}

// Handle GET request
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "School ID is required" }, { status: 400 });
    } 
    await pool.query("DELETE FROM schools WHERE id = ?", [id]);
    return NextResponse.json({ message: "School deleted successfully!" });
  }
  catch (error) {
    return NextResponse.json(
      { error: "Failed to delete school" },
      { status: 500 }
    );
  }
}

