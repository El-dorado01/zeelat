import { studentsColumns } from '@/components/columns';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

const Students = () => {
    const { students, flash } = usePage<{ students: Student[]; flash: any }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={studentsColumns}
                    data={students}
                    defaultColumnVisibility={{
                        name: true,
                        // email: true,
                        student_id: true,
                        actions: true,
                        created_at: true,
                        gender: true,
                        phone_number: false,
                        next_of_kin_phone_number: false,
                    }}
                />
            </div>
            {flash?.success &&
                (() => {
                    toast.success(flash.success);
                })()}
        </AppLayout>
    );
};

export default Students;
