import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    product_sku: string;
    product_image: string;
    unit_price: number;
    total_price: number;
    quantity: number;
    variation_data: any;
    notes: string | null;
    product: {
        id: number;
        name: string;
        slug: string;
        image: string;
    } | null;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
    payment_method: string;
    total_price: number;
    subtotal: number;
    tax_amount: number;
    shipping_amount: number;
    discount_amount: number;
    created_at: string;
    estimated_delivery: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    tracking_number: string | null;
    shipping_method: string;
    customer_notes: string | null;
    billing_first_name: string;
    billing_last_name: string;
    billing_email: string;
    billing_phone: string;
    billing_address: string;
    billing_city: string;
    billing_state: string;
    billing_zip: string;
    billing_country: string;
    billing_full_name: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
    shipping_full_name: string;
    is_shipping_same_as_billing: boolean;
    order_items: OrderItem[];
}

interface Props {
    order: Order;
}

const Show = ({ order }: Props) => {
    const getStatusColor = (status: string) => {
        const statusColors: { [key: string]: string } = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            refunded: 'bg-gray-100 text-gray-800',
        };
        return (
            statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
        );
    };

    const getPaymentStatusColor = (status: string) => {
        const statusColors: { [key: string]: string } = {
            paid: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800',
            refunded: 'bg-gray-100 text-gray-800',
        };
        return (
            statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <UserLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Order Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Order #{order.order_number}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Placed on {order.created_at}
                            </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}
                            >
                                {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                            </span>
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}
                            >
                                {order.payment_status.charAt(0).toUpperCase() +
                                    order.payment_status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Order Summary */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Order Summary
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                <div>
                                    <p className="text-gray-600">
                                        Payment Method
                                    </p>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {order.payment_method
                                            .charAt(0)
                                            .toUpperCase() +
                                            order.payment_method.slice(1)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">
                                        Shipping Method
                                    </p>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {order.shipping_method}
                                    </p>
                                </div>
                                {order.estimated_delivery && (
                                    <div>
                                        <p className="text-gray-600">
                                            Estimated Delivery
                                        </p>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {order.estimated_delivery}
                                        </p>
                                    </div>
                                )}
                                {order.shipped_at && (
                                    <div>
                                        <p className="text-gray-600">
                                            Shipped On
                                        </p>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {order.shipped_at}
                                        </p>
                                    </div>
                                )}
                                {order.delivered_at && (
                                    <div>
                                        <p className="text-gray-600">
                                            Delivered On
                                        </p>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {order.delivered_at}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {order.customer_notes && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <p className="text-sm text-gray-600">
                                        Customer Notes
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {order.customer_notes}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Shipping & Tracking */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Shipping Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                                        Shipping Address
                                    </h3>
                                    <div className="text-sm text-gray-900">
                                        <p className="font-medium">
                                            {order.shipping_full_name}
                                        </p>
                                        <p className="mt-1">
                                            {order.shipping_address}
                                        </p>
                                        <p>
                                            {order.shipping_city},{' '}
                                            {order.shipping_state}{' '}
                                            {order.shipping_zip}
                                        </p>
                                        <p>{order.shipping_country}</p>
                                    </div>
                                </div>

                                {!order.is_shipping_same_as_billing && (
                                    <div className="border-t border-gray-200 pt-4">
                                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                                            Billing Address
                                        </h3>
                                        <div className="text-sm text-gray-900">
                                            <p className="font-medium">
                                                {order.billing_full_name}
                                            </p>
                                            <p className="mt-1">
                                                {order.billing_address}
                                            </p>
                                            <p>
                                                {order.billing_city},{' '}
                                                {order.billing_state}{' '}
                                                {order.billing_zip}
                                            </p>
                                            <p>{order.billing_country}</p>
                                        </div>
                                    </div>
                                )}

                                {order.tracking_number && (
                                    <div className="border-t border-gray-200 pt-4">
                                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                                            Tracking Information
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                {order.tracking_number}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        order.tracking_number!,
                                                    )
                                                }
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Order Items
                            </h2>
                            <div className="space-y-4">
                                {order.order_items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            {item.product?.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <svg
                                                        className="h-8 w-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <div>
                                                    {item.product ? (
                                                        <Link
                                                            href={`/products/${item.product.slug}`}
                                                            className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                        >
                                                            {item.product_name}
                                                        </Link>
                                                    ) : (
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item.product_name}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        SKU: {item.product_sku}
                                                    </p>
                                                    {item.variation_data && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            {Object.entries(
                                                                item.variation_data,
                                                            ).map(
                                                                ([
                                                                    key,
                                                                    value,
                                                                ]) => (
                                                                    <span
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="mr-3"
                                                                    >
                                                                        {key}:{' '}
                                                                        {String(
                                                                            value,
                                                                        )}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                    {item.notes && (
                                                        <p className="mt-1 text-sm text-gray-600 italic">
                                                            Note: {item.notes}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatCurrency(
                                                            item.total_price,
                                                        )}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {formatCurrency(
                                                            item.unit_price,
                                                        )}{' '}
                                                        × {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Totals Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Order Totals
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {formatCurrency(order.subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {formatCurrency(order.shipping_amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium text-gray-900">
                                        {formatCurrency(order.tax_amount)}
                                    </span>
                                </div>
                                {order.discount_amount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Discount
                                        </span>
                                        <span className="font-medium text-green-600">
                                            -
                                            {formatCurrency(
                                                order.discount_amount,
                                            )}
                                        </span>
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-base font-semibold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-base font-semibold text-gray-900">
                                            {formatCurrency(order.total_price)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="mb-3 text-sm font-medium text-gray-900">
                                    Contact Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <p className="text-gray-600">Email</p>
                                        <p className="text-gray-900">
                                            {order.billing_email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Phone</p>
                                        <p className="text-gray-900">
                                            {order.billing_phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href="/user/orders"
                                    className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-center font-medium text-gray-900 transition-colors hover:bg-gray-200"
                                >
                                    Back to Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Show;
