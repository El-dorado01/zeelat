import AutoEnroll from '@/components/auto-enroll';
import EnableSiteSettings from '@/components/enable-site-settings';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SiteLogo from '@/components/site-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SiteSettingsLayout from '@/layouts/pageBuilder/site-settings-layout';
import { NavItem, Site_Settings, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Site Settings',
        href: '/site-settings',
    },
];

const sidebarNavItems: NavItem[] = [
    {
        title: 'Automated Enrollments',
        href: 'auto-enroll',
        icon: null,
    },
    {
        title: 'Active Email',
        href: 'active-email',
        icon: null,
    },
    {
        title: 'Site Logo',
        href: 'site-logo',
        icon: null,
    },
];

type ActiveEmailForm = {
    active_email: string;
};

const SiteSettings = () => {
    const { site_settings, flash } = usePage<{
        flash: any;
        site_settings: Site_Settings | null;
    }>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ActiveEmailForm>>({
        active_email: site_settings?.active_email ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('site_settings.update', site_settings?.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site settings" />

            {site_settings ? (
                <SiteSettingsLayout sidebarNavItems={sidebarNavItems} title="Site Settings" description="Update your site basic settings">
                    <AutoEnroll site_settings={site_settings} />
                    <div className="space-y-6" id="active-email">
                        <HeadingSmall title="Active Email" description="Provide an active email through which customers can contact you" />
                        <Card className="w-full rounded-sm shadow-xs">
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.active_email}
                                            onChange={(e) => setData('active_email', e.target.value)}
                                            required
                                            autoComplete="username"
                                            placeholder="Email address"
                                        />

                                        <InputError className="mt-2" message={errors.active_email} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing}>Save</Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">Saved</p>
                                        </Transition>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <SiteLogo site_settings={site_settings} />
                </SiteSettingsLayout>
            ) : (
                <div className="flex h-full w-full items-center justify-center border p-4">
                    <EnableSiteSettings />
                </div>
            )}
        </AppLayout>
    );
};

export default SiteSettings;
