import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import useProducts from '../hooks/useProducts'
import { searchByIngredient } from '../data/searchByIngredient'
import type { Product } from '../types'

type IngredientsPageProps = {
  routineProducts: Product[]
  onToggleFavorite: (product: Product) => void
}

function IngredientsPage({
  routineProducts,
  onToggleFavorite,
}: IngredientsPageProps) {
  const { products, isLoading, error, retry } = useProducts()
  const [searchText, setSearchText] = useState('')
  const matchingProducts = searchByIngredient(products, searchText)

  return (
    <main>
      <h1>בודקת רכיבים</h1>
      <label className="search-label">
        חיפוש לפי רכיב
        <span className="search-field">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </span>
      </label>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage onRetry={retry} />
      ) : searchText.trim() === '' ? (
        <p className="empty-state">הקלידי שם של רכיב, למשל Niacinamide</p>
      ) : matchingProducts.length > 0 ? (
        <ProductList
          products={matchingProducts}
          routineProducts={routineProducts}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <p className="empty-state">לא נמצאו מוצרים</p>
      )}
    </main>
  )
}

export default IngredientsPage
