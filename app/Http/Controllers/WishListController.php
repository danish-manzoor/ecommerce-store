<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\WishlistService;
use Illuminate\Http\Request;

class WishListController extends Controller
{
    public function store(Request $request, Product $product, WishlistService $wishlistService)
    {
        $wishlistService->addItemWishlist($product);
        return back()->with('success', 'Item added to Wishlist successfully.');
    }


    public function destroy(Request $request, Product $product, WishlistService $wishlistService)
    {
        $wishlistService->removeItemFromwishlist($product->id);

        return back()->with('success', 'Item removed from Wishlist successfully.');
    }
}
