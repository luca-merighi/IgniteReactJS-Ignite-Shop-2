import { useContext } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingCartContext } from '@/context/ShoppingCart'

import ShoppingCart from '../ShoppingCart'

import {Handbag} from 'phosphor-react'
import styles from './styles.module.scss'

export default function Header() {
    const {products} = useContext(ShoppingCartContext)
    
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Image 
                    src="/logo.svg" 
                    alt="Logo Ignite Shop"
                    width={129} height={52} />
                
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button
                            type="button"
                            title="Abrir carrinho de compras">
                            <Handbag weight="bold" />
                            {products?.length > 0 && (
                                <span className={styles.shoppingCartProductsLength}>
                                    {products.length}
                                </span>
                            )}
                        </button>
                    </Dialog.Trigger>
                    
                    <ShoppingCart />
                </Dialog.Root>
            </div>
        </header>
    )
}