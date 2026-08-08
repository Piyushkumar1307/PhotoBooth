export type AppStep = "splash" | "camera" | "prompt" | "processing" | "result";

export interface TransformResult {
  url: string;
  publicId: string;
}

export const PROMPT_SUGGESTIONS = [
  "Turn me into a retro 80s pop star with neon lights",
  "Make me a watercolor portrait painting",
  "Transform me into a Pixar-style 3D character",
  "Give me a cyberpunk hacker look with glowing eyes",
  "Make me look like a vintage Hollywood movie star",
  "Turn me into a comic book superhero",
];
