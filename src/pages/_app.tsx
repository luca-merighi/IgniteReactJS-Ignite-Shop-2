import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import ShoppingCartProvider from '@/context/ShoppingCart'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ShoppingCartProvider>
        <Component {...pageProps} />
      </ShoppingCartProvider>
  )
}
