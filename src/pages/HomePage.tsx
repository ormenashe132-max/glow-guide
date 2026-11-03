import ProductList from '../components/ProductList'
import sampleProducts from '../data/sampleProducts.json'

function HomePage() {
  return (
    <main>
      <h1>מוצרי טיפוח</h1>
      <ProductList products={sampleProducts} />
    </main>
  )
}

export default HomePage
