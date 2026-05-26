# Website Theme Previewer

Standalone Next.js app extracted from [cindehaa-site](https://github.com/cindehaa/cindehaa-site).

Generate colour and font palettes, preview them on a mock site, riff with AI-guided themes, then export a downloadable `THEME.md` briefing.

## Scripts

- `npm run dev` — local development at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run built app

## Environment

Copy `.env.example` to `.env.local` and set:

- `OPENAI_API_KEY` — required for Vision preset generation (`POST /api/theme-vision`). The rest of the tool works without it.

## Deploy

Deploy to Vercel (or any Node host). Link this repo and add `OPENAI_API_KEY` in project settings.

Suggested production URL: `https://theme-previewer.cindehaa.com` or similar.

## Structure

- `src/app/page.tsx` — main UI
- `src/app/components/` — preview + controls
- `src/app/lib/` — colour engine, presets, markdown export
- `src/app/api/theme-vision/route.ts` — OpenAI vision endpoint
