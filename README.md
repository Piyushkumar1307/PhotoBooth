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

## Deploy on Render

1. Create a **Web Service** (not Static Site) on [Render](https://render.com)
2. Connect your GitHub repo
3. Use these settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Node version:** 20+
4. Add environment variables in Render dashboard:
   - `OPENAI_API_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

Or use the included `render.yaml` blueprint for one-click setup.

> **Important:** This app must be deployed as a **Web Service** because it uses Next.js API routes (`/api/transform`). A Static Site will show a blank page.
