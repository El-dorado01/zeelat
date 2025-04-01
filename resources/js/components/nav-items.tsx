import { type NavItem } from '@/types';
import { Contact, Folder, GraduationCap, HandHelping, LayoutGrid, ShieldCheck, UserRoundPlus, Wrench } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Contacts',
        href: '/contacts',
        icon: Contact,
    },
    {
        title: 'Enrollments',
        href: '/enrollments',
        icon: UserRoundPlus,
    },
    {
        title: 'Service Requests',
        href: '/service-request',
        icon: HandHelping,
    },
];

const studentNavItems: NavItem[] = [
    {
        title: 'Students',
        href: '/students',
        icon: GraduationCap,
    },
    {
        title: 'Complaints',
        href: '/students/complaints',
        icon: ShieldCheck,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Page Builder',
        href: '/page-builder/alumni',
        icon: Folder,
    },
    {
        title: 'Site Settings',
        href: '/site-settings',
        icon: Wrench,
    },
];

export { footerNavItems, mainNavItems, studentNavItems };
