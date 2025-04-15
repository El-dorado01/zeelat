import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, type Alumni, type BreadcrumbItem, type Service, type Work } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AddService from '@/components/add-service';
import ShowAlumni from '@/components/show-alumni';
import ShowWorks from '@/components/show-works';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Page Builder',
        href: '/page-builder/alumni',
    },
];

const AddServices = () => {
    const { alumni, services, works, flash } = usePage<{
        alumni: PaginatedResponse<Alumni>;
        services: PaginatedResponse<Service>;
        works: PaginatedResponse<Work>;
        flash: { success?: string; error?: string };
    }>().props;

    // Track displayed flash messages
    const [displayedFlash, setDisplayedFlash] = useState<string | null>(null);

    // Handle flash messages
    useEffect(() => {
        if (flash?.success && flash.success !== displayedFlash) {
            toast.success(flash.success);
            setDisplayedFlash(flash.success);
        }
        if (flash?.error && flash.error !== displayedFlash) {
            toast.error(flash.error);
            setDisplayedFlash(flash.error);
        }
    }, [flash, displayedFlash]);

    // Set initial tab based on URL
    const getInitialTab = () => {
        return window.location.pathname === '/page-builder/services/add'
            ? 'services'
            : window.location.pathname === '/page-builder/works/add'
              ? 'works'
              : 'alumni';
    };
    const [activeTab, setActiveTab] = useState(getInitialTab());

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        const newUrl = value === 'alumni' ? '/page-builder/alumni' : value === 'services' ? '/page-builder/services/add' : '/page-builder/works';
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
            const tab =
                window.location.pathname === '/page-builder/services/add'
                    ? 'services'
                    : window.location.pathname === '/page-builder/works/add'
                      ? 'works'
                      : 'alumni';
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
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="alumni">Alumni</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="works">Works</TabsTrigger>
                    </TabsList>
                    <TabsContent value="alumni">
                        <ShowAlumni alumni={alumni.data} />
                    </TabsContent>
                    <TabsContent value="services">
                        <AddService />
                    </TabsContent>
                    <TabsContent value="works">
                        <ShowWorks works={works.data} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
};

export default AddServices;
