import { useState } from 'react'
import {useKeenSlider} from 'keen-slider/react'

import SliderArrow from '../SliderArrow'
import Product from '../Product'

import styles from './styles.module.scss'
import 'keen-slider/keen-slider.min.css'

interface ProductsContainerProps {
    products: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        priceAsNumber: number
    }[]
}

export default function ProductsContainer({products}: ProductsContainerProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            perView: 3,
            spacing: 48
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        }
    })
    
    return (
        <main className={styles.productsContainer}>
            <div className={`${styles.container} keen-slider`} ref={sliderRef}>
                {products.map(product => (
                    <Product 
                        key={product.id}
                        slider="keen-slider__slide"
                        product={product} />
                ))}
                
                <div className={styles.shadow} />
            </div>
            
            <SliderArrow 
                type="left"
                onClick={() => instanceRef.current?.prev()} />
            
            <SliderArrow 
                type="right"
                onClick={() => instanceRef.current?.next()} />
        </main>
    )
}