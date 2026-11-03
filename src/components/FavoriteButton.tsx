import type { Product } from '../types'

type FavoriteButtonProps = {
  product: Product
  isFavorite: boolean
  onToggle: (product: Product) => void
}

function FavoriteButton({
  product,
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className="favorite-button"
      aria-label={isFavorite ? 'הסירי מהשגרה שלי' : 'הוסיפי לשגרה שלי'}
      aria-pressed={isFavorite}
      data-favorite={isFavorite}
      onClick={() => onToggle(product)}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}

export default FavoriteButton
