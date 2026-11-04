import type { Product } from '../types'

export const SKIN_CONCERNS = [
  'יובש',
  'אקנה',
  'עור שמנוני',
  "אנטי-אייג'ינג",
  'כתמים',
  'רגישות',
] as const

export type SkinConcern = (typeof SKIN_CONCERNS)[number]

const concernIngredients: Record<SkinConcern, string[]> = {
  יובש: ['hyaluronic', 'hyaluronate', 'ceramide', 'squalane', 'butyrospermum'],
  אקנה: ['salicylic acid', 'zinc', 'melaleuca', 'azelaic'],
  'עור שמנוני': ['niacinamide', 'zinc', 'kaolin', 'salicylic acid'],
  "אנטי-אייג'ינג": ['retinol', 'retinyl', 'peptide', 'bakuchiol', 'adenosine'],
  כתמים: ['ascorbic', 'niacinamide', 'glycyrrhiza', 'arbutin', 'azelaic'],
  רגישות: ['panthenol', 'allantoin', 'centella', 'bisabolol', 'aloe'],
}

export type SkinConcernMatch = {
  concern: SkinConcern
  ingredients: string[]
}

export function getSkinConcernMatches(product: Product): SkinConcernMatch[] {
  const ingredients = product.ingredients_text?.toLowerCase()

  if (!ingredients) {
    return []
  }

  return SKIN_CONCERNS.flatMap((concern) => {
    const matchedIngredients = concernIngredients[concern].filter((ingredient) =>
      ingredients.includes(ingredient),
    )

    return matchedIngredients.length > 0
      ? [{ concern, ingredients: matchedIngredients }]
      : []
  })
}

export function getSkinConcerns(product: Product): SkinConcern[] {
  return getSkinConcernMatches(product).map(({ concern }) => concern)
}

export function filterProductsBySkinConcern(
  products: Product[],
  selectedConcern: SkinConcern | null,
): Product[] {
  if (!selectedConcern) {
    return products
  }

  return products.filter((product) =>
    getSkinConcerns(product).includes(selectedConcern),
  )
}
