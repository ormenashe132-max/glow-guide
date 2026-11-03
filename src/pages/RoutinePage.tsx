import ProductList from '../components/ProductList'
import type { Product } from '../types'

type RoutinePageProps = {
  routineProducts: Product[]
  onToggleFavorite: (product: Product) => void
}

function RoutinePage({
  routineProducts,
  onToggleFavorite,
}: RoutinePageProps) {
  return (
    <main>
      <h1>השגרה שלי</h1>
      <section className="routine-summary" aria-live="polite">
        <span className="routine-count">{routineProducts.length}</span>
        <span>מוצרים בשגרה שלך</span>
      </section>
      {routineProducts.length === 0 ? (
        <p className="empty-state">השגרה שלך ריקה</p>
      ) : (
        <ProductList
          products={routineProducts}
          routineProducts={routineProducts}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  )
}

export default RoutinePage
