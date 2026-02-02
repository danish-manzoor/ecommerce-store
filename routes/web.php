<?php

use App\Http\Controllers\ShopController;
use App\Http\Controllers\WishListController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\UserCheckMiddleware;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/product/{slug}', 'productDetails')->name('product.detail');
});

Route::get('/shop', [ShopController::class, 'index'])->name('shop');
// Cart routes
Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.delete');
});

// Cart routes
Route::controller(WishListController::class)->group(function () {
    Route::get('/wishlist', 'index')->name('wishlist.index');
    Route::post('/wishlist/add/{product}', 'store')->name('wishlist.store');
    Route::delete('/wishlist/{product}', 'destroy')->name('wishlist.delete');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [CartController::class, 'checkoutForm'])->name('checkout');
    Route::get('/payment', [CartController::class, 'paymentForm'])->name('payment');
    Route::post('/checkout/process', [CartController::class, 'processCheckout'])->name('checkout.process');
    Route::post('/payment/process', [CartController::class, 'processPayment'])->name('payment.process');
    Route::get('/order-complete/{order}', [CartController::class, 'orderComplete'])->name('order.complete');
});

Route::middleware(['auth', UserCheckMiddleware::class])->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
            Route::get('/dashboard', 'index')->name('dashboard');
            Route::get('/orders', 'orders')->name('orders');
            Route::get('/wishlists', 'wishlists')->name('wishlists');
            Route::get('/orders/{id}', 'showOrder')->name('orders.show');
            Route::post('/profile', 'updateProfile')->name('profile.update');
            Route::post('/password/update', 'updatePassword')->name('password.update');
            Route::get('/profile/edit', 'edit')->name('profile.edit');
            Route::get('/account-details', 'accountDetails')->name('account.details');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
