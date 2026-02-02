<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 10);
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $categories = Category::select('id', 'name', 'slug', 'image', 'parent_id', 'created_at')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();




        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
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
        $categories = Category::select('id', 'name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);
        return Inertia::render('Admin/Categories/Create', [
            'categories' => $flattenedCategories,
        ]);
    }

    public function store(CategoryStoreUpdateRequest $request)
    {
        // dd($request);
        $data = $request->only('name', 'description', 'parent_id');

        if ($request->hasFile('image')) {
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        }
        Category::create($data);
        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully');
    }


    public function edit(Category $category)
    {
        $categories = Category::select('id', 'name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'categories' => $flattenedCategories
        ]);
    }

    public function update(CategoryStoreUpdateRequest $request, Category $category)
    {
        // dd($category);
        $data = $request->only('name', 'description', 'parent_id');

        if ($request->hasFile('image')) {
            ImageUploader::deleteImage($category->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        }

        $category->update($data);
        return redirect()->route('admin.categories.index')->with('success', 'Category Updated successfully');
    }

    public function destroy(Category $category)
    {
        ImageUploader::deleteImage($category->image);
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully');
    }


    public function flattenCategories($categories, $prefix = '', $result = [])
    {
        foreach ($categories as $category) {
            $path = $prefix ? "$prefix > $category->name" : $category->name;

            $result[] = [
                'id' => $category->id,
                'name' => $category->name,
                'path' => $path,
                'level' => substr_count($path, '>'),
            ];

            if ($category->descendants && $category->descendants->count() > 0) {
                $result = $this->flattenCategories($category->descendants, $path, $result);
            }
        }

        return $result;
    }
}
