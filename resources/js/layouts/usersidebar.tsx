import { Link, usePage } from '@inertiajs/react';
import { BarChart3, ShoppingBag, User } from 'lucide-react';

const UserSidebar = () => {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const user = auth.user;
    const menuItems = [
        {
            icon: BarChart3,
            label: 'Dashboard',
            href: '/user/dashboard',
            active: true,
        },
        {
            icon: ShoppingBag,
            label: 'Orders',
            href: '/user/orders',
        },
        {
            icon: ShoppingBag,
            label: 'Wishlists',
            href: '/user/wishlists',
        },
        {
            icon: User,
            label: 'Account Details',
            href: '/user/account-details',
        },
    ];
    return (
        <div>
            <div className="sticky top-6 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                    <div className="flex items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-xl font-bold text-indigo-600">
                                {user?.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="ml-4">
                            <h2 className="font-medium">
                                {user?.name || 'User'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                    </div>
                </div>
                <nav className="p-2">
                    {menuItems.map((item) => {
                        const isActive =
                            url === item.href ||
                            (item.href !== '/user/dashboard' &&
                                url.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center rounded-md px-4 py-3 transition ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <item.icon className="mr-3 h-5 w-3" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="my-2 border-t"></div>
                    <a
                        href="#"
                        className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    >
                        <i className="fas fa-sign-out-alt mr-3 w-5"></i>
                        <span>Logout</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default UserSidebar;
