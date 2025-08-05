import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface Product {
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
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
    };
    products: {
        data: Product[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { current_page: number; total: number };
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ auth, products, categories, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get(route('products.index'), {
            search,
            category: filters.category,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryFilter = (categorySlug: string) => {
        router.get(route('products.index'), {
            search: filters.search,
            category: categorySlug === filters.category ? '' : categorySlug,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const addToCart = (productId: number) => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Products - Sydz E-Commers" />
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')} className="flex items-center">
                            <span className="text-2xl mr-2">🛒</span>
                            <h1 className="text-2xl font-bold text-gray-900">Sydz E-Commers</h1>
                        </Link>
                        <nav className="flex items-center space-x-4">
                            {auth.user && (
                                <Link
                                    href={route('cart.index')}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    🛒 Cart
                                </Link>
                            )}
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

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">🛍️ Browse Products</h1>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex max-w-md">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search products..."
                                    defaultValue={filters.search}
                                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-200"
                                >
                                    🔍 Search
                                </button>
                            </div>
                        </form>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategoryFilter('')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                                    !filters.category 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                All Categories
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryFilter(category.slug)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                                        filters.category === category.slug 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {products.data.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                                        <Link href={route('products.show', product.slug)}>
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
                                        </Link>
                                        <div className="p-4">
                                            <Link href={route('products.show', product.slug)}>
                                                <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition duration-200">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                                            <p className="text-sm text-gray-500 mb-2">by {product.seller.name}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                                                <p className="text-sm text-gray-500">{product.stock} in stock</p>
                                            </div>
                                            {auth.user && auth.user.role === 'buyer' && product.stock > 0 && (
                                                <button
                                                    onClick={() => addToCart(product.id)}
                                                    className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                                                >
                                                    🛒 Add to Cart
                                                </button>
                                            )}
                                            {product.stock === 0 && (
                                                <div className="w-full mt-3 bg-gray-400 text-white py-2 rounded-lg text-center">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.links && (
                                <div className="flex justify-center">
                                    <nav className="flex space-x-2">
                                        {products.links.map((link, index) => (
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
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                            <Link
                                href={route('products.index')}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                            >
                                View All Products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}