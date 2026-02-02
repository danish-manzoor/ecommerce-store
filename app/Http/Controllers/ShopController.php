<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // dd($request);
        $perPage = $request->input('perPage', 12);
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');
        $selectedCategoryId = $request->input('category', []);
        $minPrice = $request->input('minVal', 0);
        $maxPrice = $request->input('maxVal', 1000);
        $brandIds = $request->input('selectedBrands', []);
        // dd($selectedCategoryId);
        // Parent + child categories
        $categoryIds = [];
        if (!empty($selectedCategoryId)) {
            $categoryIds = $selectedCategoryId;
            $childrenIds = Category::whereIn('parent_id', $selectedCategoryId)->pluck('id')->toArray();
            $categoryIds = array_merge($categoryIds, $childrenIds);
        }

        // Products query
        $products = Product::select('id', 'name', 'slug', 'price', 'created_at')
            ->when($minPrice || $maxPrice, function ($q) use ($minPrice, $maxPrice) {
                $q->where('price', '>=', $minPrice)
                    ->where('price', '<=', $maxPrice);
            })
            ->when(!empty($brandIds), function ($query) use ($brandIds) {
                $query->whereIn('brand_id', $brandIds);
            })
            ->when($categoryIds && $categoryIds != null, fn($q) => $q->whereIn('category_id', $categoryIds))
            ->orderBy($sort, $direction)
            ->paginate($perPage === 'all' ? Product::count() : $perPage)
            ->withQueryString();

        // Transform products
        $products->getCollection()->transform(function ($product) {
            $product->isDiscount = false;
            $product->discount = 0;
            $product->rating = mt_rand(30, 50) / 10;
            $product->reviews_count = 100;
            $product->is_new = $product->created_at
                ? $product->created_at->gte(now()->subDays(7))
                : false;
            return $product;
        });

        // Parent categories for filter UI
        $parentCategories = Category::whereNull('parent_id')->get(['id', 'name']);
        $brands = Brand::select('id', 'name')
            ->withCount('products')
            ->get();

        return Inertia::render("Ecommerce/Shop", [
            'products' => $products,
            'categories' => $parentCategories,
            'brands' => $brands,
            'filters' => [
                'brands' => $brandIds,
                'selectedCategory' => $selectedCategoryId,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'page' => $request->input('page', '1'),
                'max_price' => $maxPrice,
                "min_price" => $minPrice
            ]
        ]);
    }

}
