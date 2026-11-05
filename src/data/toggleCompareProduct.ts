import type { Product } from '../types'

export const MAX_COMPARE_PRODUCTS = 3

export function toggleCompareProduct(
  products: Product[],
  product: Product,
): Product[] {
  const isInComparison = products.some((item) => item.code === product.code)

  if (isInComparison) {
    return products.filter((item) => item.code !== product.code)
  }

  if (products.length >= MAX_COMPARE_PRODUCTS) {
    return products
  }

  return [...products, product]
}
