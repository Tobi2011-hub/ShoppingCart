// Product fields returned by Fake Store API and used throughout the storefront.
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// A cart line pairs a product with the chosen quantity.
export interface CartItem {
  product: Product
  quantity: number
}
