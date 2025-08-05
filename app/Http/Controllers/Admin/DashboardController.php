<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_sellers' => User::where('role', 'seller')->count(),
            'total_buyers' => User::where('role', 'buyer')->count(),
            'blocked_users' => User::where('is_blocked', true)->count(),
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'total_categories' => Category::count(),
            'total_revenue' => Order::where('status', 'delivered')->sum('total_amount'),
        ];

        $recentUsers = User::latest()->take(5)->get();
        $recentOrders = Order::with(['buyer', 'items'])->latest()->take(10)->get();
        $recentProducts = Product::with(['seller', 'category'])->latest()->take(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'recentOrders' => $recentOrders,
            'recentProducts' => $recentProducts,
        ]);
    }
}