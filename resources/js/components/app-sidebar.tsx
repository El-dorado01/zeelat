import { NavFooter } from '@/components/nav-footer';
import { NavMain, NavStudents } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';
import { footerNavItems, mainNavItems, studentNavItems, userNavItems } from './nav-items';

export function AppSidebar() {
    const { auth } = usePage<{
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

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.isAdmin ? (
                    <>
                        <NavMain items={mainNavItems} />
                        <NavStudents items={studentNavItems} />
                    </>
                ) : (
                    <>
                        <NavMain items={userNavItems} />
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                {auth.user.isAdmin && (
                    <>
                        <NavFooter items={footerNavItems} className="mt-auto" />
                    </>
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
