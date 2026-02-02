import UserLayout from '@/layouts/user-layout';
import { router, usePage } from '@inertiajs/react';

const Index = () => {
    const { wishlists } = usePage().props as any;
    const removeWishlist = (wishlistId: number) => {
        if (!confirm('Are you sure you want to remove this item?')) return;
        router.delete(`/wishlist/${wishlistId}`);
    };

    const handleDetails = (slug: String) => {
        router.visit(route('product.detail', slug));
    };
    return (
        <UserLayout>
            <h2>My Wishlists</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Product
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Price
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {wishlists.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-10 text-center text-sm text-gray-500"
                                >
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            wishlists.map((wishlist: any) => (
                                <tr
                                    key={wishlist.id}
                                    onClick={() => handleDetails(wishlist.slug)}
                                    className="cursor-pointer transition hover:bg-gray-50"
                                >
                                    {/* Image */}
                                    <td className="px-6 py-4">
                                        <img
                                            src={wishlist.image}
                                            alt={wishlist.name}
                                            className="h-12 w-12 rounded-lg border object-cover"
                                        />
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {wishlist.created_at}
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        {wishlist.name}
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        ${wishlist.price}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </UserLayout>
    );
};

export default Index;
