<?php

namespace App\Http\Resources;

use App\Services\WishlistService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $wishlistIds = app(WishlistService::class)
            ->getWishlistProductIds();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->getPriceForFirstOptions(),
            'quantity' => $this->quantity,
            'description' => $this->description,
            'image' => $this->getFirstImageUrl('images', 'small'),
            'isDiscount' => false,
            'discount' => 0,
            'is_wishlisted' => in_array($this->id, $wishlistIds),
        ];
    }
}
