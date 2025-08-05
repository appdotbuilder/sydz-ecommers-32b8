<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display checkout page.
     */
    public function create()
    {
        $cartItems = CartItem::with(['product.seller', 'product.category'])
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty.');
        }

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return Inertia::render('orders/create', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Store a new order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'phone' => 'required|string|max:20',
            'payment_method' => 'required|in:cod,bank_transfer',
            'payment_proof' => 'required_if:payment_method,bank_transfer|image|max:2048',
            'notes' => 'nullable|string',
        ]);

        $cartItems = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty.');
        }

        DB::transaction(function () use ($request, $cartItems) {
            $total = $cartItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            $paymentProofPath = null;
            if ($request->hasFile('payment_proof')) {
                $paymentProofPath = $request->file('payment_proof')->store('payment-proofs', 'public');
            }

            $order = Order::create([
                'buyer_id' => auth()->id(),
                'order_number' => Order::generateOrderNumber(),
                'total_amount' => $total,
                'payment_method' => $request->payment_method,
                'payment_proof_path' => $paymentProofPath,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'phone' => $request->phone,
                'notes' => $request->notes,
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price * $cartItem->quantity,
                ]);

                // Update product stock
                $cartItem->product->decrement('stock', $cartItem->quantity);
            }

            // Clear cart
            CartItem::where('user_id', auth()->id())->delete();
        });

        return redirect()->route('buyer.orders')->with('success', 'Order placed successfully!');
    }

    /**
     * Display user's orders.
     */
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->where('buyer_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display order details.
     */
    public function show(Order $order)
    {
        if ($order->buyer_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['items.product', 'buyer']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }
}