import { useEffect, useState } from 'react';
import { FilterOptions } from '@/utils/filterUtils';

export function useFilters() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/filters');
        if (!response.ok) throw new Error('Failed to fetch filters');
        const data = await response.json();
        setFilterOptions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { filterOptions, isLoading, error };
}
