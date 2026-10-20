import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// Cart totals are calculated from current Redux state so they update with each change.
export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 5.95
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <main className="container page-content cart-page">
        <div className="page-heading">
          <p className="eyebrow">YOUR BAG</p>
          <h1>A little room for something good.</h1>
          <p>Your bag is waiting for a few of your favorite things.</p>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon" aria-hidden="true">♡</div>
          <h2>Your bag is empty</h2>
          <p>Take a look around and find something you love.</p>
          <Link className="button" to="/products">Explore the collection</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container page-content cart-page">
      <div className="page-heading cart-heading">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Good choices.</h1>
        <p>{items.reduce((sum, item) => sum + item.quantity, 0)} items, and counting.</p>
      </div>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Items in your bag">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <div className="cart-item-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="cart-item-details">
                <p className="product-id">{product.category}</p>
                <h2>{product.title}</h2>
                <p className="cart-item-price">{money.format(product.price)}</p>
                <div className="cart-item-actions">
                  <div className="quantity-control" aria-label={`Quantity for ${product.title}`}>
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      type="button"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => dispatch(increaseQuantity(product.id))}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(removeFromCart(product.id))}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <strong className="cart-line-total">
                {money.format(product.price * quantity)}
              </strong>
            </article>
          ))}
          <button className="text-link clear-cart" onClick={() => dispatch(clearCart())} type="button">
            Clear bag
          </button>
        </section>

        <aside className="order-summary">
          <h2>Your summary</h2>
          <div className="summary-row">
            <span>Subtotal</span><span>{money.format(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : money.format(shipping)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated tax (8%)</span><span>{money.format(tax)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span><strong>{money.format(total)}</strong>
          </div>
          {subtotal > 0 && subtotal < 75 && (
            <p className="shipping-note">You’re {money.format(75 - subtotal)} away from free shipping.</p>
          )}
          <button className="button checkout-button" type="button" onClick={() => window.alert('Thanks for shopping with Capital Shop! Checkout is coming soon.')}>
            Continue to checkout <span aria-hidden="true">→</span>
          </button>
          <Link className="continue-shopping" to="/products">Continue shopping</Link>
        </aside>
      </div>
    </main>
  )
}
