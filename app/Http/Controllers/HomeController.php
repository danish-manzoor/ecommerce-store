<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $bestSellingProducts = ProductListResource::collection(Product::query()->limit(4)->orderBy('sales', 'desc')->get())->resolve();
        $specialOffers = ProductListResource::collection(Product::query()->where('is_special_offer', true)->limit(4)->get())->resolve();
        $brands = Brand::query()->select('id', 'name', 'slug', 'image')->get();
        return Inertia::render("Ecommerce/Home", [
            'title' => 'Welcome to Our Store',
            'description' => 'Explore our wide range of products and enjoy exclusive offers.',
            'bestSellingProducts' => $bestSellingProducts,
            'specialOffers' => $specialOffers,
            'brands' => $brands
        ]);
    }


    public function productDetails($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $productResource = new ProductResource($product);
        $relatedProducts = ProductListResource::collection(
            Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->limit(4)
                ->get()
        );
        return Inertia::render('Ecommerce/ProductDetails', [
            'product' => $productResource->resolve(),
            'variationOptions' => request('options', []),
            'relatedProducts' => $relatedProducts->resolve(),
        ]);
    }
}
