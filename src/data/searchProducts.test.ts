import { describe, expect, it } from 'vitest'
import { searchProducts } from './searchProducts'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '123',
    product_name: 'קרם לחות',
    image_front_url: 'https://example.com/cream.jpg',
    ingredients_text: 'Aqua, Glycerin',
  },
  {
    code: '456',
    product_name: 'Face Moisturizer',
    image_front_url: 'https://example.com/moisturizer.jpg',
    ingredients_text: 'Aqua, Niacinamide',
  },
]

describe('searchProducts', () => {
  it('מחזירה מוצרים שהשם שלהם מכיל את הטקסט', () => {
    expect(searchProducts(products, 'קרם')).toEqual([products[0]])
  })

  it('מחפשת בלי תלות באותיות גדולות וקטנות', () => {
    expect(searchProducts(products, 'FACE')).toEqual([products[1]])
  })

  it('מחזירה רשימה ריקה כשאין התאמות', () => {
    expect(searchProducts(products, 'סרום')).toEqual([])
  })
})
