import type { Product } from '../types'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <img src={product.image_front_url} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <p>{product.brands}</p>
    </article>
  )
}

export default ProductCard
