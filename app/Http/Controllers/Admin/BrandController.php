<?php

namespace App\Http\Controllers\Admin;
use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\BrandStoreUpdateRequest;
use App\Http\Requests\CategoryStoreUpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 10);
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $brands = Brand::select('id', 'name', 'slug', 'image', 'created_at')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();




        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'page' => $request->input('page', '1')
            ],
            'can' => [
                'create' => true,
                'edit' => true,
                'delete' => true
            ]
        ]);
    }


    public function create(Request $request)
    {
        return Inertia::render('Admin/Brands/Create');
    }

    public function store(BrandStoreUpdateRequest $request)
    {
        // dd($request);
        $data = $request->only('name');

        if ($request->hasFile('image')) {
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'brands');
        }
        Brand::create($data);
        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully');
    }


    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(CategoryStoreUpdateRequest $request, Brand $brand)
    {
        // dd($category);
        $data = $request->only('name');

        if ($request->hasFile('image')) {
            ImageUploader::deleteImage($brand->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'brands');
        }

        $brand->update($data);
        return redirect()->route('admin.brands.index')->with('success', 'Brand Updated successfully');
    }

    public function destroy(Brand $brand)
    {
        ImageUploader::deleteImage($brand->image);
        $brand->delete();
        return redirect()->route('admin.brands.index')->with('success', 'Brand deleted successfully');
    }

}
