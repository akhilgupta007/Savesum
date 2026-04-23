# Project Name

## Stack
- React 18 + Vite
- Tailwind CSS
- React Query (server state)
- Axios (HTTP client with token refresh)
- React Router v6 (lazy loaded routes)
- React Hook Form + Zod (forms + validation)
- Redux Toolkit or Zustand (global UI state — pick one)

## Getting Started

  1. Clone the repository
  2. Copy .env.example to .env.development and fill in values
  3. Run: npm install
  4. Run: npm run dev

## State Management
  Choose one and uncomment in src/store/index.js and src/app/Providers.jsx
  - Redux Toolkit: npm install @reduxjs/toolkit react-redux
  - Zustand:       npm install zustand

## Environment Files
  .env.development   →  Local dev
  .env.staging       →  Staging server
  .env.production    →  Production (Lead Developer only)

## Folder Structure
  See the Frontend Developer Guide document.

## Code Standards
  See the Company Development Standards document.

## Branch Rules
  No direct push to main. PR + Lead approval required.
