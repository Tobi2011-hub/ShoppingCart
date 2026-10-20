import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export default function Navbar() {
  // Count units, rather than distinct products, to match the bag contents.
  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Free shipping on orders over $75</span>
          <span className="top-strip-note">Thoughtful finds, everyday style.</span>
        </div>
      </div>
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="Capital home">
          capital<span>shop</span><i>.</i>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
        <Link className="cart-link" to="/cart" aria-label={`Shopping bag, ${itemCount} items`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
          <span className="cart-label">Bag</span>
          <span className="cart-count">{itemCount}</span>
        </Link>
      </div>
    </header>
  )
}
