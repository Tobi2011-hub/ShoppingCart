# Capital Shop

A simple, responsive storefront built with React, TypeScript, Redux Toolkit, and React Router. Product data comes from the [Fake Store API](https://fakestoreapi.com/).

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build, run `npm run build` and then `npm run preview`.

## Features

- Home page with featured products and a collection call to action.
- Product catalog with category filters, search, ratings, and add-to-bag actions.
- Product detail pages with full descriptions, ratings, categories, product IDs, and add-to-bag actions.
- Cart with quantity controls, item removal, clear bag, subtotal, estimated tax, and shipping.
- Responsive styling inspired by Capital Shop.

## Project structure

- `src/app/` — configured Redux store and typed hooks.
- `src/features/cart/cartSlice.ts` — cart actions and state.
- `src/types/` — product and cart item types.
- `src/hooks/useProducts.ts` — product fetching and API response validation.
- `src/components/` — shared navigation, product card, and footer.
- `src/pages/` — home, product catalog, and cart pages.

Shipping is free on orders of $75 or more; otherwise it is $5.95. The cart estimates tax at 8%. Checkout is a presentation-only placeholder; no payment is processed.
