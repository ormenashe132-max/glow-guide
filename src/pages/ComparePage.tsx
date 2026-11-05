import CompareTable from '../components/CompareTable'
import { findCommonIngredients } from '../data/commonIngredients'
import type { Product } from '../types'

type ComparePageProps = {
  compareProducts: Product[]
  onRemoveCompareProduct: (product: Product) => void
}

function ComparePage({
  compareProducts,
  onRemoveCompareProduct,
}: ComparePageProps) {
  if (compareProducts.length === 0) {
    return (
      <main>
        <h1>השוואת מוצרים</h1>
        <p className="empty-state">
          עוד לא בחרת מוצרים להשוואה. אפשר להוסיף מוצר מעמוד הפרטים שלו.
        </p>
      </main>
    )
  }

  const commonIngredients = findCommonIngredients(compareProducts)

  return (
    <main>
      <h1>השוואת מוצרים</h1>
      <CompareTable
        products={compareProducts}
        onRemove={onRemoveCompareProduct}
      />
      <section className="common-ingredients">
        <h2>רכיבים משותפים</h2>
        {compareProducts.length < 2 ? (
          <p>יש לבחור לפחות שני מוצרים כדי למצוא רכיבים משותפים.</p>
        ) : commonIngredients.length > 0 ? (
          <ul>
            {commonIngredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>לא נמצאו רכיבים משותפים.</p>
        )}
      </section>
    </main>
  )
}

export default ComparePage
