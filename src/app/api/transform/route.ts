import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { transformSelfie } from "@/lib/openai";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const base64 = image.replace(/^data:image\/\w+;base64,/, "");

    const transformedBase64 = await transformSelfie(base64, prompt.trim());
    const { url, publicId } = await uploadToCloudinary(transformedBase64);

    return NextResponse.json({ url, publicId });
  } catch (error) {
    console.error("Transform error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to transform image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
