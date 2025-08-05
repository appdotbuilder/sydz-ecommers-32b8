<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'buyer_id' => User::factory()->buyer(),
            'order_number' => Order::generateOrderNumber(),
            'total_amount' => fake()->randomFloat(2, 20, 500),
            'payment_method' => fake()->randomElement(['cod', 'bank_transfer']),
            'payment_proof_path' => null,
            'status' => fake()->randomElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
            'shipping_address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}