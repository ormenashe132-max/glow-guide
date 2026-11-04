import type { Product } from '../types'

export const FREE_FROM_OPTIONS = [
  'ללא בישום',
  'ללא אלכוהול',
  'ללא פרבנים',
] as const

export type FreeFromOption = (typeof FREE_FROM_OPTIONS)[number]

export function isProductFreeFrom(
  product: Product,
  option: FreeFromOption,
): boolean {
  const ingredients = product.ingredients_text?.toLowerCase()

  if (!ingredients) {
    return false
  }

  switch (option) {
    case 'ללא בישום':
      return !ingredients.includes('parfum') && !ingredients.includes('fragrance')
    case 'ללא אלכוהול':
      return !ingredients.includes('alcohol denat')
    case 'ללא פרבנים':
      return !ingredients.includes('paraben')
  }
}

export function filterProductsByFreeFrom(
  products: Product[],
  selectedOptions: FreeFromOption[],
): Product[] {
  if (selectedOptions.length === 0) {
    return products
  }

  return products.filter((product) =>
    selectedOptions.every((option) => isProductFreeFrom(product, option)),
  )
}
