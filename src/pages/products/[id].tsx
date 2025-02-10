// pages/products/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getProducts, getProduct } from '@/api/api';
import type { Product } from '@/types/products';

export default function ProductDetail({ product }: { product: Product }) {
  if (!product) return null;

  return (
    <>
      <Head>
        <title>{`${product.name} - Marketing Site`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Product detail content */}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getProducts();
  const paths = res.data.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = (await getProduct(params?.id as string)).data;
  return { props: { product } };
};
