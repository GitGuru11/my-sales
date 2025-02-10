import { useState } from 'react';

interface FilterOption {
  id: string;
  name: string;
}

const categories: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'books', name: 'Books' },
];

const priceRanges: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: '0-50', name: 'Under $50' },
  { id: '50-100', name: '$50 to $100' },
  { id: '100-plus', name: 'Over $100' },
];

interface ProductFilterProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onFilterChange({
      category: categoryId === 'all' ? null : categoryId,
      priceRange: selectedPriceRange === 'all' ? null : selectedPriceRange,
    });
  };

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRange(rangeId);
    onFilterChange({
      category: selectedCategory === 'all' ? null : selectedCategory,
      priceRange: rangeId === 'all' ? null : rangeId,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'text-indigo-600'
                    : 'text-gray-500'
                } hover:text-gray-700`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <ul className="mt-4 space-y-2">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <button
                onClick={() => handlePriceRangeChange(range.id)}
                className={`${
                  selectedPriceRange === range.id
                    ? 'text-indigo-600'
                    : 'text-gray-500'
                } hover:text-gray-700`}
              >
                {range.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
