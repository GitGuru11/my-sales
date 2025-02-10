import axios from 'axios';
import { Product } from '@/types/products';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async (filters?: any): Promise<Product[]> => {
  const { data } = await api.get('/products', { params: filters });
  return data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getFilterOptions = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/filters`);
  return data;
};