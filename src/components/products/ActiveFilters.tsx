import { FilterOptions } from "@/utils/filterUtils";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ActiveFiltersProps {
  filters: Record<string, string>;
  filterOptions: FilterOptions | null;
  onRemove: (key: string) => void;
}

export default function ActiveFilters({ filters, filterOptions, onRemove }: ActiveFiltersProps) {
  if (!filterOptions) return null;

  const getFilterLabel = (type: string, value: string) => {
    const filterGroup = filterOptions[type as keyof FilterOptions];
    if (!filterGroup) return value;
    const filter = filterGroup.find((f) => f.id === value);
    return filter ? filter.name : value;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => (
          <span
            key={`${key}-${value}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white"
          >
            <span className="text-gray-600 capitalize">{key}:</span>
            <span className="ml-1 font-medium">{getFilterLabel(key, value)}</span>
            <button
              onClick={() => onRemove(key)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}