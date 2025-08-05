import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    payment_method: string;
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

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    orders: {
        data: Order[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { current_page: number; total: number };
    };
    [key: string]: unknown;
}

export default function OrdersIndex({ orders }: Props) {
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

    const getPaymentMethodIcon = (method: string) => {
        return method === 'cod' ? '💵' : '🏦';
    };

    return (
        <>
            <Head title="My Orders - Sydz E-Commers" />
            
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
                                🛍️ Browse Products
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
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">📦 My Orders</h1>

                    {orders.data.length > 0 ? (
                        <>
                            <div className="space-y-6">
                                {orders.data.map((order) => (
                                    <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {order.order_number}
                                                    </h2>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <span>📅 {new Date(order.created_at).toLocaleDateString()}</span>
                                                        <span>{getPaymentMethodIcon(order.payment_method)} {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</span>
                                                        <span>💰 ${order.total_amount}</span>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>

                                            {/* Order Items */}
                                            <div className="border-t pt-4">
                                                <h3 className="text-lg font-medium text-gray-900 mb-3">Items ({order.items.length})</h3>
                                                <div className="space-y-3">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
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
                                                                <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-semibold text-gray-900">${item.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    Total: ${order.total_amount}
                                                </div>
                                                <div className="flex space-x-3">
                                                    <Link
                                                        href={route('orders.show', order.id)}
                                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200"
                                                    >
                                                        View Details
                                                    </Link>
                                                    {order.status === 'pending' && (
                                                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200">
                                                            Cancel Order
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {orders.links && (
                                <div className="flex justify-center mt-8">
                                    <nav className="flex space-x-2">
                                        {orders.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-8xl mb-8 block">📦</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
                            <p className="text-gray-600 mb-8">You haven't placed any orders yet</p>
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