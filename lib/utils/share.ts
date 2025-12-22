export const shareProduct = async (product: { name: string; id: string }) => {
  const url = `${window.location.origin}/products/${product.id}`
  const text = `Check out ${product.name} at Funiro!`

  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text,
        url,
      })
    } catch (error) {
      // User cancelled or error occurred
      console.error('Error sharing:', error)
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      alert('Product link copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

