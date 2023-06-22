import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartContext } from '@/context/ShoppingCart'

import {Handbag} from 'phosphor-react'
import styles from './styles.module.scss'

interface ProductProps {
    slider: string,
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string
    }
}

export default function Product({slider, product}: ProductProps) {
    const {addProductToShoppingCart} = useContext(ShoppingCartContext)
    
    function handleAddProductToShoppingCart() {
        addProductToShoppingCart(product)
    }
    
    return (
        <Link 
            href={`/product/${product.id}`}
            className={`${styles.product} 
            ${slider}`}>
            <Image 
                src={product.imageUrl}
                alt="Camiseta"
                width={520} height={480}/>
                
            <footer>
                <div className={styles.productInfo}>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                </div>
                
                <button
                    type="button"
                    title="Adicionar produto ao carrinho de compras"
                    onClick={handleAddProductToShoppingCart}>
                    <Handbag weight="bold" />
                </button>
            </footer>
        </Link>
    )
}