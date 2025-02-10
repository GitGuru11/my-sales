import { useCallback, useState } from 'react';
import Head from 'next/head';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useProducts } from '@/hooks/useProducts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorAlert } from '@/components/ErrorAlert';
import ProductList from '@/components/products/ProductList';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductSort from '@/components/products/ProductSort';
import ActiveFilters from '@/components/products/ActiveFilters';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState('featured');
  
  const { 
    products, 
    filterOptions, 
    isLoading, 
    error, 
    fetchProducts,
    retry
  } = useProducts();

  const handleFilterChange = async (newFilters: Record<string, string>) => {
    setActiveFilters(newFilters);
    try {
      await fetchProducts({ ...newFilters, sort: sortBy });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleSortChange = async (newSort: string) => {
    setSortBy(newSort);
    try {
      await fetchProducts({ ...activeFilters, sort: newSort });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>Products | Your Store</title>
        <meta name="description" content="Browse our collection of products" />
        <meta property="og:title" content="Products | Your Store" />
        <meta property="og:description" content="Browse our collection of products" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 pb-24">
          {error && (
            <div className="mb-6">
              <ErrorAlert 
                message={error.message} 
                onRetry={retry}
              />
            </div>
          )}

          {/* Mobile filter button */}
          <div className="lg:hidden mb-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Filters
            </button>
          </div>

          {/* Mobile filter dialog */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 flex z-40 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-25" 
                   onClick={() => setMobileFiltersOpen(false)} 
                   aria-hidden="true" />
              
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4 px-4">
                  <FilterSidebar
                    filterOptions={filterOptions}
                    activeFilters={activeFilters}
                    onFilterChange={(filters) => {
                      handleFilterChange(filters);
                      setMobileFiltersOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Desktop filter sidebar */}
            <div className="hidden lg:block">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <FilterSidebar
                  filterOptions={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <ProductSort
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  totalProducts={products.length}
                />
              </div>

              {Object.keys(activeFilters).length > 0 && (
                <ActiveFilters
                  filters={activeFilters}
                  filterOptions={filterOptions}
                  onRemove={(key) => {
                    const newFilters = { ...activeFilters };
                    delete newFilters[key];
                    handleFilterChange(newFilters);
                  }}
                />
              )}

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
