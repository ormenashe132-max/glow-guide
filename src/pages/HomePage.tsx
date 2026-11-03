import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import { filterProducts } from '../data/filterProducts'
import { searchProducts } from '../data/searchProducts'
import type { Product } from '../types'

const PRODUCTS_API_URL =
  'https://world.openbeautyfacts.org/api/v2/search?categories_tags_en=face-creams&fields=code,product_name,brands,image_front_url,ingredients_text&page_size=100'

type ProductsResponse = {
  products: Product[]
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const filteredProducts = searchProducts(products, searchText)

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

  return (
    <main>
      <h1>מוצרי טיפוח</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage onRetry={() => setRetryCount((count) => count + 1)} />
      ) : (
        <>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p>לא נמצאו מוצרים</p>
          )}
        </>
      )}
    </main>
  )
}

export default HomePage
