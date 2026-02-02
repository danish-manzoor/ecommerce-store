import EcomLayout from './ecom-layout';
import UserSidebar from './usersidebar';
interface UserLayoutProps {
    children: React.ReactNode;
    title?: string;
}
const UserLayout = ({
    children,
    title = 'my Account title',
}: UserLayoutProps) => {
    return (
        <EcomLayout>
            {/* <!-- Breadcrumb --> */}
            <div className="bg-gray-100 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <a href="index.html" className="hover:text-indigo-600">
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800">My Account</span>
                    </div>
                </div>
            </div>
            {/* <!-- Main Content Area --> */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-2xl font-bold">My Account</h1>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* <!-- Sidebar Navigation --> */}
                    <div className="lg:w-1/4">
                        <UserSidebar />
                    </div>

                    {/* <!-- Main Dashboard Content --> */}
                    <div className="lg:w-3/4">{children}</div>
                </div>
            </div>
        </EcomLayout>
    );
};

export default UserLayout;
