import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_blocked: boolean;
    created_at: string;
}

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    buyer: {
        name: string;
    };
    items: {
        id: number;
        quantity: number;
    }[];
}

interface Product {
    id: number;
    name: string;
    price: number;
    is_active: boolean;
    created_at: string;
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
    stats: {
        total_users: number;
        total_sellers: number;
        total_buyers: number;
        blocked_users: number;
        total_products: number;
        active_products: number;
        total_orders: number;
        pending_orders: number;
        total_categories: number;
        total_revenue: number;
    };
    recentUsers: User[];
    recentOrders: Order[];
    recentProducts: Product[];
    [key: string]: unknown;
}

export default function AdminDashboard({ auth, stats, recentUsers, recentOrders, recentProducts }: Props) {
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

    const getRoleColor = (role: string) => {
        const colors = {
            admin: 'bg-red-100 text-red-800',
            seller: 'bg-blue-100 text-blue-800',
            buyer: 'bg-green-100 text-green-800',
        };
        return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Head title="Admin Dashboard - Sydz E-Commers" />
            
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
                                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
                                    👑 Admin Dashboard
                                </div>
                                <Link
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    👥 Users
                                </Link>
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
                                    🏷️ Categories
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    📊 Analytics
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
                                <div className="bg-red-100 rounded-full p-2 mr-3">
                                    <span className="text-sm">👑</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                    <p className="text-xs text-gray-600">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                👑 Admin Dashboard
                            </h1>
                            <p className="text-gray-600">Complete control over your e-commerce platform</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                                        <span className="text-xl">👥</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="bg-green-100 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                                        <span className="text-xl">📦</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="bg-purple-100 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                                        <span className="text-xl">📋</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_orders}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="bg-yellow-100 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                                        <span className="text-xl">⏳</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending_orders}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="bg-indigo-100 rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                                        <span className="text-xl">💰</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">${stats.total_revenue}</p>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Sellers</p>
                                        <p className="text-xl font-semibold">{stats.total_sellers}</p>
                                    </div>
                                    <span className="text-2xl">💼</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Buyers</p>
                                        <p className="text-xl font-semibold">{stats.total_buyers}</p>
                                    </div>
                                    <span className="text-2xl">🛍️</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Categories</p>
                                        <p className="text-xl font-semibold">{stats.total_categories}</p>
                                    </div>
                                    <span className="text-2xl">🏷️</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Blocked Users</p>
                                        <p className="text-xl font-semibold text-red-600">{stats.blocked_users}</p>
                                    </div>
                                    <span className="text-2xl">🚫</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Users */}
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">👥 Recent Users</h2>
                                </div>
                                <div className="p-6">
                                    {recentUsers.length > 0 ? (
                                        <div className="space-y-4">
                                            {recentUsers.map((user) => (
                                                <div key={user.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                                                        <p className="text-sm text-gray-600">{user.email}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                                            {user.role}
                                                        </span>
                                                        {user.is_blocked && (
                                                            <div className="text-xs text-red-600 mt-1">Blocked</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-center py-4">No recent users</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">📋 Recent Orders</h2>
                                </div>
                                <div className="p-6">
                                    {recentOrders.length > 0 ? (
                                        <div className="space-y-4">
                                            {recentOrders.slice(0, 5).map((order) => (
                                                <div key={order.id} className="border-b border-gray-100 pb-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-medium text-gray-900 text-sm">{order.order_number}</h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {order.buyer.name} • ${order.total_amount}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-center py-4">No recent orders</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Products */}
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">📦 Recent Products</h2>
                                </div>
                                <div className="p-6">
                                    {recentProducts.length > 0 ? (
                                        <div className="space-y-4">
                                            {recentProducts.map((product) => (
                                                <div key={product.id} className="border-b border-gray-100 pb-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            product.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {product.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {product.seller.name} • ${product.price}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {product.category.name} • {new Date(product.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-center py-4">No recent products</p>
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
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">👥</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Manage Users</h3>
                                            <p className="text-sm text-gray-600">View and edit users</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-green-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">🏷️</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">Add Category</h3>
                                            <p className="text-sm text-gray-600">Create new category</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-purple-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">📊</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">View Reports</h3>
                                            <p className="text-sm text-gray-600">Detailed analytics</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                                        <div className="bg-red-100 rounded-full p-2 mr-4">
                                            <span className="text-xl">⚙️</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">System Settings</h3>
                                            <p className="text-sm text-gray-600">Configure platform</p>
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