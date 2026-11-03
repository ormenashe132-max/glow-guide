import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import { searchProducts } from '../data/searchProducts'
import useProducts from '../hooks/useProducts'
import type { Product } from '../types'

type HomePageProps = {
  routineProducts: Product[]
  onToggleFavorite: (product: Product) => void
}

function HomePage({ routineProducts, onToggleFavorite }: HomePageProps) {
  const { products, isLoading, error, retry } = useProducts()
  const [searchText, setSearchText] = useState('')
  const filteredProducts = searchProducts(products, searchText)

  return (
    <main>
      <h1>מוצרי טיפוח</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage onRetry={retry} />
      ) : (
        <>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
          {filteredProducts.length > 0 ? (
            <ProductList
              products={filteredProducts}
              routineProducts={routineProducts}
              onToggleFavorite={onToggleFavorite}
            />
          ) : (
            <p>לא נמצאו מוצרים</p>
          )}
        </>
      )}
    </main>
  )
}

export default HomePage
