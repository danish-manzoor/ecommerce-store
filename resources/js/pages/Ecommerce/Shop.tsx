import CategorySidebar from '@/components/Ecommerce/CategorySidebar';
import EcommerceLayout from '@/layouts/ecom-layout';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Heart,
    ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';

const Shop = () => {
    const { products, categories, brands, filters } = usePage().props as any;

    const [minVal, setMinVal] = useState(filters?.min_price ?? 0);
    const [maxVal, setMaxVal] = useState(filters?.max_price ?? 1000);

    const [perPage, setPerPage] = useState(filters?.perPage || 12);
    const [sort, setSort] = useState(filters?.sort || 'id');
    const [direction, setDirection] = useState(filters?.direction || 'asc');

    // const [category, setCategory] = useState(filters?.selectedCategory || null);

    const [category, setCategory] = useState<number[]>(
        filters?.selectedCategory.map((id: number) => Number(id)) || [],
    );

    const [selectedBrands, setSelectedBrands] = useState<number[]>(
        filters?.brands.map((id: number) => Number(id)) || [],
    );

    const updateRoute = (newParams = {}) => {
        const params = {
            perPage,
            sort,
            direction,
            page: 1,
            minVal,
            maxVal,
            selectedBrands,
            category,
            ...newParams,
        };
        console.log(params);
        router.get(route('shop'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleBrands = (brandId: number) => {
        setSelectedBrands((prev) => {
            const updated = prev.includes(brandId)
                ? prev.filter((id) => id !== brandId)
                : [...prev, brandId];
            updateRoute({ selectedBrands: updated });

            return updated;
        });
    };

    const handleCategories = (catId: number) => {
        setCategory((prev) => {
            const updated = prev.includes(catId)
                ? prev.filter((id) => id !== catId)
                : [...prev, catId];
            updateRoute({ category: updated });
            return updated;
        });
    };

    const handleSortChange = (e: any) => {
        const parts = e.target.value.split('_');
        const dir = parts.pop();
        const column = parts.join('_');
        setSort(column);
        setDirection(dir as 'asc' | 'desc');
        updateRoute({ sort: column, direction: dir });
    };

    const handlePerPageChange = (e: any) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        updateRoute({ perPage: newPerPage });
    };

    const applyPriceFilter = (min: number, max: number) => {
        updateRoute({ minVal: min, maxVal: max });
    };

    const resetFilters = () => {
        router.visit(route('shop'));
    };
    return (
        <EcommerceLayout>
            {/* <!-- Breadcrumb --> */}
            <div className="bg-gray-100 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <a href="#" className="hover:text-indigo-600">
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800">Products</span>
                    </div>
                </div>
            </div>

            {/* <!-- Main Content Area --> */}
            <div className="container mx-auto px-4 py-8">
                <div className="-mx-4 flex flex-col lg:flex-row">
                    {/* <!-- Filter Sidebar --> */}
                    <div className="mb-8 w-full px-4 lg:mb-0 lg:w-1/4">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            {/* <!-- Mobile Filter Toggle --> */}
                            <div
                                className="mb-6 lg:hidden"
                                x-data="{ open: false }"
                            >
                                <button className="flex w-full items-center justify-between rounded-md bg-indigo-600 px-4 py-2 text-white">
                                    <span>Show Filters</span>
                                    <i
                                        className="fas"
                                        className="open ? 'fa-chevron-up' : 'fa-chevron-down'"
                                    ></i>
                                </button>

                                <div x-show="open" className="mt-4">
                                    {/* <!-- Mobile Filter Content --> */}
                                    <div className="mb-4 border-b pb-4">
                                        <h3 className="mb-3 font-semibold">
                                            Categories
                                        </h3>
                                        <div className="space-y-2">
                                            <CategorySidebar
                                                categories={categories}
                                                selectedCategoryId={category}
                                                handleCategories={
                                                    handleCategories
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Desktop Filter Content - Always visible on large screens --> */}
                            <div className="hidden lg:block">
                                {/* <!-- Categories Filter --> */}
                                <div className="mb-4 border-b pb-4">
                                    <h3 className="mb-3 font-semibold">
                                        Categories
                                    </h3>
                                    <div className="space-y-2">
                                        <CategorySidebar
                                            categories={categories}
                                            selectedCategoryId={category}
                                            handleCategories={handleCategories}
                                        />
                                    </div>
                                </div>

                                {/* <!-- Price Range Filter --> */}
                                <div className="mb-4 border-b pb-4">
                                    <h3 className="mb-3 font-semibold">
                                        Price Range
                                    </h3>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min={0}
                                            max={1000}
                                            step={10}
                                            value={minVal}
                                            onChange={(e) =>
                                                setMinVal(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                        />

                                        <input
                                            type="range"
                                            min={0}
                                            max={1000}
                                            step={10}
                                            value={maxVal}
                                            onChange={(e) =>
                                                setMaxVal(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="mr-2 text-gray-600">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                value={minVal}
                                                min={0}
                                                onChange={(e) =>
                                                    setMinVal(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-20 rounded-md border px-2 py-1"
                                            />
                                        </div>
                                        <span className="text-gray-600">-</span>
                                        <div className="flex items-center">
                                            <span className="mr-2 text-gray-600">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                value={maxVal}
                                                max={1000}
                                                onChange={(e) =>
                                                    setMaxVal(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-20 rounded-md border px-2 py-1"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            applyPriceFilter(minVal, maxVal)
                                        }
                                        className="mt-4 w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                                    >
                                        Apply
                                    </button>
                                </div>

                                {/* <!-- Brand Filter --> */}
                                <div className="mb-4 border-b pb-4">
                                    <h3 className="mb-3 font-semibold">
                                        Brand
                                    </h3>
                                    <div className="space-y-2">
                                        {brands.map((brand: any) => (
                                            <label
                                                key={brand.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                                    checked={selectedBrands.includes(
                                                        brand.id,
                                                    )}
                                                    onChange={() =>
                                                        handleBrands(brand.id)
                                                    }
                                                />
                                                <span className="ml-2 text-gray-700">
                                                    {brand.name} (
                                                    {brand.products_count})
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={resetFilters}
                                    className="w-full rounded bg-gray-200 py-2 text-gray-800 hover:bg-gray-300"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Products Grid --> */}
                    <div className="w-full px-4 lg:w-3/4">
                        {/* <!-- Sorting and Display Options --> */}
                        <div className="mb-6 flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-sm sm:flex-row">
                            <div className="mb-4 flex items-center sm:mb-0">
                                <span className="mr-2 text-gray-600">
                                    Sort By:
                                </span>
                                <select
                                    id="sort"
                                    value={`${sort}_${direction}`}
                                    onChange={handleSortChange}
                                    className="rounded-md border px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="id_asc">Relevance</option>
                                    <option value="price_asc">
                                        Price: Low to High
                                    </option>
                                    <option value="price_desc">
                                        Price: High to Low
                                    </option>
                                    <option value="created_at_desc">
                                        Newest First
                                    </option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <span className="mr-2 text-gray-600">
                                    View:
                                </span>
                                <button className="rounded-l-md bg-indigo-600 p-2 text-white">
                                    <i className="fas fa-th"></i>
                                </button>
                                <button className="rounded-r-md bg-gray-200 p-2 text-gray-600">
                                    <i className="fas fa-list"></i>
                                </button>

                                <span className="mr-2 ml-4 text-gray-600">
                                    Show:
                                </span>
                                <select
                                    id="perPage"
                                    value={perPage}
                                    onChange={handlePerPageChange}
                                    className="rounded-md border px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="48">48</option>
                                    <option value="all">All</option>
                                </select>
                            </div>
                        </div>

                        {/* <!-- Products Grid --> */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* <!-- Product Item 1 --> */}
                            {products.data.map((product: any) => (
                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-lg bg-white shadow-sm"
                                >
                                    <div className="relative">
                                        <Link
                                            href={route(
                                                'product.detail',
                                                product.slug,
                                            )}
                                        >
                                            <img
                                                src={
                                                    product.image
                                                        ? product.image
                                                        : '/placeholder.png'
                                                }
                                                alt="Product"
                                                className="h-64 w-full object-cover"
                                            />
                                        </Link>
                                        {product.is_new && (
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded bg-green-500 px-2 py-1 text-xs text-white">
                                                    New
                                                </span>
                                            </div>
                                        )}
                                        {product.isDiscount && (
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
                                                    -20%
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="rounded-full bg-white p-2 shadow transition hover:bg-indigo-600 hover:text-white">
                                                <Heart />
                                            </button>
                                            <button className="rounded-full bg-white p-2 shadow transition hover:bg-indigo-600 hover:text-white">
                                                <i className="fas fa-exchange-alt"></i>
                                                <ShoppingBag />
                                            </button>
                                            <button className="rounded-full bg-white p-2 shadow transition hover:bg-indigo-600 hover:text-white">
                                                <i className="fas fa-eye"></i>
                                                <Eye />
                                            </button>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 text-white transition hover:bg-indigo-700">
                                                <i className="fas fa-shopping-cart mr-2"></i>{' '}
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 flex text-yellow-400">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star-half-alt"></i>
                                            <span className="ml-2 text-sm text-gray-600">
                                                ({product.rating})
                                            </span>
                                        </div>
                                        <a
                                            href="product-detail.html"
                                            className="font-medium text-gray-800 hover:text-indigo-600"
                                        >
                                            {product.name}
                                        </a>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-indigo-600">
                                                    ${product.price}
                                                </span>
                                                {product.isDiscount && (
                                                    <span className="ml-2 text-gray-400 line-through">
                                                        $
                                                        {product.price -
                                                            product.discount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <!-- Pagination --> */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center">
                                <a
                                    href="#"
                                    className="mr-1 rounded-md bg-gray-200 px-3 py-1 text-gray-600 hover:bg-indigo-600 hover:text-white"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                    <ChevronLeft />
                                </a>
                                <a
                                    href="#"
                                    className="mx-1 rounded-md bg-indigo-600 px-3 py-1 text-white"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="mx-1 rounded-md bg-gray-200 px-3 py-1 text-gray-600 hover:bg-indigo-600 hover:text-white"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="mx-1 rounded-md bg-gray-200 px-3 py-1 text-gray-600 hover:bg-indigo-600 hover:text-white"
                                >
                                    3
                                </a>
                                <span className="mx-1 px-3 py-1">...</span>
                                <a
                                    href="#"
                                    className="mx-1 rounded-md bg-gray-200 px-3 py-1 text-gray-600 hover:bg-indigo-600 hover:text-white"
                                >
                                    10
                                </a>
                                <a
                                    href="#"
                                    className="ml-1 rounded-md bg-gray-200 px-3 py-1 text-gray-600 hover:bg-indigo-600 hover:text-white"
                                >
                                    <i className="fas fa-chevron-right"></i>
                                    <ChevronRight />
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
};

export default Shop;
