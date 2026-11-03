import { describe, expect, it } from 'vitest'
import { toggleRoutineProduct } from './toggleRoutineProduct'
import type { Product } from '../types'

const product: Product = {
  code: '123',
  product_name: 'קרם לחות',
  image_front_url: 'https://example.com/cream.jpg',
  ingredients_text: 'Aqua, Glycerin',
}

describe('toggleRoutineProduct', () => {
  it('מוסיפה מוצר שלא נמצא ברשימה', () => {
    expect(toggleRoutineProduct([], product)).toEqual([product])
  })

  it('מסירה מוצר שכבר נמצא ברשימה', () => {
    expect(toggleRoutineProduct([product], product)).toEqual([])
  })
})
