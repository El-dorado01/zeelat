import { contactsColumns } from '@/components/columns';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Contact, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

const Contacts = () => {
    const { contacts, flash } = usePage<{
        contacts: Contact[];
        flash: any;
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={contactsColumns}
                    data={contacts}
                    defaultColumnVisibility={{
                        name: true,
                        email: true,
                        subject: true,
                        actions: true,
                        created_at: false,
                        message: false,
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

export default Contacts;
