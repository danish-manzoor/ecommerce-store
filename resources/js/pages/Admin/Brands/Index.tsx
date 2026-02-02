import DataTable from '@/components/DataTables/DataTables';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { TagIcon, User } from 'lucide-react';
import { useEffect } from 'react';

export default function UserIndex() {
    const { brands, filters, can } = usePage().props;
    const columns = [
        {
            key: 'index',
            label: '#',
            sortable: false,
            type: 'IndexColumn',
            width: '80px',
            render: (item: any, index: number) => {
                return (filters.page - 1) * filters.perPage + index + 1;
            },
        },
        { key: 'image', label: 'Image', sortable: false, type: 'image', design: 'rec' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'slug', label: 'Slug', sortable: false },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        console.log(id);
        router.delete(route('admin.brands.destroy', {brand:id}), {
            preserveScroll: true,
            onSuccess: () => {
                // toast.success('User deleted successfully');
            },
            onError: () => {
                // toast.error('User deletion failed');
            },
        });
    };
    // useEffect(()=>{
    //     console.log(categories);
    // });
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={brands}
                        columns={columns}
                        resourceName="brands"
                        singularName="Brand"
                        routeName="admin.brands.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={true}
                        canEditResource={true}
                        canDeleteResource={true}
                        createRoute='admin.brands.create'
                        viewRoute="admin.brands.show"
                        editRoute="admin.brands.edit"
                        onDelete={handleDelete}
                        icon={TagIcon}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
