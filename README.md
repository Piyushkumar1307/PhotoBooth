# PhotoBooth AI

AI-powered photobooth — snap a selfie, describe your vibe, get transformed.

## Flow

1. **Splash** — Welcome screen
2. **Camera** — Take a selfie with countdown
3. **Prompt** — Describe how AI should transform you
4. **Processing** — OpenAI transforms your photo
5. **Result** — View, download, or share (stored on Cloudinary)

## Setup

```bash
npm install
cp .env.example .env.local
# Add your API keys to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## Models

- **GPT Image 1** — Selfie transformation via image edit (low quality for cost savings)

## Tech Stack

Next.js 15 · Tailwind CSS · Framer Motion · OpenAI · Cloudinary
