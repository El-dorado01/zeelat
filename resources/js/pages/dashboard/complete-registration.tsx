import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const CompleteRegistration = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CompleteRegistration" />
        </AppLayout>
    );
};

export default CompleteRegistration;
