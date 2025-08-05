import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: number;
    image_path: string | null;
    slug: string;
    seller: {
        name: string;
    };
    category: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
    };
    showSplash: boolean;
    featuredProducts: Product[];
    categories: Category[];
    [key: string]: unknown;
}

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
            <div className="text-center">
                <div className="mb-8">
                    <div className="mx-auto h-32 w-32 rounded-full bg-white/20 flex items-center justify-center mb-6">
                        <span className="text-6xl">🛒</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white mb-4">Sydz E-Commers</h1>
                    <p className="text-xl text-white/80">Your Gateway to Amazing Products</p>
                </div>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            </div>
        </div>
    );
};

export default function Welcome({ auth, showSplash, featuredProducts, categories }: Props) {
    const [splashVisible, setSplashVisible] = useState(showSplash);

    const handleSplashComplete = () => {
        setSplashVisible(false);
    };

    if (splashVisible) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    return (
        <>
            <Head title="Sydz E-Commers - Your Gateway to Amazing Products" />
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">🛒</span>
                            <h1 className="text-2xl font-bold text-gray-900">Sydz E-Commers</h1>
                        </div>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href={route('products.index')}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Browse Products
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={
                                        auth.user.role === 'admin' 
                                            ? route('admin.dashboard')
                                            : auth.user.role === 'seller'
                                            ? route('seller.dashboard')
                                            : route('buyer.dashboard')
                                    }
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            🛍️ Welcome to Sydz E-Commers
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Discover amazing products from trusted sellers. Whether you're buying or selling, 
                            we've got everything you need in one place!
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href={route('products.index')}
                                className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200"
                            >
                                🔍 Browse Products
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-200"
                                >
                                    🚀 Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sydz E-Commers?</h2>
                        <p className="text-lg text-gray-600">Everything you need for a perfect shopping experience</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Multi-Role Platform</h3>
                            <p className="text-gray-600">For buyers, sellers, and admins - everyone has their perfect experience</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Payments</h3>
                            <p className="text-gray-600">Cash on delivery or bank transfer - pay your way</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
                            <p className="text-gray-600">Admin-moderated platform ensuring quality and safety</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            {categories.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">🏷️ Shop by Categories</h2>
                            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('products.index', { category: category.slug })}
                                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-200"
                                >
                                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                                    <p className="text-sm text-gray-600">{category.products_count} products</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Featured Products</h2>
                            <p className="text-lg text-gray-600">Check out our latest and greatest items</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route('products.show', product.slug)}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                                >
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        {product.image_path ? (
                                            <img
                                                src={`/storage/${product.image_path}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl">📦</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                                        <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                href={route('products.index')}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
                            >
                                View All Products
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">🚀 Ready to Get Started?</h2>
                    <p className="text-xl mb-8">Join thousands of satisfied customers and sellers on our platform</p>
                    <div className="flex justify-center space-x-4">
                        {!auth.user ? (
                            <>
                                <Link
                                    href={route('register')}
                                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200"
                                >
                                    🎯 Join as Buyer
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-200"
                                >
                                    💼 Become a Seller
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={route('products.index')}
                                className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200"
                            >
                                🛍️ Start Shopping
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-3xl mr-2">🛒</span>
                            <h3 className="text-2xl font-bold">Sydz E-Commers</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Your trusted e-commerce platform</p>
                        <p className="text-sm text-gray-500">
                            © 2024 Sydz E-Commers. Built with ❤️ for amazing shopping experiences.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}