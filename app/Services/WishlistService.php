<?php

namespace App\Services;

use App\Models\wishlist;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class WishlistService
{
    private ?array $cachedWishlistItems = null;
    private const COOKIE_NAME = 'wishlistItems';
    protected const COOKIE_LIFETIME = 60 * 24 * 365;

    public function addItemWishlist(Product $product)
    {
        if (Auth::check()) {
            // save to the database
            $this->saveItemToDatabase($product->id);
        } else {
            //save to the cookie
            $this->saveItemToCookies($product->id);
        }
    }


    public function getWishlistProductIds()
    {
        if (Auth::check()) {
            return Wishlist::where('user_id', auth()->id())
                ->pluck('product_id')
                ->toArray();
        } else {
            $wishlistItems = $this->getwishlistItemsFromCookies();
            return collect($wishlistItems)
                ->pluck('product_id')
                ->map(fn($id) => (int) $id)
                ->values()
                ->toArray();
        }


    }



    public function removeItemFromwishlist(int $productId)
    {
        if (Auth::check()) {
            $this->removeItemFromDatabase($productId);
        } else {
            $this->removeItemFromCookies($productId);
        }
    }





    protected function removeItemFromDatabase(int $productId): void
    {
        $userId = Auth::id();
        wishlist::where('product_id', $productId)
            ->where('user_id', $userId)
            ->delete();
    }

    protected function removeItemFromCookies(int $productId): void
    {
        $wishlistItems = $this->getwishlistItemsFromCookies();
        $wishlistItemKey = $productId;
        if (isset($wishlistItems[$wishlistItemKey])) {
            unset($wishlistItems[$wishlistItemKey]);
        }
        Cookie::queue(self::COOKIE_NAME, json_encode($wishlistItems), self::COOKIE_LIFETIME);
    }


    protected function saveItemToDatabase(int $productId): void
    {
        $userId = Auth::id();
        $wishlistItem = Wishlist::where('product_id', $productId)
            ->where('user_id', $userId)
            ->first();

        if (!$wishlistItem) {
            $wishlistItem = new Wishlist();
            $wishlistItem->user_id = $userId;
            $wishlistItem->product_id = $productId;
            $wishlistItem->save();
        }
    }

    protected function saveItemToCookies(int $productId): void
    {

        $wishlistItems = $this->getwishlistItemsFromCookies();

        $wishlistItemKey = $productId;
        if (!isset($wishlistItems[$wishlistItemKey])) {

            $wishlistItems[$wishlistItemKey] = [
                'id' => uniqid(),
                'product_id' => $productId,
            ];
        }
        Cookie::queue(self::COOKIE_NAME, json_encode($wishlistItems), self::COOKIE_LIFETIME);
    }

    public function getwishlistItemsFromDatabase(): array
    {
        $userId = Auth::id();
        $wishlistItems = wishlist::where('user_id', $userId)->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'option_ids' => $item->variation_type_option_ids
                ];
            })
            ->toArray();
        return $wishlistItems;
    }

    public function getwishlistItemsFromCookies(): array
    {
        $wishlistItems = json_decode(Cookie::get(self::COOKIE_NAME, '[]'), true);
        return $wishlistItems;
    }


    public function movewishlistItemsToDatabase($userId)
    {
        $wishlistItems = $this->getwishlistItemsFromCookies();
        // dd($wishlistItems);
        if (empty($wishlistItems)) {
            return; // No items to move
        }
        foreach ($wishlistItems as $wishlistItem) {
            $existingItem = Wishlist::where('product_id', $wishlistItem['product_id'])->where('user_id', $userId)->first();
            if ($existingItem) {
                continue;
            } else {
                $newItem = new Wishlist();
                $newItem->user_id = $userId;
                $newItem->product_id = $wishlistItem['product_id'];
                $newItem->save();
            }
        }
        Cookie::queue(self::COOKIE_NAME, '', -1);

        $this->cachedwishlistItems = null;
    }


}
