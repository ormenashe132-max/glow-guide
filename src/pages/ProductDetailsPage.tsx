import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import type { Product } from '../types'
import './ProductDetailsPage.css'

type ProductResponse = {
  status: number
  product?: Product
}

function ProductDetailsPage() {
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
      <article>
        <img
          src={product.image_front_url}
          alt={product.product_name}
          className="product-details-image"
        />
        <h1>{product.product_name}</h1>
        <p>{product.brands || 'מותג לא צוין'}</p>
        <h2>רכיבים</h2>
        <p>{product.ingredients_text || 'רשימת הרכיבים לא זמינה'}</p>
      </article>
    </main>
  )
}

export default ProductDetailsPage
