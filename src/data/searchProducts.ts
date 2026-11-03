import type { Product } from '../types'

export function searchProducts(products: Product[], searchText: string): Product[] {
  const search = searchText.trim().toLowerCase()

  return products.filter((product) =>
    product.product_name.toLowerCase().includes(search),
  )
}
