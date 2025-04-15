import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth, flash, quote } = usePage<{
        flash: { success?: string; error?: string };
        quote: { author: string; message: string };
        auth: {
            user: {
                avatar: string;
                email: string;
                email_verified_at: string;
                id: number;
                isAdmin: boolean;
                name: string;
                created_at: string;
                updated_at: string;
            };
        };
    }>().props;
    const user = auth.user;

    const getInitials = useInitials();
    const [displayedFlash, setDisplayedFlash] = useState<string | null>(null);

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="flex items-center justify-between rounded-xl border bg-white/10 dark:bg-neutral-900/10">
                    <CardContent>
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <Avatar className="h-24 w-24 overflow-hidden rounded-full">
                                <AvatarImage src={user.avatar && '/storage/' + user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start gap-4">
                                <div className="text-lg font-semibold">Welcome back, {user.name}!</div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm text-neutral-500">{quote.message}</div>
                                    <div className="self-end text-sm font-bold text-neutral-500 italic">~ {quote.author}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
