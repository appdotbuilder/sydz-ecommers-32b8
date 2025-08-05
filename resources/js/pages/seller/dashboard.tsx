import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: string;
    category: {
        name: string;
    };
}

interface Order {
    id: number;
    quantity: number;
    price: number;
    created_at: string;
    order: {
        order_number: string;
        status: string;
        buyer: {
            name: string;
        };
    };
    product: {
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
    stats: {
        total_products: number;
        active_products: number;
        total_sales: number;
        pending_orders: number;
    };
    recentProducts: Product[];
    recentOrders: Order[];
    [key: string]: unknown;
}

export default function SellerDashboard({ auth, stats, recentProducts, recentOrders }: Props) {
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
            <Head title="Seller Dashboard - Sydz E-Commers" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="flex">
                    <div className="w-64 bg-white shadow-lg">
                        <div className="p-6">
                            <Link href={route('home')} className="flex items-center mb-8">
                                <span className="text-2xl mr-2">🛒</span>
                                <h1 className="text-xl font-bold text-gray-900">Sydz E-Commers</h1>
                            </Link>
                            <nav className="space-y-2">
                                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium">
                                    📊 Dashboard
                                </div>
                                <Link
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    📦 Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    📋 Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    ⚙️ Settings
                                </Link>
                            </nav>
                        </div>
                        <div className="absolute bottom-0 w-64 p-6 border-t">
                            <div className="flex items-center">
                                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                                    <span className="text-sm">👤</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                    <p className="text-xs text-gray-600">Seller</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                💼 Seller Dashboard
                            </h1>
                            <p className="text-gray-600">Manage your products and track your sales</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 rounded-full p-3 mr-4">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Active Products</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.active_products}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 rounded-full p-3 mr-4">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Sales</p>
                                        <p className="text-2xl font-bold text-gray-900">${stats.total_sales}</p>
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
                                        <p className="text-2xl font-bold text-gray-900">{stats.pending_orders}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Products */}
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-gray-900">📦 Recent Products</h2>
                                        <Link
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            View All →
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {recentProducts.length > 0 ? (
                                        <div className="space-y-4">
                                            {recentProducts.map((product) => (
                                                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            product.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {product.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {product.category.name} • ${product.price} • {product.stock} in stock
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(product.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <span className="text-4xl mb-4 block">📦</span>
                                            <p className="text-gray-600 mb-4">No products yet</p>
                                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
                                                Add Product
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-gray-900">📋 Recent Orders</h2>
                                        <Link
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            View All →
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {recentOrders.length > 0 ? (
                                        <div className="space-y-4">
                                            {recentOrders.map((orderItem) => (
                                                <div key={orderItem.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-semibold text-gray-900">{orderItem.order.order_number}</h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderItem.order.status)}`}>
                                                            {orderItem.order.status.charAt(0).toUpperCase() + orderItem.order.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {orderItem.product.name} • Qty: {orderItem.quantity} • ${orderItem.price}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        By {orderItem.order.buyer.name} • {new Date(orderItem.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <span className="text-4xl mb-4 block">📋</span>
                                            <p className="text-gray-600">No orders yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">🚀 Quick Actions</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">➕</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Add Product</h3>
                                            <p className="text-sm text-gray-600">Upload a new product</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-green-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">📊</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">View Analytics</h3>
                                            <p className="text-sm text-gray-600">Check your performance</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-purple-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">⚙️</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Manage Orders</h3>
                                            <p className="text-sm text-gray-600">Update order status</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}