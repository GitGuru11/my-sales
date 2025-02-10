# Next.js E-commerce Project

A responsive marketing-focused web application built with Next.js, demonstrating modern web development practices and SEO optimization.

## 🚀 Features

- **Product Listing**
  - Dynamic product fetching with caching
  - Filtering and search functionality
  - Responsive design (mobile, tablet, desktop)
  - Loading states and error handling

- **Product Details**
  - SEO optimized pages
  - Dynamic routing
  - Image optimization
  - Stock status indication

- **Technical Features**
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - Incremental Static Regeneration (ISR)
  - Data caching system
  - Type safety with TypeScript
  - Responsive design with Tailwind CSS

## 🛠️ Tech Stack

- Next.js (Latest)
- TypeScript
- Tailwind CSS
- Docker
- Git

## 📦 Installation

1. Clone the repository:
2. docker build -t nextjs-ecommerce .
3. docker run -p 3000:3000 nextjs-ecommerce


## Environment Variables
Create a .env.local file in the root directory:

NEXT_PUBLIC_API_URL=your_api_url


## API Routes

GET /api/products - Get all products
GET /api/products/:id - Get single product
GET /api/products/related/:id - Get related products