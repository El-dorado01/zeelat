import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const SiteSettings = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SiteSettings" />
        </AppLayout>
    );
};

export default SiteSettings;
