import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
