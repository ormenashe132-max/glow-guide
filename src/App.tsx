import sampleProducts from './data/sampleProducts.json'
import ProductList from './components/ProductList'

function App() {
  return <ProductList products={sampleProducts} />
}

export default App
