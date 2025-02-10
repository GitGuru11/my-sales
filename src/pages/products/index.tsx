import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { getProducts } from '@/api/api';
import { Product } from '@/types/products';
import ProductList from '@/components/products/ProductList';
import ProductFilter from '@/components/products/ProductFilter';
import Breadcrumb from '@/layouts/Breadcrumb';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ProductsPageProps {
  initialProducts: Product[];
  error?: string;
}

const ProductsPage: NextPage<ProductsPageProps> = ({ initialProducts, error }) => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const handleFilterChange = async (filters: Record<string, any>) => {
    setIsLoading(true);
    setFilterError(null);
    
    try {
      const filteredProducts = await getProducts(filters);
      setProducts(filteredProducts);
    } catch (err) {
      setFilterError('Failed to apply filters. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <>
      <Head>
        <title>Products | Your Store</title>
        <meta name="description" content="Browse our collection of products" />
        <meta property="og:title" content="Products | Your Store" />
        <meta property="og:description" content="Browse our collection of products" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="canonical" href="/products" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Products' }]} />

        <ErrorBoundary>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="md:col-span-3">
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              )}
              {filterError && (
                <div className="text-red-500 text-center mb-4">{filterError}</div>
              )}
              {!isLoading && <ProductList products={products} />}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await getProducts();
    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (error) {
    return {
      props: {
        initialProducts: [],
        error: 'Failed to load products',
      },
    };
  }
};

export default ProductsPage;
