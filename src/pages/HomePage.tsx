import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import { filterProducts } from '../data/filterProducts'
import type { Product } from '../types'

const PRODUCTS_API_URL =
  'https://world.openbeautyfacts.org/api/v2/search?categories_tags_en=face-creams&fields=code,product_name,brands,image_front_url,ingredients_text&page_size=100'

type ProductsResponse = {
  products: unknown[]
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'products' in value &&
    Array.isArray(value.products)
  )
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(PRODUCTS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`בקשת המוצרים נכשלה (${response.status})`)
        }

        const data: unknown = await response.json()
        if (!isProductsResponse(data)) {
          throw new Error('מבנה נתוני המוצרים אינו תקין')
        }

        setProducts(filterProducts(data.products))
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'אירעה שגיאה לא צפויה',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [retryCount])

  return (
    <main>
      <h1>מוצרי טיפוח</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      ) : (
        <ProductList products={products} />
      )}
    </main>
  )
}

export default HomePage
