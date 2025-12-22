/**
 * Generate avatar URL with fallback support
 * Uses UI Avatars API with proper error handling
 */
export const getAvatarUrl = (name: string, size: number = 128): string => {
  if (!name || name.trim() === '') {
    return getDefaultAvatar('User', size)
  }

  // Clean the name - remove special characters and ensure it's valid
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .substring(0, 50) // Limit length

  if (!cleanName || cleanName.length === 0) {
    return getDefaultAvatar('User', size)
  }

  // Use UI Avatars API
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=beige&color=fff&size=${size}&bold=true&format=png`
}

/**
 * Generate default avatar using data URI (SVG)
 * This ensures we always have a fallback
 */
export const getDefaultAvatar = (name: string, size: number = 128): string => {
  const initials = getInitials(name)
  const colors = [
    { bg: '#d4c2a8', text: '#fff' },
    { bg: '#b89d7a', text: '#fff' },
    { bg: '#8b6f4f', text: '#fff' },
    { bg: '#735a42', text: '#fff' },
  ]
  const colorIndex = name.charCodeAt(0) % colors.length
  const color = colors[colorIndex]

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color.bg}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="${color.text}" text-anchor="middle" dominant-baseline="central">${initials}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Get initials from a name
 */
export const getInitials = (name: string): string => {
  if (!name || name.trim() === '') return 'U'

  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Check if an image URL is valid
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false
  if (url.startsWith('data:')) return true
  if (url.startsWith('http://') || url.startsWith('https://')) return true
  if (url.startsWith('/')) return true
  return false
}

