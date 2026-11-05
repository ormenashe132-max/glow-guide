import type { Product } from '../types'

export type RoutineConflict = {
  firstProductName: string
  secondProductName: string
  explanation: string
}

export type RoutineConflictRule = {
  ingredientGroups: [string[], string[]]
  explanation: string
}

export const ROUTINE_CONFLICT_RULES: RoutineConflictRule[] = [
  {
    ingredientGroups: [
      ['retinol', 'retinyl', 'retinal'],
      ['ascorbic'],
    ],
    explanation: 'עדיף לא לשלב באותו זמן: רטינול בערב, ויטמין C בבוקר.',
  },
  {
    ingredientGroups: [
      ['retinol', 'retinyl', 'retinal'],
      ['glycolic acid', 'lactic acid', 'salicylic acid'],
    ],
    explanation:
      'השילוב עלול לגרום לגירוי ויובש. עדיף להשתמש בהם בימים שונים.',
  },
  {
    ingredientGroups: [
      ['benzoyl peroxide'],
      ['retinol', 'retinyl', 'retinal'],
    ],
    explanation: 'השילוב עלול לגרום לגירוי ולהחליש את הרטינול.',
  },
]

function matchesIngredientGroup(
  ingredients: string,
  ingredientGroup: string[],
): boolean {
  return ingredientGroup.some((ingredient) => ingredients.includes(ingredient))
}

export function findRoutineConflicts(products: Product[]): RoutineConflict[] {
  const conflicts: RoutineConflict[] = []

  for (let firstIndex = 0; firstIndex < products.length; firstIndex += 1) {
    const firstProduct = products[firstIndex]
    const firstIngredients = firstProduct.ingredients_text?.toLowerCase() ?? ''

    for (
      let secondIndex = firstIndex + 1;
      secondIndex < products.length;
      secondIndex += 1
    ) {
      const secondProduct = products[secondIndex]
      const secondIngredients =
        secondProduct.ingredients_text?.toLowerCase() ?? ''

      for (const rule of ROUTINE_CONFLICT_RULES) {
        const [firstGroup, secondGroup] = rule.ingredientGroups
        const matchesInEitherOrder =
          (matchesIngredientGroup(firstIngredients, firstGroup) &&
            matchesIngredientGroup(secondIngredients, secondGroup)) ||
          (matchesIngredientGroup(firstIngredients, secondGroup) &&
            matchesIngredientGroup(secondIngredients, firstGroup))

        if (matchesInEitherOrder) {
          conflicts.push({
            firstProductName: firstProduct.product_name,
            secondProductName: secondProduct.product_name,
            explanation: rule.explanation,
          })
        }
      }
    }
  }

  return conflicts
}
