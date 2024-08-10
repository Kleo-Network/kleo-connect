export function getKeyByValue<T extends string>(
  enumObj: Record<string, T>,
  value: T
): keyof typeof enumObj | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === value)
}

export function getVisitTime(visitTime: string): string {
  const date = new Date(parseInt(visitTime))
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function replaceSlugInURL(url: string, slug: string | undefined) {
  const final_slug = slug || localStorage.getItem('slug') || ''
  return url.replace('{slug}', final_slug)
}
