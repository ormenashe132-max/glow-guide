import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import useRoutine from './hooks/useRoutine'
import HomePage from './pages/HomePage'
import IngredientsPage from './pages/IngredientsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import RoutinePage from './pages/RoutinePage'

function App() {
  const { routineProducts, toggleProduct } = useRoutine()

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
