// pages/products/index.tsx
import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductList from '@/components/products/ProductList';
import ProductFilter from '@/components/products/ProductFilter';
import { getProducts } from '@/api/api';
import type { Product } from '@/types/products';

export default function ProductsPage({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
      <Head>
        <title>Our Products - Marketing Site</title>
        <meta name="description" content="Browse our amazing products" />
        <meta property="og:title" content="Our Products" />
        <meta property="og:description" content="Browse our amazing products" />
      </Head>
      
      <main className="container mx-auto px-4">
        {/* <ProductFilter products={products} onFilter={setFilteredProducts} /> */}
        <ProductList products={filteredProducts} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = (await getProducts()).data;
  return { props: { products } };
};
