import type { Product } from '../types'
import ProductCard from './ProductCard'

type ProductListProps = {
  products: Product[]
}

function ProductList({ products }: ProductListProps) {
  return (
    <section>
      {products.map((product) => (
        <ProductCard key={product.code} product={product} />
      ))}
    </section>
  )
}

export default ProductList
