import { describe, expect, it } from 'vitest'
import { findRoutineConflicts } from './routineConflicts'
import type { Product } from '../types'

const retinolProduct: Product = {
  code: 'retinol',
  product_name: 'סרום רטינול',
  image_front_url: '',
  ingredients_text: 'Aqua, Retinol',
}

const vitaminCProduct: Product = {
  code: 'vitamin-c',
  product_name: 'סרום ויטמין C',
  image_front_url: '',
  ingredients_text: 'Aqua, Ascorbic Acid',
}

describe('findRoutineConflicts', () => {
  it('מחזירה רשימה ריקה כשאין התנגשות בין המוצרים', () => {
    const products: Product[] = [
      { ...retinolProduct, ingredients_text: 'Aqua, Glycerin' },
      vitaminCProduct,
    ]

    expect(findRoutineConflicts(products)).toEqual([])
  })

  it('מזהה התנגשות בין רטינול לוויטמין C', () => {
    const conflicts = findRoutineConflicts([retinolProduct, vitaminCProduct])

    expect(conflicts).toEqual([
      {
        firstProductName: 'סרום רטינול',
        secondProductName: 'סרום ויטמין C',
        explanation:
          'עדיף לא לשלב באותו זמן: רטינול בערב, ויטמין C בבוקר.',
      },
    ])
  })

  it('מזהה התנגשות גם כשהמוצרים נמצאים בסדר הפוך', () => {
    const benzoylPeroxideProduct: Product = {
      code: 'benzoyl-peroxide',
      product_name: 'תכשיר בנזואיל פרוקסיד',
      image_front_url: '',
      ingredients_text: 'Aqua, Benzoyl Peroxide',
    }

    expect(
      findRoutineConflicts([retinolProduct, benzoylPeroxideProduct]),
    ).toEqual([
      {
        firstProductName: 'סרום רטינול',
        secondProductName: 'תכשיר בנזואיל פרוקסיד',
        explanation: 'השילוב עלול לגרום לגירוי ולהחליש את הרטינול.',
      },
    ])
  })

  it('מחזירה רשימה ריקה כשאין מוצרים בשגרה', () => {
    expect(findRoutineConflicts([])).toEqual([])
  })

  it('בודקת רכיבים ללא תלות באותיות גדולות וקטנות', () => {
    const products = [
      { ...retinolProduct, ingredients_text: 'Aqua, RETINYL PALMITATE' },
      vitaminCProduct,
    ]

    expect(findRoutineConflicts(products)).toHaveLength(1)
  })
})
