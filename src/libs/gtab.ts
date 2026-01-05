export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Log les pages vues
export const pageview = (url: string) => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Log les événements personnalisés
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number
}) => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
