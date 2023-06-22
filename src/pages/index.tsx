import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import ShoppingCartProvider from '@/context/ShoppingCart'

import Layout from '@/components/Layout'
import ProductsContainer from '@/components/ProductsContainer'

interface HomeProps {
  products: {
      id: string,
      name: string,
      imageUrl: string,
      price: string
  }[]
}

export default function Home({products}: HomeProps) {
  return (
    <ShoppingCartProvider>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      
      <Layout>
        <ProductsContainer products={products} />
      </Layout>
    </ShoppingCartProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
      expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
      const price = product.default_price as Stripe.Price
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount as number / 100)
      }
    })
  
  return {
      props: {
          products
      },
      revalidate: 60 * 60 * 24 // 24 Hours
  }
}