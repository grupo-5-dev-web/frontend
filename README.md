# Resource Management System

A resource management system built with Next.js, React, and TypeScript. This application provides a comprehensive interface for managing users and resources with authentication and a clean UI.

## 🚀 Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router for server-side rendering and routing
- **[React 19](https://react.dev/)** - UI library for building user interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript for better development experience

### UI Components & Styling

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives:
  - `@radix-ui/react-avatar` - Avatar component
  - `@radix-ui/react-dialog` - Modal/dialog component
  - `@radix-ui/react-label` - Form label component
  - `@radix-ui/react-select` - Select dropdown component
  - `@radix-ui/react-slot` - Slot component for component composition
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utility functions for conditional and merged class names

### Data & State Management

- **[Axios](https://axios-http.com/)** - HTTP client for API requests
- **[js-cookie](https://github.com/js-cookie/js-cookie)** - Client-side cookie management for authentication

### Testing

- **[Jest 30](https://jestjs.io/)** - JavaScript testing framework
- **[Testing Library](https://testing-library.com/)** - React component testing utilities:
  - `@testing-library/react` - React component testing
  - `@testing-library/jest-dom` - Custom Jest matchers for DOM
  - `@testing-library/dom` - DOM testing utilities
- **jest-environment-jsdom** - Browser-like environment for testing

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting with Next.js configuration
- **[cross-env](https://github.com/kentcdodds/cross-env)** - Cross-platform environment variables
- **[ts-node](https://typestrong.org/ts-node/)** - TypeScript execution engine

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/            # Dashboard page (home)
│   │   │   ├── layout.tsx        # Dashboard layout
│   │   │   └── page.tsx          # Dashboard page component
│   │   ├── login/                # Login page
│   │   │   ├── layout.tsx        # Login layout
│   │   │   └── page.tsx          # Login page component
│   │   ├── register/             # User registration page
│   │   │   ├── layout.tsx        # Register layout
│   │   │   └── page.tsx          # Register page component
│   │   └── users/                # User management page
│   │       ├── layout.tsx        # Users layout
│   │       └── page.tsx          # Users page component
│   │
│   ├── components/               # Reusable components
│   │   ├── custom/               # Custom business logic components
│   │   │   ├── AddResourceModal.tsx  # Modal for adding resources
│   │   │   └── AddUserModal.tsx      # Modal for adding users
│   │   ├── ui/                   # Reusable UI components (Radix-based)
│   │   │   ├── avatar.tsx        # Avatar component
│   │   │   ├── badge.tsx         # Badge component
│   │   │   ├── button.tsx        # Button component
│   │   │   ├── card.tsx          # Card component
│   │   │   ├── dialog.tsx        # Dialog/Modal component
│   │   │   ├── input.tsx         # Input component
│   │   │   ├── label.tsx         # Label component
│   │   │   ├── layout.tsx        # Layout component
│   │   │   └── select.tsx        # Select dropdown component
│   │   └── utils.ts              # Component utility functions (cn helper)
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css           # Global CSS with Tailwind directives
│   │
│   ├── proxy.ts                  # Next.js middleware (auth guard)
│   └── utils.ts                  # General utility functions (auth helpers)
│
├── public/                       # Static assets (images, icons)
├── __mocks__/                    # Jest mocks
│   └── next/
│       └── navigation.ts         # Mock for Next.js navigation
│
├── jest.config.ts                # Jest configuration
├── jest.setup.ts                 # Jest setup file
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Project dependencies and scripts
```

## 🔧 Key Features

- **Authentication System**: Login with cookie-based session management
- **Middleware Protection**: Route guards for authenticated/unauthenticated access
- **User Management**: CRUD operations for users
- **Resource Management**: Manage resources
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessible Components**: WCAG-compliant UI components using Radix UI
- **Type Safety**: Full TypeScript coverage for better DX
- **Testing**: Unit and integration tests with Jest and Testing Library

## 📜 Available Scripts

### Development

```bash
yarn dev
```

Starts the development server on [http://localhost:3000](http://localhost:3000) with hot module replacement. Sets `NODE_ENV=development`.

### Production Build

```bash
yarn build
```

Creates an optimized production build of the application. Compiles TypeScript, optimizes assets, and generates static pages where possible.

### Production Server

```bash
yarn start
```

Starts the production server after running `yarn build`. Sets `NODE_ENV=production`. The app will be available on [http://localhost:3000](http://localhost:3000).

### Linting

```bash
yarn lint
```

Runs ESLint to check code quality and enforce coding standards across the project.

### Testing

```bash
yarn test
```

Runs the Jest test suite with React Testing Library to execute unit and integration tests.

## 🚦 Getting Started

### Prerequisites

- **Node.js** 20+
- **Yarn** 1.19.1+

### Installation

1. Clone the repository:
```bash
git clone git@github.com:grupo-5-dev-web/frontend.git
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication Flow

The application uses cookie-based authentication:

1. **Login**: User submits credentials → receives auth token → stored in cookie
2. **Middleware**: Checks for auth token on protected routes
3. **Client-side**: Uses `js-cookie` for token management in components
4. **Server-side**: Uses Next.js `request.cookies` in middleware (proxy)

## 🧪 Testing

The project uses Jest and React Testing Library for testing:

```bash
yarn test                 # Run all tests
yarn test --watch        # Run tests in watch mode
yarn test --coverage     # Run tests with coverage report
```

## 🎨 Styling Approach

- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: For theming and dynamic colors
- **Component Variants**: Using `class-variance-authority` for consistent component APIs
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📦 Environment Variables

Create a `.env.local` file in the root directory:

```env
NODE_ENV=development
```

## 👥 Team

Developed by Grupo 5 - Web Development Team
```
├── Paloma Raissa
├── Arthur Macedo
└── Aildson Ferreira
```
