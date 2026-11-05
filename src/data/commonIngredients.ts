import type { Product } from '../types'

function getNormalizedIngredients(product: Product): Set<string> {
  return new Set(
    (product.ingredients_text ?? '')
      .split(',')
      .map((ingredient) => ingredient.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function findCommonIngredients(products: Product[]): string[] {
  if (products.length < 2) {
    return []
  }

  const [firstProduct, ...otherProducts] = products
  let commonIngredients = getNormalizedIngredients(firstProduct)

  for (const product of otherProducts) {
    const ingredients = getNormalizedIngredients(product)
    commonIngredients = new Set(
      [...commonIngredients].filter((ingredient) => ingredients.has(ingredient)),
    )
  }

  return [...commonIngredients]
}
