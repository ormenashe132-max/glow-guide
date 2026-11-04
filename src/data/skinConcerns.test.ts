import { describe, expect, it } from 'vitest'
import {
  filterProductsBySkinConcern,
  getSkinConcernMatches,
  getSkinConcerns,
} from './skinConcerns'
import type { Product } from '../types'

const products: Product[] = [
  {
    code: '123',
    product_name: 'סרום לחות',
    image_front_url: 'https://example.com/serum.jpg',
    ingredients_text: 'Aqua, Hyaluronic Acid, Ceramide, Panthenol',
  },
  {
    code: '456',
    product_name: 'קרם לאקנה',
    image_front_url: 'https://example.com/cream.jpg',
    ingredients_text: 'Aqua, Salicylic Acid, Zinc, Niacinamide',
  },
  {
    code: '789',
    product_name: 'קרם פנים',
    image_front_url: 'https://example.com/face-cream.jpg',
  },
]

describe('getSkinConcernMatches', () => {
  it('מחזירה בעיות עור ואת הרכיבים המתאימים שנמצאו', () => {
    expect(getSkinConcernMatches(products[0])).toEqual([
      { concern: 'יובש', ingredients: ['hyaluronic', 'ceramide'] },
      { concern: 'רגישות', ingredients: ['panthenol'] },
    ])
  })

  it('מזהה רכיבים בלי תלות באותיות גדולות וקטנות', () => {
    expect(getSkinConcerns(products[1])).toEqual([
      'אקנה',
      'עור שמנוני',
      'כתמים',
    ])
  })

  it('מחזירה רשימה ריקה כשאין רשימת רכיבים', () => {
    expect(getSkinConcernMatches(products[2])).toEqual([])
  })
})

describe('filterProductsBySkinConcern', () => {
  it('מחזירה את כל המוצרים כשלא נבחרה בעיה', () => {
    expect(filterProductsBySkinConcern(products, null)).toEqual(products)
  })

  it('מחזירה רק מוצרים עם התאמה לבעיה שנבחרה', () => {
    expect(filterProductsBySkinConcern(products, 'אקנה')).toEqual([
      products[1],
    ])
  })
})
