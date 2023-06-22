import { ReactNode, createContext, useState } from 'react'
import { produce } from 'immer'

interface ShoppingCartProviderProps {
    children: ReactNode
}

export interface Product {
    id: string,
    name: string,
    imageUrl: string,
    price: string
}

interface ShoppingCartData {
    products: Product[],
    addProductToShoppingCart: (product: Product) => void,
    removeProductFromShoppingCart: (id: string) => void
}

export const ShoppingCartContext = createContext<ShoppingCartData>({} as ShoppingCartData)

export default function ShoppingCartProvider(props: ShoppingCartProviderProps) {
    const [products, setProducts] = useState<Product[]>([])
    
    function addProductToShoppingCart(product: Product) {
        const productAlreadyExistsInShoppingCart = products.findIndex(
            currentProduct => currentProduct.id === product.id
        )
        
        const newShoppingCart = produce(products, (draft) => {
            if(productAlreadyExistsInShoppingCart < 0) {
                draft.push(product)
            } else {
                return
            }
        })
        setProducts(newShoppingCart)
    }
    
    function removeProductFromShoppingCart(id: string) {
        const newShoppingCart = products.filter(
            currentProduct => currentProduct.id !== id
        )
        setProducts(newShoppingCart)
    }
    
    return (
        <ShoppingCartContext.Provider value={{
            products,
            addProductToShoppingCart,
            removeProductFromShoppingCart
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}