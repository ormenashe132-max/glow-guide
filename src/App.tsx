import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { toggleCompareProduct } from './data/toggleCompareProduct'
import useRoutine from './hooks/useRoutine'
import ComparePage from './pages/ComparePage'
import HomePage from './pages/HomePage'
import IngredientsPage from './pages/IngredientsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import RoutinePage from './pages/RoutinePage'
import type { Product } from './types'

function App() {
  const { routineProducts, toggleProduct } = useRoutine()
  const [compareProducts, setCompareProducts] = useState<Product[]>([])

  function toggleComparedProduct(product: Product) {
    setCompareProducts((currentProducts) =>
      toggleCompareProduct(currentProducts, product),
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              routineProducts={routineProducts}
              onToggleFavorite={toggleProduct}
            />
          }
        />
        <Route
          path="/items/:id"
          element={
            <ProductDetailsPage
              routineProducts={routineProducts}
              onToggleFavorite={toggleProduct}
              compareProducts={compareProducts}
              onToggleCompare={toggleComparedProduct}
            />
          }
        />
        <Route
          path="/routine"
          element={
            <RoutinePage
              routineProducts={routineProducts}
              onToggleFavorite={toggleProduct}
            />
          }
        />
        <Route
          path="/compare"
          element={
            <ComparePage
              compareProducts={compareProducts}
              onRemoveCompareProduct={toggleComparedProduct}
            />
          }
        />
        <Route
          path="/ingredients"
          element={
            <IngredientsPage
              routineProducts={routineProducts}
              onToggleFavorite={toggleProduct}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
