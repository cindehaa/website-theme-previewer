function normalizeHref(url: string): string {
  if (typeof window === 'undefined') return url
  try {
    return new URL(url, window.location.href).href
  } catch {
    return url
  }
}

export function ensureStylesheetLink(url: string): void {
  if (typeof document === 'undefined') return

  const targetHref = normalizeHref(url)
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]')
  const alreadyExists = Array.from(links).some((link) => normalizeHref(link.href) === targetHref)

  if (alreadyExists) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.setAttribute('data-theme-previewer-font', 'true')
  document.head.appendChild(link)
}
