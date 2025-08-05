<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the buyer dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        $recentOrders = Order::with(['items.product'])
            ->where('buyer_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $orderStats = [
            'total' => Order::where('buyer_id', $user->id)->count(),
            'pending' => Order::where('buyer_id', $user->id)->where('status', 'pending')->count(),
            'delivered' => Order::where('buyer_id', $user->id)->where('status', 'delivered')->count(),
        ];

        $featuredProducts = Product::with(['category', 'seller'])
            ->active()
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('buyer/dashboard', [
            'recentOrders' => $recentOrders,
            'orderStats' => $orderStats,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}