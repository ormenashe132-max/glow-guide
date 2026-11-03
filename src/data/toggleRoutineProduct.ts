import type { Product } from '../types'

export function toggleRoutineProduct(
  products: Product[],
  product: Product,
): Product[] {
  const isInRoutine = products.some((item) => item.code === product.code)

  if (isInRoutine) {
    return products.filter((item) => item.code !== product.code)
  }

  return [...products, product]
}
