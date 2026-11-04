import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import FreeFromFilter from '../components/FreeFromFilter'
import HeroSection from '../components/HeroSection'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import SkinConcernFilter from '../components/SkinConcernFilter'
import { filterProductsByFreeFrom } from '../data/freeFrom'
import type { FreeFromOption } from '../data/freeFrom'
import { filterProductsBySkinConcern } from '../data/skinConcerns'
import type { SkinConcern } from '../data/skinConcerns'
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
  const [selectedOptions, setSelectedOptions] = useState<FreeFromOption[]>([])
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | null>(
    null,
  )
  const searchedProducts = searchProducts(products, searchText)
  const freeFromProducts = filterProductsByFreeFrom(
    searchedProducts,
    selectedOptions,
  )
  const filteredProducts = filterProductsBySkinConcern(
    freeFromProducts,
    selectedConcern,
  )

  return (
    <main>
      <HeroSection />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage onRetry={retry} />
      ) : (
        <section id="product-list" className="product-section">
          <h2 className="section-title">מוצרים שכדאי להכיר</h2>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
          <FreeFromFilter
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
          />
          <SkinConcernFilter
            selectedConcern={selectedConcern}
            onConcernChange={setSelectedConcern}
          />
          {filteredProducts.length > 0 ? (
            <ProductList
              products={filteredProducts}
              routineProducts={routineProducts}
              onToggleFavorite={onToggleFavorite}
            />
          ) : (
            <p className="empty-state">לא נמצאו מוצרים</p>
          )}
        </section>
      )}
    </main>
  )
}

export default HomePage
