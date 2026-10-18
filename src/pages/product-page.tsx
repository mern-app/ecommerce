import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type Product from '../interface/products'

type CartItem = Product & { quantity: number }

type ProductPageProps = {
    products: Product[]
    cart: CartItem[]
    setCart: Dispatch<SetStateAction<CartItem[]>>
}

export default function ProductPage({
    products,
    cart,
    setCart,
}: ProductPageProps) {
    const featuredProducts = [...products].slice(0, 3)
    const [searchText, setSearchText] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortOrder, setSortOrder] = useState<'low' | 'high'>('low')
    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books']
    const filteredProducts = products
        .filter(
            (product) =>
                (selectedCategory === 'All' ||
                    product.category === selectedCategory) &&
                product.name.toLowerCase().includes(searchText.toLowerCase()),
        )
        .sort((a, b) =>
            sortOrder === 'low' ? a.price - b.price : b.price - a.price,
        )
    const cartTotal = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
    )
    const deliveryCharge = cartTotal > 2000 ? 0 : 100

    function handleAddToCart(productId: number) {
        const product = products.find((item) => item.id === productId)
        if (!product) return

        const cartItem = cart.find((item) => item.id === productId)

        setCart(
            cartItem
                ? cart.map((item) =>
                      item.id === productId
                          ? { ...item, quantity: item.quantity + 1 }
                          : item,
                  )
                : [...cart, { ...product, quantity: 1 }],
        )
    }

    function handleRemoveFromCart(productId: number) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    function handleChangeCountToCart(productId: number, type: 'inc' | 'dec') {
        if (type === 'inc') {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            )
        } else {
            setCart((prevCart) =>
                prevCart.flatMap((item) => {
                    if (item.id !== productId) return [item]
                    return item.quantity > 1
                        ? [{ ...item, quantity: item.quantity - 1 }]
                        : []
                }),
            )
        }
    }

    return (
        <>
            <div className="page-layout">
                <main className="product-content">
                    <section className="product-section featured-section">
                        <h2 className="section-title">Featured Products</h2>
                        <div className="product-grid">
                            {featuredProducts.map((product) => (
                                <article
                                    className="product-card"
                                    key={product.id}
                                >
                                    <h3 className="product-name">
                                        {product.name}
                                    </h3>
                                    <span className="product-category">
                                        {product.category}
                                    </span>
                                    <p>
                                        <strong>Rs. {product.price}</strong>
                                    </p>
                                    {cart.some(
                                        (item) => item.id === product.id,
                                    ) ? (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    handleChangeCountToCart(
                                                        product.id,
                                                        'dec',
                                                    )
                                                }
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <span className="padding-lr">
                                                <strong>
                                                    {
                                                        cart.find(
                                                            (item) =>
                                                                item.id ===
                                                                product.id,
                                                        )?.quantity
                                                    }
                                                </strong>
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleChangeCountToCart(
                                                        product.id,
                                                        'inc',
                                                    )
                                                }
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddToCart(product.id)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                    <section className="product-section all-products-section">
                        <div className="products-heading">
                            <h2 className="section-title">Products</h2>
                            <button
                                className="price-sort-button"
                                type="button"
                                onClick={() =>
                                    setSortOrder((order) =>
                                        order === 'low' ? 'high' : 'low',
                                    )
                                }
                            >
                                Price:{' '}
                                {sortOrder === 'low'
                                    ? 'Low to High'
                                    : 'High to Low'}
                            </button>
                            <div className="category-filters">
                                {categories.map((category) => (
                                    <button
                                        className={`category-filter ${selectedCategory === category ? 'selected' : ''}`}
                                        key={category}
                                        type="button"
                                        aria-pressed={
                                            selectedCategory === category
                                        }
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <input
                                className="product-search"
                                type="search"
                                placeholder="Search products"
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(event.target.value)
                                }
                            />
                        </div>
                        <div className="product-grid">
                            {filteredProducts.length === 0 ? (
                                <p>
                                    <strong>No products found</strong>
                                </p>
                            ) : (
                                filteredProducts.map((product) => (
                                    <article
                                        className="product-card"
                                        key={product.id}
                                    >
                                        <h3 className="product-name">
                                            {product.name}
                                        </h3>
                                        <span className="product-category">
                                            {product.category}
                                        </span>
                                        <p>
                                            <strong>Rs. {product.price}</strong>
                                        </p>
                                        {cart.some(
                                            (item) => item.id === product.id,
                                        ) ? (
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        handleChangeCountToCart(
                                                            product.id,
                                                            'dec',
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                                <span className="padding-lr">
                                                    <strong>
                                                        {
                                                            cart.find(
                                                                (item) =>
                                                                    item.id ===
                                                                    product.id,
                                                            )?.quantity
                                                        }
                                                    </strong>
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleChangeCountToCart(
                                                            product.id,
                                                            'inc',
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddToCart(product.id)
                                                }
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </article>
                                ))
                            )}
                        </div>
                    </section>
                </main>

                <aside className="cart">
                    <h2>Cart ({cart.length})</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-list">
                            {cart.map((product) => (
                                <article
                                    className="product-card"
                                    key={product.id}
                                >
                                    <h2>{product.name}</h2>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>
                                        <strong>
                                            Rs.{' '}
                                            {product.price * product.quantity}
                                        </strong>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFromCart(product.id)
                                        }
                                    >
                                        Remove from Cart
                                    </button>
                                </article>
                            ))}
                            <div className="cart-summary">
                                <strong>
                                    Items total: Rs. {cartTotal.toFixed(2)}
                                </strong>
                                <p>
                                    Delivery:{' '}
                                    {deliveryCharge === 0
                                        ? 'Free delivery'
                                        : `Rs. ${deliveryCharge}`}
                                </p>
                                <strong>
                                    Total: Rs.{' '}
                                    {(cartTotal + deliveryCharge).toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </>
    )
}
