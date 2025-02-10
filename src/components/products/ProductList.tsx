import { useState, useMemo } from 'react';
import { Product } from '@/types/products';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique categories from products
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    return Array.from(categorySet);
  }, [products]);

  // Filter products based on selected categories and search term
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      
      const matchesSearch = product.name.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategories, searchTerm]);

  const handleFilterChange = (categories: string[], search: string) => {
    setSelectedCategories(categories);
    setSearchTerm(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <ProductFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
