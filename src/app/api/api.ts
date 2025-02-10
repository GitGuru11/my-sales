import { Product } from "@/app/types/products";
import { ApiResponse } from "@/app/types";

const data = await import('@/data/products.json');

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  try {
    // In real app, this would be an API call
    return { data: data.products };
  } catch (error) {
    return { data: [], error: 'Failed to fetch products' };
  }
}

export async function getProduct(id: string): Promise<ApiResponse<Product | null>> {
  try {
    const product = data.products.find(p => p.id === id);
    return { data: product || null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch product' };
  }
}