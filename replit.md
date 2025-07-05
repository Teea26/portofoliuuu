# CreatorGame Portfolio Website

## Overview

This is a modern, playful portfolio website for a content creator, built with a full-stack JavaScript/TypeScript architecture. The application features a gaming-inspired design aesthetic with colorful animations and interactive elements, showcasing the creator's work through multiple themed sections.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom game-themed color variables
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactive effects
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Built-in Express session handling

### Development Environment
- **Package Manager**: npm
- **Development Server**: Vite dev server with HMR
- **TypeScript**: Strict mode enabled with path aliases
- **Linting**: ESLint configuration
- **Environment**: Replit-optimized with development banner integration

## Key Components

### 1. Gaming-Themed UI System
- **Custom Color Palette**: Game-inspired colors (pink, mint, sky, peach, yellow, lavender, cream)
- **Interactive Components**: Custom GameButton and GameCard components with hover animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for screen reader support

### 2. Portfolio Sections
- **Hero Section**: Animated introduction with floating elements
- **About Section**: Character-style presentation with stats and achievements
- **Portfolio Section**: Filterable project showcase with category-based navigation
- **Skills Section**: Interactive skill bars with level progression visualization
- **Contact Section**: Form-based contact system with validation

### 3. Contact Management System
- **Form Validation**: Zod schema validation for contact form submissions
- **Data Storage**: Contact messages stored in PostgreSQL via Drizzle ORM
- **API Endpoints**: RESTful endpoints for creating and retrieving contact messages
- **Error Handling**: Comprehensive error handling with user-friendly messages

### 4. Animation System
- **Framer Motion Integration**: Smooth page transitions and micro-interactions
- **Custom Animation Presets**: Reusable animation configurations in animations.ts
- **Performance Optimized**: Viewport-based animation triggers to reduce unnecessary renders

## Data Flow

### Contact Form Submission
1. User fills out contact form with name, email, project type, and message
2. Frontend validates data using Zod schema
3. Form data sent to `/api/contact` POST endpoint
4. Server validates data again and stores in database
5. Success/error response returned to frontend
6. User receives feedback via toast notification

### Data Storage Layer
- **Contact Messages**: Stored with timestamp, user details, and project requirements
- **User System**: Basic user schema prepared for future authentication features
- **Database Migrations**: Managed through Drizzle Kit with PostgreSQL dialect

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @types/react
- **TypeScript**: typescript, @types/node
- **Build Tools**: vite, @vitejs/plugin-react, esbuild

### UI and Styling
- **Tailwind CSS**: tailwindcss, autoprefixer, postcss
- **Radix UI**: Complete suite of accessible UI primitives
- **Framer Motion**: framer-motion for animations
- **Lucide Icons**: lucide-react for consistent iconography

### Backend and Database
- **Express.js**: express, @types/express
- **Database**: @neondatabase/serverless, drizzle-orm, drizzle-kit
- **Validation**: zod, @hookform/resolvers
- **Session**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Replit Integration**: @replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer
- **Development**: tsx for TypeScript execution, nanoid for unique IDs

## Deployment Strategy

### Production Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Assets**: Served from `dist/public` directory
4. **Database**: Neon Database (serverless PostgreSQL) for production

### Development Workflow
- **Hot Reload**: Vite HMR for instant frontend updates
- **TypeScript**: Real-time type checking and compilation
- **Database Sync**: Drizzle migrations for schema management
- **Environment Variables**: DATABASE_URL for database connection

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with compiled static assets
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

## Changelog
```
Changelog:
- July 05, 2025. Implemented complete admin system with authentication and project management
  * Added admin login system with password protection (admin123)
  * Only admin can add/delete projects, visitors view gallery only
  * Added project deletion functionality with confirmation prompts
  * Fixed accessibility issues for screen readers
- July 05, 2025. Fixed server host configuration (localhost → 0.0.0.0) to resolve application loading issues in Replit environment
- July 03, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```