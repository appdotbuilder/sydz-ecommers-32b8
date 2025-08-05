import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image_path: string | null;
        slug: string;
        stock: number;
        seller: {
            name: string;
        };
        category: {
            name: string;
        };
    };
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    const updateQuantity = (cartItemId: number, quantity: number) => {
        router.patch(route('cart.update', cartItemId), {
            quantity,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeItem = (cartItemId: number) => {
        router.delete(route('cart.destroy', cartItemId), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Shopping Cart - Sydz E-Commers" />
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')} className="flex items-center">
                            <span className="text-2xl mr-2">🛒</span>
                            <h1 className="text-2xl font-bold text-gray-900">Sydz E-Commers</h1>
                        </Link>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href={route('products.index')}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                🛍️ Continue Shopping
                            </Link>
                            <Link
                                href={route('buyer.dashboard')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 Shopping Cart</h1>

                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                                {item.product.image_path ? (
                                                    <img
                                                        src={`/storage/${item.product.image_path}`}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">📦</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <Link
                                                    href={route('products.show', item.product.slug)}
                                                    className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-gray-600">{item.product.category.name}</p>
                                                <p className="text-sm text-gray-500">by {item.product.seller.name}</p>
                                                <p className="text-lg font-bold text-indigo-600 mt-2">${item.product.price}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                                                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm mt-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                                            <span className="font-semibold">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-semibold">Free</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('orders.create')}
                                        className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 text-center font-semibold hover:bg-indigo-700 transition duration-200 block"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg mt-3 text-center font-semibold hover:bg-gray-200 transition duration-200 block"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-8xl mb-8 block">🛒</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8">Looks like you haven't added any products yet</p>
                            <Link
                                href={route('products.index')}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}