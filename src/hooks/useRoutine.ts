import { useEffect, useState } from 'react'
import { toggleRoutineProduct } from '../data/toggleRoutineProduct'
import type { Product } from '../types'

const ROUTINE_STORAGE_KEY = 'glow-guide-routine'

function useRoutine() {
  const [routineProducts, setRoutineProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem(ROUTINE_STORAGE_KEY)
    return savedProducts ? (JSON.parse(savedProducts) as Product[]) : []
  })

  useEffect(() => {
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routineProducts))
  }, [routineProducts])

  function toggleProduct(product: Product) {
    setRoutineProducts((currentProducts) =>
      toggleRoutineProduct(currentProducts, product),
    )
  }

  return { routineProducts, toggleProduct }
}

export default useRoutine
