import { Link, useParams } from 'react-router-dom'
import sampleProducts from '../data/sampleProducts.json'

function ProductDetailsPage() {
  const { id } = useParams()
  const product = sampleProducts.find((item) => item.code === id)

  if (!product) {
    return (
      <main>
        <p>המוצר לא נמצא.</p>
        <Link to="/">חזרה לרשימת המוצרים</Link>
      </main>
    )
  }

  return (
    <main>
      <Link to="/">חזרה לרשימת המוצרים</Link>
      <article>
        <img src={product.image_front_url} alt={product.product_name} />
        <h1>{product.product_name}</h1>
        <p>{product.brands}</p>
      </article>
    </main>
  )
}

export default ProductDetailsPage
