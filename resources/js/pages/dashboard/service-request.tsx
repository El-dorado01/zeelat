import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const ServiceRequest = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ServiceRequest" />
        </AppLayout>
    );
};

export default ServiceRequest;
