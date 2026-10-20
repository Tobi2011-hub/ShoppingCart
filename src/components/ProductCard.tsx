import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
}

// Compact catalog card linking to full details while keeping quick-add available.
export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className="category-pill">{product.category}</span>
        <Link
          className="product-image-link"
          to={`/products/${product.id}`}
          aria-label={`View details for ${product.title}`}
        >
          <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        </Link>
      </div>
      <div className="product-info">
        <p className="product-id">STYLE NO. {product.id}</p>
        <h3><Link className="product-title-link" to={`/products/${product.id}`}>{product.title}</Link></h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating" aria-label={`${product.rating.rate} out of 5 stars, ${product.rating.count} reviews`}>
          <span aria-hidden="true">★</span> {product.rating.rate.toFixed(1)}
          <span className="rating-count">({product.rating.count})</span>
        </div>
        <div className="product-card-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-card-actions">
            <Link className="details-link" to={`/products/${product.id}`}>Details</Link>
            <button
              className="button button-small"
              type="button"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
