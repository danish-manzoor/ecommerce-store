<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'User',
            'username' => "user",
            'phone' => '0343-3244496',
            'address' => 'Pakistan',
            'email' => 'user@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
