import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

// Catalog filters are derived from the fetched data and applied together.
export default function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('featured')

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products],
  )
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matchingProducts = products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        (!query ||
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)),
    )

    if (sortOrder === 'rating-high') {
      return [...matchingProducts].sort((a, b) => b.rating.rate - a.rating.rate)
    }
    if (sortOrder === 'rating-low') {
      return [...matchingProducts].sort((a, b) => a.rating.rate - b.rating.rate)
    }
    return matchingProducts
  }, [category, products, search, sortOrder])

  return (
    <main className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">THE COLLECTION</p>
        <h1>All the good things.</h1>
        <p>Little upgrades for your wardrobe, your space, and every day in between.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="category-tabs" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              className={category === item ? 'category-tab active' : 'category-tab'}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-controls">
          <label className="sort-field">
            <span>Sort by</span>
            <select onChange={(event) => setSortOrder(event.target.value)} value={sortOrder}>
              <option value="featured">Featured</option>
              <option value="rating-high">Highest rated</option>
              <option value="rating-low">Lowest rated</option>
            </select>
          </label>
          <label className="search-field">
            <span className="visually-hidden">Search products</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search pieces"
              type="search"
              value={search}
            />
          </label>
        </div>
      </div>

      {loading && <p className="status-message">Loading the collection…</p>}
      {error && (
        <div className="status-panel">
          <p className="error-message">{error}</p>
          <button className="button button-outline" onClick={() => window.location.reload()} type="button">
            Try again
          </button>
        </div>
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="status-message">No pieces found. Try another search or category.</p>
      )}
    </main>
  )
}
