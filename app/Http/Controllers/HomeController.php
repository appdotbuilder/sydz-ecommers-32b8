<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the main page or product listings.
     */
    public function index(Request $request)
    {
        // If this is a product listing request (has search/category filters)
        if ($request->has('search') || $request->has('category')) {
            $query = Product::with(['category', 'seller'])->active();

            // Search functionality
            if ($request->has('search') && $request->search) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
            }

            // Category filter
            if ($request->has('category') && $request->category) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('slug', $request->category);
                });
            }

            $products = $query->latest()->paginate(12);
            $categories = Category::active()->get();

            return Inertia::render('products/index', [
                'products' => $products,
                'categories' => $categories,
                'filters' => [
                    'search' => $request->search,
                    'category' => $request->category,
                ],
            ]);
        }

        // Check if it's the first visit (splash screen logic)
        $showSplash = !$request->session()->has('visited');
        if (!$request->session()->has('visited')) {
            $request->session()->put('visited', true);
        }

        // If user is authenticated, redirect to role-specific dashboard
        if (auth()->check()) {
            $user = auth()->user();
            
            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'seller':
                    return redirect()->route('seller.dashboard');
                case 'buyer':
                    return redirect()->route('buyer.dashboard');
            }
        }

        // For non-authenticated users, show the welcome page with products
        $featuredProducts = Product::with(['category', 'seller'])
            ->active()
            ->latest()
            ->take(8)
            ->get();

        $categories = Category::active()
            ->whereHas('products', function ($query) {
                $query->where('is_active', true);
            })
            ->withCount(['products' => function ($query) {
                $query->where('is_active', true);
            }])
            ->take(6)
            ->get();

        return Inertia::render('welcome', [
            'showSplash' => $showSplash,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
        ]);
    }

    /**
     * Show product details.
     */
    public function show(Product $product)
    {
        if (!$product->is_active) {
            abort(404);
        }

        $product->load(['category', 'seller']);
        
        $relatedProducts = Product::with(['category', 'seller'])
            ->active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}