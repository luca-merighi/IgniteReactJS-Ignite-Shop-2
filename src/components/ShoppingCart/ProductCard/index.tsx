import { useContext } from 'react'
import Image from 'next/image'
import { Product, ShoppingCartContext } from '@/context/ShoppingCart'

import styles from './styles.module.scss'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const {removeProductFromShoppingCart} = useContext(ShoppingCartContext)
    
    function handleRemoveProductFromShoppingCart() {
        removeProductFromShoppingCart(product.id)
    }
    
    return (
        <li className={styles.product}>
            <figure>
                <Image 
                    src={product.imageUrl}
                    alt="Camiseta"
                    width={94} height={94}/>
            </figure>
            
            <div className={styles.productInfo}>
                <span className={styles.productName}>
                    {product.name}
                </span>
                
                <strong className={styles.productPrice}>
                    {product.price}
                </strong>
                
                <button
                    type="button"
                    onClick={handleRemoveProductFromShoppingCart}>
                    Remover
                </button>
            </div>
        </li>
    )
}