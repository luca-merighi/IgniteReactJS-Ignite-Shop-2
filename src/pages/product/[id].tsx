import React, { useContext } from 'react'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { ShoppingCartContext } from '@/context/ShoppingCart'

import Layout from '@/components/Layout'

import styles from './styles.module.scss'
import Head from 'next/head'

interface ProductProps {
    product: {
        id: string,
        name: string,
        description: string,
        imageUrl: string,
        price: string,
        priceAsNumber: number
    }
}

export default function Product({product}: ProductProps) {
    const {addProductToShoppingCart} = useContext(ShoppingCartContext)
    
    function handleAddProductToShoppingCart() {
        addProductToShoppingCart(product)
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>{`${product.name} | Ignite Shop`}</title>
            </Head>
            <Layout>
                <main className={styles.productPage}>
                    <div className={styles.container}>
                        <figure>
                            <Image 
                                src={product.imageUrl}
                                alt="Camiseta"
                                width={520} height={480}/>
                        </figure>
                        
                        <div className={styles.productInfo}>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                            <p>
                                {product.description}
                            </p>
                            
                            <button 
                                type="button"
                                onClick={handleAddProductToShoppingCart}>
                                Colocar na sacola
                            </button>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const productId = String(params?.id)
    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })
    
    const price = product.default_price as Stripe.Price
    
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount as number / 100),
                priceAsNumber: price.unit_amount,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}