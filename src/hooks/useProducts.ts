import { useEffect, useState } from 'react'
import { filterProducts } from '../data/filterProducts'
import type { Product } from '../types'

const PRODUCTS_API_URL =
  'https://world.openbeautyfacts.org/api/v2/search?categories_tags_en=face-creams&fields=code,product_name,brands,image_front_url,ingredients_text&page_size=100'

type ProductsResponse = {
  products: Product[]
}

function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      setError(false)

      try {
        const response = await fetch(PRODUCTS_API_URL)

        if (!response.ok) {
          throw new Error()
        }

        const data: ProductsResponse = await response.json()
        setProducts(filterProducts(data.products))
      } catch {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [retryCount])

  function retry() {
    setRetryCount((count) => count + 1)
  }

  return { products, isLoading, error, retry }
}

export default useProducts
