// Performance monitoring utilities

export function reportWebVitals(metric: any) {
  // Log web vitals in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to your analytics service
    // analytics.track(metric.name, metric.value)
  }
}

export function measurePerformance(name: string, callback: () => void) {
  const startTime = performance.now()
  callback()
  const endTime = performance.now()
  console.log(`${name} took ${endTime - startTime}ms`)
}

// Lazy load images with intersection observer
export function lazyLoadImage(element: HTMLImageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      }
    })
  })

  observer.observe(element)
}
