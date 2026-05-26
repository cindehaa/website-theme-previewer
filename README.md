# Website Theme Previewer

Standalone Next.js app extracted from [cindehaa-site](https://github.com/cindehaa/cindehaa-site).

Generate colour and font palettes from built-in presets and manual controls, preview them on a mock site, then export a downloadable `THEME.md` briefing.

**Live:** [theme-md.cindehaa.com](https://theme-md.cindehaa.com)

## Scripts

- `npm run dev` — local development at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run built app

## Deploy

Deploy to Vercel under the **C's projects** team. No environment variables required.

## Structure

- `src/app/page.tsx` — main UI
- `src/app/components/` — preview + controls
- `src/app/lib/` — colour engine, presets, markdown export
