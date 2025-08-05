<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the seller dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'total_products' => Product::where('seller_id', $user->id)->count(),
            'active_products' => Product::where('seller_id', $user->id)->where('is_active', true)->count(),
            'total_sales' => OrderItem::whereHas('product', function ($query) use ($user) {
                $query->where('seller_id', $user->id);
            })->sum('price'),
            'pending_orders' => OrderItem::whereHas('product', function ($query) use ($user) {
                $query->where('seller_id', $user->id);
            })->whereHas('order', function ($query) {
                $query->where('status', 'pending');
            })->count(),
        ];

        $recentProducts = Product::where('seller_id', $user->id)
            ->with('category')
            ->latest()
            ->take(5)
            ->get();

        $recentOrders = OrderItem::with(['order.buyer', 'product'])
            ->whereHas('product', function ($query) use ($user) {
                $query->where('seller_id', $user->id);
            })
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('seller/dashboard', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
            'recentOrders' => $recentOrders,
        ]);
    }
}