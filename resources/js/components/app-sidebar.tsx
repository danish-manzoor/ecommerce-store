import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Diamond,
    LayoutGrid,
    ShoppingBag,
    TagIcon,
    User,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBag,
    },
    {
        title: 'Brand',
        href: '/admin/brands',
        icon: TagIcon,
    },
    {
        title: 'Category',
        href: '/admin/categories',
        icon: TagIcon,
    },
    {
        title: 'Product',
        href: '/admin/products',
        icon: Diamond,
    },
    {
        title: 'User',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Admin',
        href: '/admin/admins',
        icon: User,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('admin.dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
