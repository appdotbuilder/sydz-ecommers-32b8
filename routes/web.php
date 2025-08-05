<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Buyer\DashboardController as BuyerDashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Seller\DashboardController as SellerDashboardController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [HomeController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [HomeController::class, 'show'])->name('products.show');

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Legacy dashboard route for compatibility
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return redirect(match ($user->role) {
            'admin' => route('admin.dashboard'),
            'seller' => route('seller.dashboard'),
            'buyer' => route('buyer.dashboard'),
            default => route('home'),
        });
    })->name('dashboard');
    // Cart routes
    Route::controller(CartController::class)->prefix('cart')->name('cart.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::patch('/{cartItem}', 'update')->name('update');
        Route::delete('/{cartItem}', 'destroy')->name('destroy');
    });

    // Order routes
    Route::controller(OrderController::class)->prefix('orders')->name('orders.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{order}', 'show')->name('show');
    });

    // Role-based dashboard routes
    Route::middleware([RoleMiddleware::class . ':buyer'])->prefix('buyer')->name('buyer.')->group(function () {
        Route::get('/dashboard', [BuyerDashboardController::class, 'index'])->name('dashboard');
        Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    });

    Route::middleware([RoleMiddleware::class . ':seller'])->prefix('seller')->name('seller.')->group(function () {
        Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');
    });

    Route::middleware([RoleMiddleware::class . ':admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';