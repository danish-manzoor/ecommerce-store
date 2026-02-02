import { ProductItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Heart, ShoppingBag } from 'lucide-react';

const ProductCard = (product: ProductItem) => {
    const form = useForm<{
        option_ids: Record<string, number>;
        quantity: number;
    }>({
        option_ids: {},
        quantity: 1,
    });
    const handleDetails = (slug: String) => {
        router.visit(route('product.detail', slug));
    };

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err: any) => {
                console.log(err);
            },
        });
    };

    const addToWishlist = () => {
        form.post(route('wishlist.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err: any) => {
                console.log(err);
            },
        });
    };

    const removeFromWishlist = () => {
        form.delete(route('wishlist.delete', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err: any) => {
                console.log(err);
            },
        });
    };

    return (
        <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative">
                <img
                    src={product.image}
                    alt="Product"
                    className="h-64 w-full object-cover"
                />
                {product.isDiscount && (
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">
                        -{product.discount}%
                    </div>
                )}

                <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={addToCart}
                        disabled={form.processing}
                        className="mx-2 cursor-pointer rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() =>
                            product.is_wishlisted
                                ? removeFromWishlist()
                                : addToWishlist()
                        }
                        disabled={form.processing}
                        className="group mx-2 rounded-full bg-white p-3 transition-all duration-200 hover:bg-red-50"
                    >
                        <Heart
                            className={`h-4 w-4 cursor-pointer transition-all duration-200 ${
                                product.is_wishlisted
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400 group-hover:text-red-500'
                            } `}
                        />
                    </button>
                </div>
            </div>
            <div
                className="cursor-pointer p-4"
                onClick={() => handleDetails(product.slug)}
            >
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <p className="mb-3 text-sm text-gray-600">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-bold text-indigo-600">
                            ${product.price}
                        </span>
                        {product.isDiscount && (
                            <span className="ml-2 text-gray-400 line-through">
                                ${product.discount}
                            </span>
                        )}
                    </div>
                    <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
