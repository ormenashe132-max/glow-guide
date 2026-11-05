import {
  FREE_FROM_OPTIONS,
  isProductFreeFrom,
} from '../data/freeFrom'
import { getSkinConcerns } from '../data/skinConcerns'
import type { Product } from '../types'
import ProductImage from './ProductImage'
import './CompareTable.css'

type CompareTableProps = {
  products: Product[]
  onRemove: (product: Product) => void
}

function getIngredientCount(product: Product): number {
  return (product.ingredients_text ?? '')
    .split(',')
    .map((ingredient) => ingredient.trim())
    .filter(Boolean).length
}

function CompareTable({ products, onRemove }: CompareTableProps) {
  return (
    <div className="compare-table-scroll">
      <table className="compare-table">
        <caption className="visually-hidden">השוואת מוצרים</caption>
        <thead>
          <tr>
            <th scope="col">מאפיין</th>
            {products.map((product, index) => (
              <th scope="col" key={product.code}>
                מוצר {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">תמונה</th>
            {products.map((product) => (
              <td key={product.code}>
                <ProductImage
                  imageUrl={product.image_front_url}
                  alt={product.product_name}
                />
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">שם</th>
            {products.map((product) => (
              <td key={product.code}>{product.product_name}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">מותג</th>
            {products.map((product) => (
              <td key={product.code}>{product.brands || 'מותג לא צוין'}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">מספר רכיבים</th>
            {products.map((product) => (
              <td key={product.code}>{getIngredientCount(product)}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">בעיות עור מתאימות</th>
            {products.map((product) => {
              const concerns = getSkinConcerns(product)

              return (
                <td key={product.code}>
                  {concerns.length > 0 ? concerns.join(', ') : 'לא נמצאו'}
                </td>
              )
            })}
          </tr>
          <tr>
            <th scope="row">נקי מ...</th>
            {products.map((product) => {
              const freeFromOptions = FREE_FROM_OPTIONS.filter((option) =>
                isProductFreeFrom(product, option),
              )

              return (
                <td key={product.code}>
                  {freeFromOptions.length > 0
                    ? freeFromOptions.join(', ')
                    : 'לא זוהו'}
                </td>
              )
            })}
          </tr>
          <tr>
            <th scope="row">פעולה</th>
            {products.map((product) => (
              <td key={product.code}>
                <button
                  className="compare-remove-button"
                  type="button"
                  onClick={() => onRemove(product)}
                >
                  הסר
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable
