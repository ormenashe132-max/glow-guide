import type { Product } from '../types'

export function searchByIngredient(
  products: Product[],
  searchText: string,
): Product[] {
  const search = searchText.trim().toLowerCase()

  return products.filter((product) =>
    product.ingredients_text?.toLowerCase().includes(search),
  )
}
