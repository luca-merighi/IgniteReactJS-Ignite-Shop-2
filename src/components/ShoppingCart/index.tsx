import { useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingCartContext } from '@/context/ShoppingCart'

import ProductCard from './ProductCard'

import {X} from 'phosphor-react'
import styles from './styles.module.scss'

export default function ShoppingCart() {
    const {products} = useContext(ShoppingCartContext)
    
    // const total = products.reduce((sumTotal, product) => {
    //     return sumTotal + product.price
    // }, 0)
    // const totalValue = new Intl.NumberFormat('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL'
    // }).format(total)
    
    return (
        <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            
            <Dialog.Content className={styles.content}>
                <Dialog.Close 
                    className={styles.closeButton}
                    title="Fechar Sacola de Compras">
                    <X size={24} />   
                </Dialog.Close>
                
                <Dialog.Title>
                    Sacola de Compras
                </Dialog.Title>
            
                {/* {products.length === 0 ? (
                    <div className={styles.emptyShoppingCart}>
                        <span>
                            Parece que não há nenhum <br />
                            produto no carrinho
                        </span>
                    </div>
                ) : (
                    <ul className={styles.productsList}>
                        {products.map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product} />
                        ))}
                    </ul>
                )}
                
                {products.length > 0 && (
                    <footer>
                        <div className={styles.summary}>
                            <div className={styles.quantity}>
                                <span>
                                    Quantidade
                                </span>
                                
                                <span>
                                    {products.length} itens
                                </span>
                            </div>
                            
                            <div className={styles.total}>
                                <strong>Valor total</strong>
                                
                                <strong></strong>
                            </div>
                        </div>
                        
                        <button type="button">
                            Finalizar compra
                        </button>
                    </footer>
                )} */}
            </Dialog.Content>
        </Dialog.Portal>
    )
}