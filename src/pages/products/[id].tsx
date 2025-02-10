import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getProductById, getProducts } from '@/api/api';
import Breadcrumb from '@/layouts/Breadcrumb';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Product } from '@/types/products';

interface ProductDetailPageProps {
  product: Product;
  error?: string;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product, error }) => {
  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Your Store`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} | Your Store`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images[0]} />
        <link rel="canonical" href={`/products/${product.id}`} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: 'Products', href: '/products' },
            { name: product.name },
          ]}
        />

        <ErrorBoundary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="relative aspect-w-1 aspect-h-1">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-4">
                <p className="text-2xl text-gray-900">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <h2 className="sr-only">Product description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="mt-6">
                <div className="text-gray-700">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getProducts();
    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const product = await getProductById(params?.id as string);
    return {
      props: {
        product,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to load product',
      },
    };
  }
};

export default ProductDetailPage;
