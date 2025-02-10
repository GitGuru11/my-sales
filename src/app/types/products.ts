export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string,
  stock: number,
  sizes?: string[],
  features?: string[],
  colors?: string[],
  rating: number,
  reviews: number,
  images: string[],
  isOnSale: boolean,
  salePrice: number | null
}