import { useState } from 'react'
import './App.css'
import ProductPage from './pages/product-page'
import { products as productsData } from './pages/data.js'
import type Product from './interface/products'
import 'font-awesome/css/font-awesome.min.css'

function App() {
    const products: Product[] = productsData
    const [cart, setCart] = useState<(Product & { quantity: number })[]>([])

    return (
        <ProductPage
            products={products}
            cart={cart}
            setCart={setCart}
        />
    )
}

export default App
