import { describe, expect, it } from 'vitest'
import { toggleCompareProduct } from './toggleCompareProduct'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '1',
    product_name: 'מוצר ראשון',
    image_front_url: '',
    ingredients_text: 'Aqua, Glycerin',
  },
  {
    code: '2',
    product_name: 'מוצר שני',
    image_front_url: '',
    ingredients_text: 'Aqua, Niacinamide',
  },
  {
    code: '3',
    product_name: 'מוצר שלישי',
    image_front_url: '',
    ingredients_text: 'Aqua, Panthenol',
  },
  {
    code: '4',
    product_name: 'מוצר רביעי',
    image_front_url: '',
    ingredients_text: 'Aqua, Ceramide',
  },
]

describe('toggleCompareProduct', () => {
  it('מוסיפה מוצר שעדיין לא נמצא ברשימה', () => {
    expect(toggleCompareProduct([], products[0])).toEqual([products[0]])
  })

  it('מסירה מוצר שכבר נמצא ברשימה לפי code', () => {
    expect(toggleCompareProduct(products.slice(0, 2), products[0])).toEqual([
      products[1],
    ])
  })

  it('לא מוסיפה מוצר רביעי לרשימה', () => {
    const currentProducts = products.slice(0, 3)

    expect(toggleCompareProduct(currentProducts, products[3])).toBe(
      currentProducts,
    )
  })

  it('מאפשרת להסיר מוצר גם כשהרשימה מלאה', () => {
    expect(toggleCompareProduct(products.slice(0, 3), products[1])).toEqual([
      products[0],
      products[2],
    ])
  })
})
