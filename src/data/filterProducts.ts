import type { Product } from '../types'

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === 'object' && value !== null) {
    return value as Record<string, unknown>
  }

  return null
}

export function filterProducts(products: unknown[]): Product[] {
  return products.flatMap((value) => {
    const product = asRecord(value)
    if (
      !product ||
      typeof product.code !== 'string' ||
      typeof product.product_name !== 'string' ||
      product.product_name.trim().length === 0 ||
      typeof product.image_front_url !== 'string' ||
      product.image_front_url.trim().length === 0
    ) {
      return []
    }

    return [
      {
        code: product.code,
        product_name: product.product_name,
        brands: typeof product.brands === 'string' ? product.brands : undefined,
        image_front_url: product.image_front_url,
        ingredients_text:
          typeof product.ingredients_text === 'string'
            ? product.ingredients_text
            : undefined,
      },
    ]
  })
}
