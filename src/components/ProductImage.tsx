import { useState } from 'react'
import './ProductImage.css'

type ProductImageProps = {
  imageUrl: string
  alt: string
}

function ProductImage({ imageUrl, alt }: ProductImageProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const imageFailed = !imageUrl || failedImageUrl === imageUrl

  return (
    <div className="product-image-frame">
      {imageFailed ? (
        <div
          className="product-image-placeholder"
          role="img"
          aria-label={`תמונה לא זמינה: ${alt}`}
        >
          <span aria-hidden="true">▧</span>
        </div>
      ) : (
        <img
          className="product-image"
          src={imageUrl}
          alt={alt}
          onError={() => setFailedImageUrl(imageUrl)}
        />
      )}
    </div>
  )
}

export default ProductImage
