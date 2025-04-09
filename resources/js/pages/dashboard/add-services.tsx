import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Services, type Alumni, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AddAlumnus from '@/components/add-alumnus';
import ShowServices from '@/components/show-services';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import ShowAlumni from '@/components/show-alumni';
import AddService from '@/components/add-service';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Page Builder',
        href: '/page-builder/alumni',
    },
];

const AddServices = () => {
    const { alumni, services, flash } = usePage<{
        alumni: PaginatedResponse<Alumni>;
        services: PaginatedResponse<Services>;
        flash: any;
    }>().props;

    // Set initial tab based on URL
    const getInitialTab = () => {
        return window.location.pathname === '/page-builder/services/add' ? 'services' : 'alumni';
    };
    const [activeTab, setActiveTab] = useState(getInitialTab());

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        const newUrl = value === 'alumni' ? '/page-builder/alumni' : '/page-builder/services/add';
        router.replace({
            url: newUrl,
            preserveState: true, // Keep current props
            preserveScroll: true, // Prevent scroll reset
        });
        setActiveTab(value); // Sync state
    };

    // Sync tab with URL changes (e.g., back/forward navigation)
    useEffect(() => {
        const handlePopState = () => {
            const tab = window.location.pathname === '/page-builder/services/add' ? 'services' : 'alumni';
            setActiveTab(tab);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Services" />

            <div className="px-4 py-6">
                <Heading title="Page Builder" description="Customize and manage your website landing page" />

                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="alumni">Alumni</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                    </TabsList>
                    <TabsContent value="alumni">
                        <ShowAlumni alumni={alumni.data} />
                    </TabsContent>
                    <TabsContent value="services">
                        <AddService />
                    </TabsContent>
                </Tabs>
            </div>

            {flash?.success &&
                (() => {
                    toast.success(flash.success);
                })()}
        </AppLayout>
    );
};

export default AddServices;
