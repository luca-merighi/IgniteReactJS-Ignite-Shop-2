import styles from './styles.module.scss'

interface SliderArrowProps {
    type: 'left' | 'right'
    onClick: () => void
}

export default function SliderArrow(props: SliderArrowProps) {
    return props.type === 'left' ? (
        <svg 
        className={`${styles.arrow} ${styles.arrowLeft}`} 
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
    ) : (
        <svg 
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
    )
}