import { describe, expect, it } from 'vitest'
import { searchByIngredient } from './searchByIngredient'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '123',
    product_name: 'קרם לחות',
    image_front_url: 'https://example.com/cream.jpg',
    ingredients_text: 'Aqua, Niacinamide, Glycerin',
  },
  {
    code: '456',
    product_name: 'קרם פנים',
    image_front_url: 'https://example.com/face-cream.jpg',
    ingredients_text: 'Aqua, Glycerin',
  },
]

describe('searchByIngredient', () => {
  it('מחזירה מוצרים שמכילים את הרכיב', () => {
    expect(searchByIngredient(products, 'Glycerin')).toEqual(products)
  })

  it('מחזירה אותן תוצאות ל-Niacinamide ול-niacinamide', () => {
    expect(searchByIngredient(products, 'Niacinamide')).toEqual(
      searchByIngredient(products, 'niacinamide'),
    )
  })

  it('מחזירה רשימה ריקה כשהרכיב לא נמצא', () => {
    expect(searchByIngredient(products, 'Retinol')).toEqual([])
  })
})
