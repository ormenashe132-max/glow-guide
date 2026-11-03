import type { Product } from '../types'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

type ProductCardProps = {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (product: Product) => void
}

function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <FavoriteButton
        product={product}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />
      <Link to={`/items/${product.code}`}>
        <img src={product.image_front_url} alt={product.product_name} />
        <h2>{product.product_name}</h2>
        <p>{product.brands || 'מותג לא צוין'}</p>
      </Link>
    </article>
  )
}

export default ProductCard
