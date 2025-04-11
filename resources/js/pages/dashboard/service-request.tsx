import { serviceRequestsColumns } from '@/components/columns';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ServiceRequest } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service Request',
        href: '/service-request',
    },
];

const ServiceRequest = () => {
    const { serviceRequests, flash } = usePage<{
        serviceRequests: ServiceRequest[];
        flash: any;
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service Request" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={serviceRequestsColumns}
                    data={serviceRequests}
                    defaultColumnVisibility={{
                        customer_name: true,
                        email: true,
                        // service_type: true,
                        created_at: true,
                        actions: true,
                        service_desc: false,
                        phone_number: false,
                        hasDone: false,
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

export default ServiceRequest;
