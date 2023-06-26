import React, { ReactNode } from 'react'
import Header from '../Header'

interface LayoutProps {
    hideShoppingBag?: boolean
    children: ReactNode
}

export default function Layout(props: LayoutProps) {
    return (
        <React.Fragment>
            <Header hideShoppingBag={props.hideShoppingBag ?? false} />
            {props.children}
        </React.Fragment>
    )
}