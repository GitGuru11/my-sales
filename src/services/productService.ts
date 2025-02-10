import api from '@/lib/axios';
import { Product } from '@/types/products';
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
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  }
};
