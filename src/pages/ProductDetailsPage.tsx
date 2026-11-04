import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import Loading from '../components/Loading'
import ProductImage from '../components/ProductImage'
import {
  FREE_FROM_OPTIONS,
  isProductFreeFrom,
} from '../data/freeFrom'
import type { Product } from '../types'

type ProductResponse = {
  status: number
  product?: Product
}

type ProductDetailsPageProps = {
  routineProducts: Product[]
  onToggleFavorite: (product: Product) => void
}

function ProductDetailsPage({
  routineProducts,
  onToggleFavorite,
}: ProductDetailsPageProps) {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true)
      setError(false)
      setNotFound(false)

      if (!id) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://world.openbeautyfacts.org/api/v2/product/${id}?fields=code,product_name,brands,image_front_url,ingredients_text`,
        )

        if (response.status === 404) {
          setNotFound(true)
          return
        }

        if (!response.ok) {
          throw new Error()
        }

        const data: ProductResponse = await response.json()
        if (data.status !== 1 || !data.product) {
          setNotFound(true)
          return
        }

        setProduct(data.product)
      } catch {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadProduct()
  }, [id, retryCount])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <main>
        <ErrorMessage onRetry={() => setRetryCount((count) => count + 1)} />
        <Link to="/">חזרה לרשימת המוצרים</Link>
      </main>
    )
  }

  if (notFound || !product) {
    return (
      <main>
        <p>המוצר לא נמצא.</p>
        <Link to="/">חזרה לרשימת המוצרים</Link>
      </main>
    )
  }

  return (
    <main>
      <Link to="/">חזרה לרשימת המוצרים</Link>
      <article className="product-details">
        <div className="product-details-media">
          <FavoriteButton
            product={product}
            isFavorite={routineProducts.some((item) => item.code === product.code)}
            onToggle={onToggleFavorite}
          />
          <ProductImage
            imageUrl={product.image_front_url}
            alt={product.product_name}
          />
        </div>
        <div className="product-details-info">
          <h1>{product.product_name}</h1>
          <p>{product.brands || 'מותג לא צוין'}</p>
          <h2>רכיבים</h2>
          <p>{product.ingredients_text || 'רשימת הרכיבים לא זמינה'}</p>
          {product.ingredients_text && (
            <div className="free-from-badges" aria-label="מאפייני רכיבים">
              {FREE_FROM_OPTIONS.filter((option) =>
                isProductFreeFrom(product, option),
              ).map((option) => (
                <span className="free-from-badge" key={option}>
                  ✓ {option}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </main>
  )
}

export default ProductDetailsPage
