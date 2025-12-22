# Project Structure

Complete documentation of the project folder structure and organization.

## Directory Overview

```
funiro-landing/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── store/                 # Zustand state stores
├── lib/                   # Utilities and data
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── scripts/               # Utility scripts
└── docs/                  # Documentation
```

## App Directory (`app/`)

Next.js 16 App Router pages and layouts.

```
app/
├── layout.tsx             # Root layout with metadata
├── page.tsx               # Home page
├── globals.css            # Global styles and Tailwind
├── cart/
│   └── page.tsx           # Shopping cart page
├── checkout/
│   └── page.tsx           # Checkout page
├── order-success/
│   └── page.tsx           # Order confirmation page
└── products/
    └── [id]/
        └── page.tsx       # Dynamic product detail page
```

## Components Directory (`components/`)

All React components organized by feature.

### Layout Components (`components/layout/`)
- `Header.tsx` - Main navigation header
- `Footer.tsx` - Site footer
- `CartIcon.tsx` - Cart icon with badge

### Section Components (`components/sections/`)
- `HeroSection.tsx` - Hero banner section
- `BrowseRangeSection.tsx` - Category browsing
- `ProductsSection.tsx` - Product grid
- `InspirationSection.tsx` - Room inspiration
- `GallerySection.tsx` - Image gallery

### Product Components (`components/products/`)
- `ProductBadge.tsx` - New/Discount badge
- `ProductImage.tsx` - Product image with badge
- `ProductOverlay.tsx` - Hover overlay with actions
- `ProductInfo.tsx` - Product name, description, price
- `AddToCartButton.tsx` - Add to cart button
- `ShareButton.tsx` - Share product button
- `LikeButton.tsx` - Wishlist toggle button
- `CompareButton.tsx` - Compare product button

### Product Detail Components (`components/product-detail/`)
- `ProductImageGallery.tsx` - Image gallery with thumbnails
- `ProductInfo.tsx` - Product details and actions
- `VideoDemo.tsx` - Video embed section
- `ReviewsSection.tsx` - Reviews with ratings
- `CommentsSection.tsx` - Comments with replies

### Cart Components (`components/cart/`)
- `CartItem.tsx` - Individual cart item
- `CartSummary.tsx` - Order summary sidebar

### Checkout Components (`components/checkout/`)
- `ShippingForm.tsx` - Shipping address form
- `PaymentForm.tsx` - Payment method selection

### Search Components (`components/search/`)
- `SearchModal.tsx` - Search modal (Shadcn Dialog)

### UI Components (`components/ui/`)
- `AnimatedSection.tsx` - Reusable animated wrapper
- `Avatar.tsx` - Avatar component with fallback
- `Button.tsx` - Reusable button component
- `ProductCard.tsx` - Product card component
- `dialog.tsx` - Shadcn Dialog component

## Store Directory (`store/`)

Zustand state management stores.

```
store/
├── useCartStore.ts        # Shopping cart state
├── useWishlistStore.ts    # Wishlist state
├── useReviewStore.ts      # Reviews state
├── useCommentStore.ts     # Comments state
└── useOrderStore.ts       # Orders state
```

### Store Features
- All stores use `persist` middleware
- Data saved to localStorage
- Type-safe with TypeScript
- Reusable selectors

## Lib Directory (`lib/`)

Utilities, data, and helper functions.

```
lib/
├── data.ts                # Product, category, gallery data
├── mockData.ts            # Mock reviews and comments
├── utils.ts               # Main utilities (formatPrice, cn)
└── utils/
    ├── avatar.ts          # Avatar generation utilities
    ├── cn.ts              # Class name utility
    └── share.ts           # Share functionality
```

## Types Directory (`types/`)

TypeScript type definitions.

```
types/
├── product.ts             # Product interface
├── review.ts              # Review interface
├── comment.ts             # Comment interface
├── category.ts            # Category interface
├── gallery.ts             # Gallery interfaces
├── order.ts               # Order interfaces
└── index.ts               # Re-exports all types
```

## Public Directory (`public/`)

Static assets and images.

```
public/
└── images/
    ├── products/          # Product images
    ├── categories/        # Category images
    ├── gallery/           # Gallery images
    ├── inspiration/       # Inspiration room images
    └── hero/              # Hero background image
```

## Scripts Directory (`scripts/`)

Utility scripts.

```
scripts/
└── download-images.js     # Download images from URLs
```

## Configuration Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.js` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
- `components.json` - Shadcn/ui configuration

## Component Organization Principles

1. **Feature-based**: Components grouped by feature
2. **Reusability**: UI components are reusable
3. **Separation of Concerns**: Layout, sections, and UI separated
4. **Type Safety**: All components typed with TypeScript
5. **Single Responsibility**: Each component has one purpose

