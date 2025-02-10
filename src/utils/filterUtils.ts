import { Product } from "@/types/products";

export interface FilterOptions {
  categories: Array<{ id: string; name: string; count: number }>;
  brands: Array<{ id: string; name: string; count: number }>;
  priceRanges: Array<{ id: string; name: string; min: number; max: number; count: number }>;
  ratings: Array<{ id: string; value: number; count: number }>;
  sizes: Array<{ id: string; name: string; count: number }>;
  colors: Array<{ id: string; name: string; count: number }>;
  availability: Array<{ id: string; name: string; count: number }>;
  saleStatus: Array<{ id: string; name: string; count: number }>;
}

export function extractFilterOptions(products: Product[]): FilterOptions {
  // Helper function to count occurrences
  const countBy = (arr: any[], key: string) => {
    return arr.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  };

  // Categories
  const categoryCount = countBy(products, 'category');
  const categories = Object.entries(categoryCount).map(([name, count]) => ({
    id: name.toLowerCase(),
    name,
    count: count as number,
  }));

  // Brands
  const brandCount = countBy(products, 'brand');
  const brands = Object.entries(brandCount).map(([name, count]) => ({
    id: name.toLowerCase(),
    name,
    count: count as number,
  }));

  // Price Ranges
  const priceRanges = [
    { id: '0-50', name: 'Under $50', min: 0, max: 50 },
    { id: '50-100', name: '$50 to $100', min: 50, max: 100 },
    { id: '100-500', name: '$100 to $500', min: 100, max: 500 },
    { id: '500-plus', name: 'Over $500', min: 500, max: Infinity },
  ].map(range => ({
    ...range,
    count: products.filter(p => 
      p.price >= range.min && p.price <= range.max
    ).length
  }));

  // Ratings
  const ratings = [5, 4, 3, 2, 1].map(rating => ({
    id: `${rating}`,
    value: rating,
    count: products.filter(p => Math.floor(p.rating) === rating).length
  }));

  // Sizes (from products that have sizes)
  const allSizes = new Set<string>();
  products.forEach(p => p.sizes?.forEach(size => allSizes.add(size)));
  const sizes = Array.from(allSizes).map(size => ({
    id: size.toLowerCase(),
    name: size,
    count: products.filter(p => p.sizes?.includes(size)).length
  }));

  // Colors (from products that have colors)
  const allColors = new Set<string>();
  products.forEach(p => p.colors?.forEach(color => allColors.add(color)));
  const colors = Array.from(allColors).map(color => ({
    id: color.toLowerCase(),
    name: color,
    count: products.filter(p => p.colors?.includes(color)).length
  }));

  // Availability
  const availability = [
    {
      id: 'in-stock',
      name: 'In Stock',
      count: products.filter(p => p.stock > 0).length
    },
    {
      id: 'out-of-stock',
      name: 'Out of Stock',
      count: products.filter(p => p.stock === 0).length
    }
  ];

  // Sale Status
  const saleStatus = [
    {
      id: 'on-sale',
      name: 'On Sale',
      count: products.filter(p => p.isOnSale).length
    },
    {
      id: 'regular-price',
      name: 'Regular Price',
      count: products.filter(p => !p.isOnSale).length
    }
  ];

  return {
    categories,
    brands,
    priceRanges,
    ratings,
    sizes,
    colors,
    availability,
    saleStatus
  };
}