import { enrollmentsColumns } from '@/components/columns';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, type BreadcrumbItem, type Enrollment } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enrollments',
        href: '/enrollments',
    },
];

const EnrollmentsPage = () => {
    const { enrollments, flash } = usePage<{
        enrollments: Enrollment[],
        flash: any
    }>().props;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollments" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={enrollmentsColumns} data={enrollments} />
            </div>
            {flash?.success &&
                (() => {
                    toast.success(flash.success);
                })()}
        </AppLayout>
    );
};

export default EnrollmentsPage;
