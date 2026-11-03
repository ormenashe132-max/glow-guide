import { describe, expect, it } from 'vitest'
import { filterProducts } from './filterProducts'
import type { Product } from '../types'

const validProduct: Product = {
  code: '1234567890123',
  product_name: 'קרם לחות',
  brands: 'מותג לדוגמה',
  image_front_url: 'https://example.com/product.jpg',
  ingredients_text: 'Aqua, Glycerin',
}

describe('filterProducts', () => {
  it('משאירה מוצר תקין', () => {
    expect(filterProducts([validProduct])).toEqual([validProduct])
  })

  it('מסננת מוצר בלי שם', () => {
    expect(filterProducts([{ ...validProduct, product_name: '' }])).toEqual([])
  })

  it('מסננת מוצר בלי תמונה', () => {
    expect(filterProducts([{ ...validProduct, image_front_url: '' }])).toEqual([])
  })

  it('מסננת מוצר בלי רכיבים', () => {
    expect(filterProducts([{ ...validProduct, ingredients_text: '' }])).toEqual([])
  })
})
