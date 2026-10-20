import { Link } from 'react-router-dom'

// Shared footer keeps the storefront identity consistent across routes.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link className="brand footer-brand" to="/">
          capital<span>shop</span><i>.</i>
        </Link>
        <p>Good things, thoughtfully chosen.</p>
        <span>© {new Date().getFullYear()} Capital Shop</span>
      </div>
    </footer>
  )
}
