const numberFormatter = new Intl.NumberFormat('en-us', { notation: 'compact' })

export function formatNumber(number: number) {
  return numberFormatter.format(number)
}

const dateFormatter = new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' })

export function formatDate(date: Date) {
  return dateFormatter.format(date)
}
