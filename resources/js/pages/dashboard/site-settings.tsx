import AutoEnroll from '@/components/auto-enroll';
import EnableSiteSettings from '@/components/enable-site-settings';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SiteLogo from '@/components/site-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SiteSettingsLayout from '@/layouts/pageBuilder/site-settings-layout';
import { NavItem, type Site_Setting, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

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
        title: 'Contact Information',
        href: 'contact-information',
        icon: null,
    },
    {
        title: 'Site Logo',
        href: 'site-logo',
        icon: null,
    },
];

type ActiveEmailForm = {
    phone_number: string;
    active_email: string;
    address: string;
};

const SiteSettings = () => {
    const { site_settings, flash } = usePage<{
        flash: any;
        site_settings: Site_Setting | null;
    }>().props;

    const initialSiteSettings = {
        phone_number: site_settings?.phone_number ?? '',
        active_email: site_settings?.active_email ?? '',
        address: site_settings?.address ?? '',
    }

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ActiveEmailForm>>(initialSiteSettings);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if(data.active_email === '' && data.address === '' && data.phone_number === ''){
            // Can't leave any field unfilled
            return toast.error("You can't leave any of the fields empty!")
        }

        patch(route('site_settings.update', site_settings?.id), {
            preserveScroll: true,
            onError: () => {
                setData(initialSiteSettings)
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site settings" />

            {site_settings ? (
                <SiteSettingsLayout sidebarNavItems={sidebarNavItems} title="Site Settings" description="Update your site basic settings">
                    <AutoEnroll site_settings={site_settings} />
                    <div className="space-y-6" id="contact-information">
                        <HeadingSmall
                            title="Contact Information"
                            description="Provide an active email, phone number or address through which customers can contact you"
                        />
                        <Card className="w-full rounded-sm shadow-xs">
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone_number">Phone number</Label>

                                        <Input
                                            id="phone_number"
                                            // type="tel"
                                            className="mt-1 block w-full"
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            placeholder="Phone number"
                                        />

                                        <InputError className="mt-2" message={errors.phone_number} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.active_email}
                                            onChange={(e) => setData('active_email', e.target.value)}
                                            autoComplete="username"
                                            placeholder="Email address"
                                        />

                                        <InputError className="mt-2" message={errors.active_email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Address</Label>

                                        <Textarea
                                            id="address"
                                            // className="mt-1 block w-full"
                                            value={data.address || ''}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="mt-1 min-h-[100px] w-full"
                                            placeholder="Enter address..."
                                        />

                                        {/* <Label htmlFor="remarks">Remarks</Label>
                                <Textarea
                                    id="remarks"
                                    placeholder="Enter remarks..."
                                    value={data.remarks || ''}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    className="mt-1 min-h-[100px] w-full"
                                />
                                {err */}

                                        <InputError className="mt-2" message={errors.address} />
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
            {/* {flash?.success &&
                (() => {
                    toast.success(flash.success);
                })()} */}
        </AppLayout>
    );
};

export default SiteSettings;
