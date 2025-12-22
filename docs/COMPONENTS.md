# Components Documentation

Detailed documentation of all components in the project.

## Layout Components

### Header

**Location**: `components/layout/Header.tsx`

**Features**:
- Sticky header with scroll effects
- Navigation links with smooth scrolling
- Search modal trigger
- Cart icon with badge
- Account and wishlist icons

**Props**: None

**Usage**:
```tsx
import Header from '@/components/layout/Header'

<Header />
```

### Footer

**Location**: `components/layout/Footer.tsx`

**Features**:
- Company information
- Navigation links
- Help links
- Newsletter subscription
- Copyright information

**Props**: None

### CartIcon

**Location**: `components/layout/CartIcon.tsx`

**Features**:
- Cart icon with item count badge
- Links to cart page
- Hydration-safe rendering
- Badge animation

**Props**: None

## UI Components

### Button

**Location**: `components/ui/Button.tsx`

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `children`: ReactNode
- Standard button HTML attributes

**Usage**:
```tsx
<Button variant="primary" size="lg">Click Me</Button>
```

### Avatar

**Location**: `components/ui/Avatar.tsx`

**Props**:
- `src`: string (optional) - Avatar image URL
- `name`: string - User name for fallback
- `size`: number (default: 48) - Avatar size in pixels
- `className`: string (optional)

**Features**:
- Automatic fallback to initials
- Color-coded avatars
- Image error handling

**Usage**:
```tsx
<Avatar src="/avatar.jpg" name="John Doe" size={48} />
```

### AnimatedSection

**Location**: `components/ui/AnimatedSection.tsx`

**Props**:
- `children`: ReactNode
- `className`: string (optional)
- `delay`: number (optional) - Animation delay

**Features**:
- Fade in and slide up animation
- Scroll-triggered
- Viewport detection

**Usage**:
```tsx
<AnimatedSection delay={0.2}>
  <div>Content</div>
</AnimatedSection>
```

### ProductCard

**Location**: `components/ui/ProductCard.tsx`

**Props**:
- `product`: Product - Product data
- `index`: number (optional) - For stagger animation

**Features**:
- Product image with badge
- Hover overlay with actions
- Product information
- Link to product detail page

## Product Components

### ProductImageGallery

**Location**: `components/product-detail/ProductImageGallery.tsx`

**Props**:
- `images`: string[] - Array of image URLs
- `productName`: string - Product name for alt text

**Features**:
- 5 thumbnail images
- Hover to change main image
- Click to select image
- Smooth transitions

### ProductInfo

**Location**: `components/product-detail/ProductInfo.tsx`

**Props**:
- `product`: Product - Product data

**Features**:
- Product name and description
- Price with discount
- Quantity selector
- Add to cart button
- Add to wishlist button

### ReviewsSection

**Location**: `components/product-detail/ReviewsSection.tsx`

**Props**:
- `product`: Product - Product data

**Features**:
- Display all reviews
- Average rating calculation
- Star rating display
- Add review form
- User avatars

### CommentsSection

**Location**: `components/product-detail/CommentsSection.tsx`

**Props**:
- `product`: Product - Product data

**Features**:
- Display all comments
- Add comment form
- Reply to comments
- Nested replies display
- User avatars

## Cart Components

### CartItem

**Location**: `components/cart/CartItem.tsx`

**Props**:
- `product`: Product & { quantity: number }

**Features**:
- Product image
- Product information
- Quantity controls
- Remove button
- Price calculation

### CartSummary

**Location**: `components/cart/CartSummary.tsx`

**Props**:
- `onCheckout`: () => void (optional)

**Features**:
- Order summary
- Subtotal, shipping, tax
- Total calculation
- Checkout button
- Continue shopping link

## Checkout Components

### ShippingForm

**Location**: `components/checkout/ShippingForm.tsx`

**Props**:
- `address`: ShippingAddress
- `onChange`: (address: ShippingAddress) => void

**Features**:
- Full address form
- Form validation
- Input formatting

### PaymentForm

**Location**: `components/checkout/PaymentForm.tsx`

**Props**:
- `paymentInfo`: PaymentInfo
- `onChange`: (info: PaymentInfo) => void

**Features**:
- Multiple payment methods
- Card number formatting
- CVV and expiry validation
- Payment method selection

## Search Components

### SearchModal

**Location**: `components/search/SearchModal.tsx`

**Props**:
- `isOpen`: boolean
- `onClose`: () => void

**Features**:
- Shadcn Dialog component
- Real-time search
- Product results
- Click to navigate
- Keyboard support (ESC)

## Component Patterns

### Animation Pattern

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### State Management Pattern

```tsx
import { useCartStore } from '@/store/useCartStore'

const items = useCartStore((state) => state.items)
const addItem = useCartStore((state) => state.addItem)
```

### Image Pattern

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

