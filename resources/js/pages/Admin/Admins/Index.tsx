import DataTable from '@/components/DataTables/DataTables';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
import { useEffect } from 'react';

export default function UserIndex() {
    const { admins, filters, can } = usePage().props;
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
        { key: 'avatar', label: 'Avatar', sortable: false, type: 'image', design: 'circle' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        console.log(id);
        router.delete(route('admin.admins.destroy', {admin:id}), {
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
    //     console.log(admins);
    // });
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={admins}
                        columns={columns}
                        resourceName="Admins"
                        singularName="Admin"
                        routeName="admin.admins.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={true}
                        canEditResource={true}
                        canDeleteResource={true}
                        createRoute='admin.admins.create'
                        viewRoute="admin.admins.show"
                        editRoute="admin.admins.edit"
                        onDelete={handleDelete}
                        icon={User}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
