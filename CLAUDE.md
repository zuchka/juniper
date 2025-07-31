# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Angular e-commerce application called "Juniper E-commerce" built with Angular 20+, featuring SSR (Server-Side Rendering), theming capabilities, and a design system. The application uses standalone components and Angular Material for UI components.

## Development Commands

### Core Development
- `npm start` or `ng serve` - Start development server on http://localhost:4200
- `ng build` - Build the project for production
- `ng build --watch --configuration development` - Build in watch mode for development
- `ng test` - Run unit tests with Karma and Jasmine
- `node dist/juniper-ecommerce/server/server.mjs` - Run the SSR server after building

### Code Generation
- `ng generate component component-name` - Generate new component
- `ng generate --help` - List all available schematics

## Architecture & Key Concepts

### Application Structure
- **Standalone Components**: All components use Angular's standalone component architecture
- **Lazy Loading**: Routes use dynamic imports for code splitting (`loadComponent`)
- **SSR Support**: Full server-side rendering with hydration and event replay
- **Signal-Based State**: Uses Angular signals for reactive state management

### Core Services
- **ThemeService** (`src/app/services/theme.service.ts`): Manages light/dark theme with localStorage persistence and SSR compatibility
- **ApiService** (`src/app/services/api.service.ts`): HTTP client service for external APIs (currently uses DummyJSON for demo data)

### Key Features
- **Theme System**: Light/dark mode toggle with system preference detection and SSR support
- **Design System**: Reusable banner component with multiple variants (info, error, warning, success, inline variants)
- **Material Design**: Uses Angular Material components throughout

### Routing Structure
- `/` - Home component (lazy loaded)
- `/admin` - Admin dashboard (lazy loaded)
- `/design` - Design system showcase (lazy loaded)

### Component Architecture
- **Banner Component**: Highly configurable notification/alert component with multiple types and customizable actions
- **Theme Toggle**: Standalone component for switching between light/dark themes
- **Admin Dashboard**: Customer management interface with mock data

### Styling & Theming
- **Custom SCSS Theme**: `src/custom-theme.scss` - Angular Material theme customization
- **CSS Classes**: Theme-aware with `.light-theme` and `.dark-theme` body classes
- **Component Styles**: Individual CSS files per component

### TypeScript Configuration
- **Strict Mode**: Enabled with comprehensive type checking
- **Angular Compiler**: Strict templates and injection parameters
- **Target**: ES2022 with module preservation

### Testing
- **Framework**: Jasmine with Karma test runner
- **Test Files**: Only `src/app/app.spec.ts` exists currently in the application code
- **Test Command**: `ng test` runs all tests

### Build Configuration
- **SSR**: Enabled with Express server
- **Bundle Budgets**: 500kB warning, 1MB error for initial bundle
- **Component Styles**: 10kB warning, 15kB error per component
- **Output**: Server-side rendering with client hydration

## Important Notes

### SSR Considerations
- Theme service properly handles browser detection with `isPlatformBrowser`
- LocalStorage access is guarded for SSR compatibility
- Meta theme-color updates for mobile browser theming

### Dependencies
- Angular 20+ with full Angular Material integration
- Express for SSR server
- RxJS for reactive programming
- TypeScript with strict configuration

### Code Style
- Standalone components preferred
- Signal-based reactive patterns
- Comprehensive TypeScript typing
- Angular Material design system adherence