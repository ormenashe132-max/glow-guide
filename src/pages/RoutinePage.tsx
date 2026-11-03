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
      {routineProducts.length === 0 ? (
        <p>השגרה שלך ריקה</p>
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
