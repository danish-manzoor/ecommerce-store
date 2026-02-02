import UserLayout from '@/layouts/user-layout';
import { Link, usePage } from '@inertiajs/react';

const Index = () => {
    const { orders } = usePage().props as any;
    return (
        <UserLayout>
            <h2>My Orders</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                            Order
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                            Date
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                            Total
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.length === 0 ? (
                        <tr>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-indigo-600">
                                No records Found
                            </td>
                        </tr>
                    ) : (
                        orders.map((order: any) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-indigo-600">
                                    {order.order_number}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                    {order.created_at}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold`}
                                    >
                                        {order.status.charAt(0).toUpperCase() +
                                            order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                    ${order.total_price}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                    <Link
                                        href={`/user/orders/${order.id}`}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </UserLayout>
    );
};

export default Index;
