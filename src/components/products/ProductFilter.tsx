import { useState } from 'react';

interface ProductFilterProps {
  categories: string[];
  onFilterChange: (categories: string[], searchTerm: string) => void;
}

export default function ProductFilter({ categories, onFilterChange }: ProductFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories, searchTerm);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange(selectedCategories, value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    onFilterChange([], '');
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || searchTerm) && (
        <button
          onClick={clearFilters}
          className="text-blue-500 text-sm hover:text-blue-700"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
