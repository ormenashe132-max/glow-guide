import type { Product } from '../types'
import { Link } from 'react-router-dom'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/items/${product.code}`}>
      <article>
        <img src={product.image_front_url} alt={product.product_name} />
        <h2>{product.product_name}</h2>
        <p>{product.brands || 'מותג לא צוין'}</p>
      </article>
    </Link>
  )
}

export default ProductCard
