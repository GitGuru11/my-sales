import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/products';
import { FilterOptions } from '@/utils/filterUtils';
import { productService } from '@/services/productService';
import { AppError } from '@/types/error';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProducts] = useState<Product | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof AppError) {
      setError(err);
    } else if (err instanceof Error) {
      setError(new AppError(err.message));
    } else {
      setError(new AppError('An unexpected error occurred'));
    }
  };

  const fetchProducts = useCallback(async (filters?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      setCurrentProducts(data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const data = await productService.getFilterOptions();
      setFilterOptions(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const retry = useCallback(() => {
    fetchFilterOptions();
    fetchProducts();
  }, [fetchFilterOptions, fetchProducts]);

  useEffect(() => {
    retry();
    fetchProductById("ELEC-001")
  }, []);

  return {
    products,
    currentProduct,
    filterOptions,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    retry
  };
}
