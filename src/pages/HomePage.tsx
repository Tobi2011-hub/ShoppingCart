import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

// The landing page pairs a collection call to action with a small featured selection.
export default function HomePage() {
  const { products, loading, error } = useProducts()

  return (
    <>
      <section className="home-hero">
        <div className="container hero-content">
          <p className="eyebrow">THE NEW SEASON, MADE SIMPLE</p>
          <h1>Find your kind<br />of <em>everyday.</em></h1>
          <p className="hero-copy">
            A considered collection of pieces for wherever the day takes you.
          </p>
          <Link className="button" to="/products">
            Shop the collection <span aria-hidden="true">→</span>
          </Link>
          <div className="hero-note">
            <span className="hero-note-line" />
            <span>Curated with care. Worn on repeat.</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-disc">C<br />S</div>
          <span className="hero-side-label">OBJECTS FOR EVERY DAY — 2026</span>
        </div>
      </section>

      <section className="container featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW GOOD THINGS</p>
            <h2>Picked for you</h2>
          </div>
          <Link className="text-link" to="/products">
            View all products <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {loading && <p className="status-message">Finding the good stuff…</p>}
        {error && <p className="status-message error-message">{error}</p>}
        {!loading && !error && (
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
