import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const Dashboard = ({ dashboardData }: { dashboardData: any }) => {
    // console.log(dashboardData);
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'confirmed':
                return 'bg-purple-100 text-purple-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-100';
        }
    };
    return (
        <UserLayout>
            <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                    <p className="mt-1 text-gray-600">
                        Hello {dashboardData.userAddress?.name} (not{' '}
                        {dashboardData.userAddress?.name}
                        <Link
                            href="#"
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            Log out
                        </Link>
                        )
                    </p>
                </div>
                <div className="p-6">
                    <p className="mb-4">
                        From your account dashboard you can view your
                        <Link
                            href="/user/orders"
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            recent orders
                        </Link>
                        , manage your
                        <Link
                            href="/user/addresses"
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            shipping and billing addresses
                        </Link>
                        , and
                        <Link
                            href="/user/profile/edit"
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            edit your password and account details
                        </Link>
                    </p>

                    {/* <!-- Dashboard Cards --> */}
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
                            <div className="border-b bg-gray-50 p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Orders</h3>
                                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                        {
                                            dashboardData.orderStatus
                                                ?.total_orders
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="mb-4 text-sm text-gray-600">
                                    View and track your orders, download
                                    invoices
                                </p>
                                <Link
                                    href="/user/orders"
                                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    View Orders
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
                            <div className="border-b bg-gray-50 p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Wishlist</h3>
                                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                        {dashboardData.wishListCount}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="mb-4 text-sm text-gray-600">
                                    View saved items and add to cart
                                </p>
                                <a
                                    href="#"
                                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    View Wishlist
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </a>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
                            <div className="border-b bg-gray-50 p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Addresses</h3>
                                    <i className="fas fa-map-marker-alt text-indigo-600"></i>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="mb-4 text-sm text-gray-600">
                                    Manage your shipping and billing addresses
                                </p>
                                <a
                                    href="#"
                                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    Manage Addresses
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Recent Orders --> */}
            <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
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
                            {dashboardData.recentOrders.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-indigo-600">
                                        No records Found
                                    </td>
                                </tr>
                            ) : (
                                dashboardData.recentOrders.map((order: any) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-indigo-600">
                                            {order.order_number}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {order.created_at}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`${getStatusBadgeClass(order.status)} rounded-full px-2 py-1 text-xs font-semibold`}
                                            >
                                                {order.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            ${order.total_price}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <Link
                                                href={`1/user/orders/${order.id}`}
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
                </div>
                <div className="border-t p-4">
                    <Link
                        href="/user/orders"
                        className="flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        View All Orders
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* <!-- Account Details --> */}
            <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                    <h2 className="text-lg font-semibold">Account Details</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-sm font-medium text-gray-500">
                                CONTACT INFORMATION
                            </h3>
                            <p className="text-gray-800">
                                {dashboardData.userAddress.name}
                            </p>
                            <p className="text-gray-800">
                                {dashboardData.userAddress.email}
                            </p>
                            <p className="text-gray-800">
                                {dashboardData.userAddress.phone}
                            </p>
                            <Link
                                href="/user/profile/edit"
                                className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                            >
                                Edit
                            </Link>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-medium text-gray-500">
                                BILLING ADDRESS
                            </h3>
                            <p className="text-gray-800">
                                {dashboardData.userAddress.name}
                            </p>
                            <p className="text-gray-800">
                                {dashboardData.userAddress.address || 'N/A'}
                            </p>

                            <Link
                                href="/user/addresses"
                                className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="mb-2 text-sm font-medium text-gray-500">
                            NEWSLETTERS
                        </h3>
                        <p className="text-gray-800">
                            You are currently subscribed to our newsletter.
                        </p>
                        <Link
                            href="#"
                            className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            Unsubscribe
                        </Link>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Dashboard;
