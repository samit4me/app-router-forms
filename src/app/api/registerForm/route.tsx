import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    // TODO: add data to db
    return NextResponse.json({ message: "User regisiterd", user: parsed.data });
  }

  return NextResponse.json(
    { message: "Invalid data", error: parsed.error },
    { status: 400 }
  );
}
