import { describe, expect, it } from 'vitest'
import { findCommonIngredients } from './commonIngredients'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '1',
    product_name: 'מוצר ראשון',
    image_front_url: '',
    ingredients_text: 'Aqua, Glycerin, Niacinamide',
  },
  {
    code: '2',
    product_name: 'מוצר שני',
    image_front_url: '',
    ingredients_text: ' aqua , Panthenol, glycerin ',
  },
  {
    code: '3',
    product_name: 'מוצר שלישי',
    image_front_url: '',
    ingredients_text: 'Glycerin, Aqua',
  },
]

describe('findCommonIngredients', () => {
  it('מחזירה רכיבים שמופיעים בכל המוצרים אחרי נרמול', () => {
    expect(findCommonIngredients(products)).toEqual(['aqua', 'glycerin'])
  })

  it('מחזירה רשימה ריקה כשאין רכיבים משותפים', () => {
    expect(
      findCommonIngredients([
        products[0],
        { ...products[1], ingredients_text: 'Panthenol, Ceramide' },
      ]),
    ).toEqual([])
  })

  it('מחזירה רשימה ריקה כשיש פחות משני מוצרים', () => {
    expect(findCommonIngredients(products.slice(0, 1))).toEqual([])
    expect(findCommonIngredients([])).toEqual([])
  })
})
