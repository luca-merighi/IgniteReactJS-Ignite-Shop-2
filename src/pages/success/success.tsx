import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

import Layout from '@/components/Layout'

import styles from './success.module.scss'

interface CheckoutSuccessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string
    },
    productsImages: string[]
}

export default function CheckoutSuccess({
    customerName, 
    productsImages
}: CheckoutSuccessProps) {
    return (
        <React.Fragment>
            <Head>
                <title>Compra Efetuada | Ignite Shop</title>
            </Head>
            <Layout hideShoppingBag={true}>
                <main className={styles.checkoutSuccess}>
                    <div className={styles.container}>
                        <div className={styles.imagesContainer}>
                            {productsImages.map((image, index) => (
                                <figure key={index}>
                                    <Image
                                        src={image}
                                        alt="Image da Camiseta"
                                        width={120}
                                        height={110} />
                                </figure>
                            ))}
                        </div>
                        
                        <h1>Compra Efetuada!</h1>
                        
                        <p>
                            Uhuul <strong>{customerName}</strong>, sua compra de <br /> 
                            {productsImages.length} {productsImages.length > 1 ? 'camisetas' : 'camiseta'} já está a caminho de sua casa.
                        </p>
                        
                        <Link href="/">
                            Voltar ao catálogo
                        </Link>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if(!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    const sessionId = String(query.session_id)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    
    const customerName = session.customer_details.name
    const productsImages = session.line_items.data.map(item => {
        const product = item.price.product as Stripe.Product
        return product.images[0]
    })
    
    return {
        props: {
            customerName,
            productsImages
        }
    }
}