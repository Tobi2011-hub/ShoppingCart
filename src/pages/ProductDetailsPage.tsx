import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { useProducts } from '../hooks/useProducts'

// Resolve the route ID against the product list and handle loading or missing items.
export default function ProductDetailsPage() {
  const { id } = useParams()
  const { products, loading, error } = useProducts()
  const dispatch = useAppDispatch()
  const product = products.find((item) => item.id === Number(id))

  if (loading) {
    return <main className="container page-content"><p className="status-message">Loading product details…</p></main>
  }

  if (error) {
    return (
      <main className="container page-content">
        <div className="status-panel">
          <p className="error-message">{error}</p>
          <Link className="button button-outline" to="/products">Back to products</Link>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="container page-content">
        <div className="status-panel">
          <p className="status-message">We couldn’t find that product.</p>
          <Link className="button button-outline" to="/products">Back to products</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container page-content detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/products">Products</Link><span>/</span>
        <span>{product.category}</span>
      </nav>
      <section className="product-detail">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.title} />
          <span className="detail-category">{product.category}</span>
        </div>
        <div className="detail-content">
          <p className="eyebrow">STYLE NO. {product.id}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating" aria-label={`${product.rating.rate} out of 5 stars, ${product.rating.count} reviews`}>
            <span aria-hidden="true">★</span> {product.rating.rate.toFixed(1)}
            <span> · {product.rating.count} reviews</span>
          </div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <div className="detail-divider" />
          <h2>About this piece</h2>
          <p className="detail-description">{product.description}</p>
          <dl className="detail-facts">
            <div><dt>Category</dt><dd>{product.category}</dd></div>
            <div><dt>Product ID</dt><dd>{product.id}</dd></div>
            <div><dt>Customer rating</dt><dd>{product.rating.rate.toFixed(1)} / 5 ({product.rating.count} reviews)</dd></div>
          </dl>
          <button className="button detail-add-button" type="button" onClick={() => dispatch(addToCart(product))}>
            Add to bag <span aria-hidden="true">→</span>
          </button>
          <Link className="continue-shopping detail-back-link" to="/products">Back to the collection</Link>
        </div>
      </section>
    </main>
  )
}
