import { FilterOptions } from '@/utils/filterUtils';
import FilterSection from './FilterSection';
import { StarIcon } from '@heroicons/react/24/solid';

interface FilterSidebarProps {
  filterOptions: FilterOptions | null;
  activeFilters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function FilterSidebar({
  filterOptions,
  activeFilters,
  onFilterChange,
}: FilterSidebarProps) {
  if (!filterOptions) return null;

  const handleFilterClick = (type: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [type]: activeFilters[type] === value ? '' : value,
    };
    // Remove empty filters
    Object.keys(newFilters).forEach(
      (key) => !newFilters[key] && delete newFilters[key]
    );
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <FilterSection
        title="Categories"
        items={filterOptions.categories}
        activeValue={activeFilters['category']}
        onChange={(value) => handleFilterClick('category', value)}
      />

      {/* Brands */}
      <FilterSection
        title="Brands"
        items={filterOptions.brands}
        activeValue={activeFilters['brand']}
        onChange={(value) => handleFilterClick('brand', value)}
      />

      {/* Price Ranges */}
      <FilterSection
        title="Price"
        items={filterOptions.priceRanges}
        activeValue={activeFilters['priceRange']}
        onChange={(value) => handleFilterClick('priceRange', value)}
      />

      {/* Availability */}
      <FilterSection
        title="Availability"
        items={filterOptions.availability}
        activeValue={activeFilters['availability']}
        onChange={(value) => handleFilterClick('availability', value)}
      />

      {/* Sale Status */}
      <FilterSection
        title="Offers"
        items={filterOptions.saleStatus}
        activeValue={activeFilters['saleStatus']}
        onChange={(value) => handleFilterClick('saleStatus', value)}
      />
    </div>
  );
}