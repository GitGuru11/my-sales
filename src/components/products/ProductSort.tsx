interface ProductSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  totalProducts: number;
}

export default function ProductSort({ sortBy, onSortChange, totalProducts }: ProductSortProps) {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing {totalProducts} results
      </p>
      <div className="flex items-center">
        <label htmlFor="sort" className="text-sm text-gray-500 mr-2">
          Sort by
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}