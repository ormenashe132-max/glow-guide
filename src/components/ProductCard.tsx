import type { Product } from '../types'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import ProductImage from './ProductImage'
import { getSkinConcerns } from '../data/skinConcerns'

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
  const skinConcerns = getSkinConcerns(product).slice(0, 2)

  return (
    <article className="product-card">
      <FavoriteButton
        product={product}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />
      <Link to={`/items/${product.code}`}>
        <ProductImage
          imageUrl={product.image_front_url}
          alt={product.product_name}
        />
        <h2>{product.product_name}</h2>
        <p>{product.brands || 'מותג לא צוין'}</p>
        {skinConcerns.length > 0 && (
          <div className="product-card-concerns" aria-label="מתאים ל">
            {skinConcerns.map((concern) => (
              <span className="skin-concern-badge" key={concern}>
                {concern}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}

export default ProductCard
