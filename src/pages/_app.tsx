import Layout from "@/layouts/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { server } from '@/mocks/node'

if (process.env.NODE_ENV === 'development') {
  server();
}

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
