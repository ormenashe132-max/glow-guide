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
      aria-label={isFavorite ? 'הסירי מהשגרה שלי' : 'הוסיפי לשגרה שלי'}
      aria-pressed={isFavorite}
      onClick={() => onToggle(product)}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}

export default FavoriteButton
