# Development Guide

Complete guide for developing and contributing to the Funiro project.

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Download Images

```bash
npm run download-images
```

This will download all product images to `public/images/`.

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Development

```bash
npm run dev          # Start Next.js development server
```

### Production

```bash
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality

```bash
npm run lint         # Lint and auto-fix code
npm run lint:check   # Check linting without fixing
npm run format       # Format code with Prettier
npm run format:check # Check formatting without fixing
```

### Utilities

```bash
npm run download-images  # Download product images from URLs
```

## Code Style

### ESLint Configuration

- **Style Guide**: Airbnb
- **React**: React 19 with JSX runtime
- **TypeScript**: Full TypeScript support
- **Prettier**: Integrated with ESLint
- **Import Sorting**: Simple import sort

### Prettier Configuration

- **Quotes**: Single quotes
- **Semicolons**: None
- **Tab Width**: 2 spaces
- **Line Width**: 100 characters
- **Trailing Commas**: ES5

### TypeScript

- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` for root imports
- **JSX**: React JSX mode
- **Target**: ES2020

## Project Conventions

### Component Structure

```typescript
'use client'  // If using hooks

import { ... } from '...'

interface ComponentProps {
  // Props definition
}

export default function Component({ props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Pages: `page.tsx` (Next.js convention)

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and types
5. Styles (if any)

### State Management

- Use Zustand for global state
- Use React useState for local state
- Persist important state to localStorage
- Keep stores focused and small

## Adding New Features

### Adding a New Product

1. Update `lib/data.ts` with product data
2. Add product images to `public/images/products/`
3. Product will appear automatically

### Adding a New Component

1. Create component in appropriate folder
2. Export from `index.ts` if needed
3. Add TypeScript types
4. Follow component structure conventions

### Adding a New Store

1. Create store in `store/` directory
2. Use Zustand with persist middleware
3. Define TypeScript interfaces
4. Export store hook

## Environment Variables

Create `.env.local` for environment-specific variables:

```env
# Add your environment variables here
```

## Troubleshooting

### Hydration Errors

- Ensure client components use `'use client'`
- Use `useEffect` for browser-only code
- Check for server/client mismatches

### Image Loading Issues

- Verify images exist in `public/images/`
- Check `next.config.js` for remote patterns
- Use `next/image` for optimization

### Type Errors

- Run `npm run lint` to check types
- Ensure all imports are typed
- Check `tsconfig.json` paths

## Best Practices

1. **Component Reusability**: Create reusable components
2. **Type Safety**: Always type props and state
3. **Performance**: Use `next/image` for images
4. **Accessibility**: Add ARIA labels and semantic HTML
5. **Error Handling**: Handle loading and error states
6. **Code Splitting**: Use dynamic imports for large components
7. **State Management**: Keep state close to where it's used

## Git Workflow

1. Create feature branch
2. Make changes
3. Run linting and formatting
4. Test thoroughly
5. Commit with descriptive messages
6. Push and create pull request

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Shadcn/ui](https://ui.shadcn.com/)

