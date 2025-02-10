import api from '@/lib/axios';
import { Product } from '@/types/products';
import { CACHE_TTL, cacheInstance } from '@/utils/cache';
import { FilterOptions } from '@/utils/filterUtils';

export const productService = {
  async getProducts(params?: Record<string, string>) {
    const { data } = await api.get<Product[]>('/products', { params });
    return data;
  },

  async getFilterOptions() {
    const { data } = await api.get<FilterOptions>('/filters');
    return data;
  },

  async getProductById(id: string) {
    const cacheKey = `product-${id}`;
    const cachedProduct = cacheInstance.get(cacheKey);
    if (cachedProduct) {
      console.log('Cache hit for product:', id);
      return cachedProduct;
    }

    const { data } = await api.get<Product>(`/products/${id}`);

    cacheInstance.set(cacheKey, data, CACHE_TTL);
    return data;
  }
};
