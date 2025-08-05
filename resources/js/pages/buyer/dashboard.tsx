import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: {
        id: number;
        quantity: number;
        price: number;
        product: {
            name: string;
            image_path: string | null;
        };
    }[];
}

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

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    recentOrders: Order[];
    orderStats: {
        total: number;
        pending: number;
        delivered: number;
    };
    featuredProducts: Product[];
    [key: string]: unknown;
}

export default function BuyerDashboard({ auth, recentOrders, orderStats, featuredProducts }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            processing: 'bg-purple-100 text-purple-800',
            shipped: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Head title="Buyer Dashboard - Sydz E-Commers" />
            
            {/* Top Navigation */}
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
                                🛍️ Browse Products
                            </Link>
                            <Link
                                href={route('cart.index')}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                🛒 Cart
                            </Link>
                            <Link
                                href={route('buyer.orders')}
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                📦 Orders
                            </Link>
                            <span className="text-gray-700">👋 {auth.user.name}</span>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🎉 Welcome back, {auth.user.name}!
                        </h1>
                        <p className="text-gray-600">Here's what's happening with your account</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="bg-blue-100 rounded-full p-3 mr-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                                    <span className="text-2xl">⏳</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="bg-green-100 rounded-full p-3 mr-4">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                                    <p className="text-2xl font-bold text-gray-900">{orderStats.delivered}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">📦 Recent Orders</h2>
                                    <Link
                                        href={route('buyer.orders')}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        View All →
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-gray-900">{order.order_number}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {order.items.length} item(s) • ${order.total_amount}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <span className="text-4xl mb-4 block">📦</span>
                                        <p className="text-gray-600 mb-4">No orders yet</p>
                                        <Link
                                            href={route('products.index')}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">🚀 Quick Actions</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <Link
                                        href={route('products.index')}
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                                    >
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">🛍️</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Browse Products</h3>
                                            <p className="text-sm text-gray-600">Discover amazing products</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('cart.index')}
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                                    >
                                        <div className="bg-green-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">🛒</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">View Cart</h3>
                                            <p className="text-sm text-gray-600">Check your cart items</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('buyer.orders')}
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                                    >
                                        <div className="bg-purple-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">📋</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Order History</h3>
                                            <p className="text-sm text-gray-600">Track your orders</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    {featuredProducts.length > 0 && (
                        <div className="mt-8 bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">✨ Recommended for You</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {featuredProducts.slice(0, 4).map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route('products.show', product.slug)}
                                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200"
                                        >
                                            <div className="h-32 bg-gray-200 flex items-center justify-center">
                                                {product.image_path ? (
                                                    <img
                                                        src={`/storage/${product.image_path}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">📦</span>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
                                                <p className="text-xs text-gray-600 mt-1">{product.category.name}</p>
                                                <p className="text-sm font-bold text-indigo-600 mt-1">${product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}