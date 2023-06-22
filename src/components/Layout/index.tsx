import React, { ReactNode } from 'react'
import Header from '../Header'

interface LayoutProps {
    children: ReactNode
}

export default function Layout(props: LayoutProps) {
    return (
        <React.Fragment>
            <Header />
            {props.children}
        </React.Fragment>
    )
}