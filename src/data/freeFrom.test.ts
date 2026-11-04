import { describe, expect, it } from 'vitest'
import {
  filterProductsByFreeFrom,
  isProductFreeFrom,
} from './freeFrom'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '123',
    product_name: 'קרם ללא בישום',
    image_front_url: 'https://example.com/cream.jpg',
    ingredients_text: 'Aqua, Glycerin, Cetyl Alcohol',
  },
  {
    code: '456',
    product_name: 'קרם מבושם',
    image_front_url: 'https://example.com/perfumed.jpg',
    ingredients_text: 'Aqua, Parfum, Alcohol Denat, Methylparaben',
  },
  {
    code: '789',
    product_name: 'קרם עם fragrance',
    image_front_url: 'https://example.com/fragrance.jpg',
    ingredients_text: 'Aqua, FRAGRANCE, Cetyl Alcohol',
  },
]

describe('isProductFreeFrom', () => {
  it('מזהה שמוצר ללא parfum וללא fragrance נקי מבישום', () => {
    expect(isProductFreeFrom(products[0], 'ללא בישום')).toBe(true)
    expect(isProductFreeFrom(products[1], 'ללא בישום')).toBe(false)
    expect(isProductFreeFrom(products[2], 'ללא בישום')).toBe(false)
  })

  it('בודקת alcohol denat ולא פוסלת cetyl alcohol', () => {
    expect(isProductFreeFrom(products[0], 'ללא אלכוהול')).toBe(true)
    expect(isProductFreeFrom(products[1], 'ללא אלכוהול')).toBe(false)
  })

  it('מזהה paraben בלי תלות באותיות גדולות וקטנות', () => {
    expect(isProductFreeFrom(products[0], 'ללא פרבנים')).toBe(true)
    expect(isProductFreeFrom(products[1], 'ללא פרבנים')).toBe(false)
  })

  it('לא מסמנת מוצר בלי רשימת רכיבים כנקי', () => {
    const productWithoutIngredients: Product = {
      code: '000',
      product_name: 'מוצר ללא מידע',
      image_front_url: 'https://example.com/unknown.jpg',
    }

    expect(isProductFreeFrom(productWithoutIngredients, 'ללא פרבנים')).toBe(
      false,
    )
  })
})

describe('filterProductsByFreeFrom', () => {
  it('מחזירה את כל המוצרים כשלא נבחר סינון', () => {
    expect(filterProductsByFreeFrom(products, [])).toEqual(products)
  })

  it('מסננת מוצרים לפי כל האפשרויות שנבחרו', () => {
    expect(
      filterProductsByFreeFrom(products, ['ללא בישום', 'ללא פרבנים']),
    ).toEqual([products[0]])
  })
})
