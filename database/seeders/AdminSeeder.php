<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'imsyad',
            'password' => Hash::make('imsyad1373'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}