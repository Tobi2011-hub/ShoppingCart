import { useEffect, useState } from 'react'
import type { Product } from '../types/product'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

// Validate external JSON before treating it as a typed product.
function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  const product = value as Record<string, unknown>
  const rating = product.rating
  return (
    typeof product.id === 'number' &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    typeof product.description === 'string' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string' &&
    typeof rating === 'object' &&
    rating !== null &&
    typeof (rating as Record<string, unknown>).rate === 'number' &&
    typeof (rating as Record<string, unknown>).count === 'number'
  )
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Abort an in-flight request if the page using this hook unmounts.
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Product request failed (${response.status})`)
        }

        const data: unknown = await response.json()
        if (!Array.isArray(data) || !data.every(isProduct)) {
          throw new Error('The product service returned invalid data.')
        }

        setState({ products: data, loading: false, error: null })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return

        setState({
          products: [],
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Unable to load products. Please try again.',
        })
      }
    }

    void loadProducts()
    return () => controller.abort()
  }, [])

  return state
}
