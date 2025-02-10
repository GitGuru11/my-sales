// mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { extractFilterOptions } from '@/utils/filterUtils';
import { Product } from '@/types/products';

const products: Product[] = require('@/mocks/data/products.json').products

export const handlers = [
  // Get all filter options
  http.get('/api/filters', async () => {
    const filterOptions = extractFilterOptions(products);
    await delay(500);
    return HttpResponse.json(filterOptions);
  }),

  // Get all products with filters
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);
    let filteredProducts = [...products];

    // Category filter
    const category = url.searchParams.get('category');
    if (category) {
      filteredProducts = filteredProducts.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Brand filter
    const brand = url.searchParams.get('brand');
    if (brand) {
      filteredProducts = filteredProducts.filter(
        p => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Price range filter
    const priceRange = url.searchParams.get('priceRange');
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(
        p => p.price >= min && (max ? p.price <= max : true)
      );
    }

    // Rating filter
    const rating = url.searchParams.get('rating');
    if (rating) {
      filteredProducts = filteredProducts.filter(
        p => Math.floor(p.rating) >= Number(rating)
      );
    }

    // Size filter
    const size = url.searchParams.get('size');
    if (size) {
      filteredProducts = filteredProducts.filter(
        p => p.sizes?.includes(size)
      );
    }

    // Color filter
    const color = url.searchParams.get('color');
    if (color) {
      filteredProducts = filteredProducts.filter(
        p => p.colors?.includes(color)
      );
    }

    // Availability filter
    const availability = url.searchParams.get('availability');
    if (availability === 'in-stock') {
      filteredProducts = filteredProducts.filter(p => p.stock > 0);
    } else if (availability === 'out-of-stock') {
      filteredProducts = filteredProducts.filter(p => p.stock === 0);
    }

    // Sale status filter
    const saleStatus = url.searchParams.get('saleStatus');
    if (saleStatus === 'on-sale') {
      filteredProducts = filteredProducts.filter(p => p.isOnSale);
    } else if (saleStatus === 'regular-price') {
      filteredProducts = filteredProducts.filter(p => !p.isOnSale);
    }

    await delay(500);
    return HttpResponse.json(filteredProducts);
  }),

  // Get single product
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    const product = products.find(p => p.id === id);

    if (!product) {
      return new HttpResponse(
        JSON.stringify({ message: 'Product not found' }),
        { status: 404 }
      );
    }

    await delay(500);
    return HttpResponse.json(product);
  }),
];
