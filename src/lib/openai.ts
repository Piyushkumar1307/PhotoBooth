import OpenAI, { toFile } from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** Prepare selfie for gpt-image-1 edit (1024px square PNG) */
async function prepareImage(base64: string): Promise<Buffer> {
  const buffer = Buffer.from(base64, "base64");
  return sharp(buffer)
    .resize(1024, 1024, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
}

function buildEditPrompt(userPrompt: string): string {
  return `Transform this selfie while keeping the person's likeness recognizable. ${userPrompt}`;
}

/**
 * Transform selfie using gpt-image-1 edits.
 * Uses low quality for lower cost.
 */
export async function transformSelfie(
  imageBase64: string,
  userPrompt: string
): Promise<string> {
  const imageBuffer = await prepareImage(imageBase64);

  const imageFile = await toFile(imageBuffer, "selfie.png", {
    type: "image/png",
  });

  const response = await openai.images.edit({
    model: "gpt-image-1",
    image: imageFile,
    prompt: buildEditPrompt(userPrompt.trim()),
    n: 1,
    size: "1024x1024",
    quality: "low",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("OpenAI did not return an image");
  }

  return b64;
}
