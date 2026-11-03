import type { Product } from '../types'
import ProductCard from './ProductCard'

type ProductListProps = {
  products: Product[]
  routineProducts: Product[]
  onToggleFavorite: (product: Product) => void
}

function ProductList({
  products,
  routineProducts,
  onToggleFavorite,
}: ProductListProps) {
  return (
    <section>
      {products.map((product) => (
        <ProductCard
          key={product.code}
          product={product}
          isFavorite={routineProducts.some((item) => item.code === product.code)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default ProductList
