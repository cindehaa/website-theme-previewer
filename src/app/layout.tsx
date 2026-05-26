import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Website Theme Previewer — cindehaa',
  description:
    'Generate colour and font palettes, preview them on a mock site, and export a THEME.md briefing.',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
