import { useState } from 'react'
import { Link } from 'react-router-dom'
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
      <section className="home-hero">
        <h1>איך העור שלך היום?</h1>
        <p>גלי את המוצרים והרכיבים שיעזרו לך להרגיש טוב בעור שלך.</p>
        <Link className="hero-cta" to="/ingredients">
          לבודקת הרכיבים
        </Link>
      </section>
      <nav className="getting-started" aria-label="צעדים להתחלה">
        <a className="getting-started-link" href="#product-list">
          <span className="step-number">01</span>
          <span>חפשי מוצר</span>
        </a>
        <Link className="getting-started-link" to="/ingredients">
          <span className="step-number">02</span>
          <span>בדקי מה יש בו</span>
        </Link>
        <Link className="getting-started-link" to="/routine">
          <span className="step-number">03</span>
          <span>בני את השגרה שלך</span>
        </Link>
      </nav>
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
