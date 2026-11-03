import type { Product } from '../types'

export function filterProducts(products: Product[]): Product[] {
  return products.filter(
    (product) =>
      Boolean(product.product_name?.trim()) &&
      Boolean(product.image_front_url?.trim()) &&
      Boolean(product.ingredients_text?.trim()),
  )
}
