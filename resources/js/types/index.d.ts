import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Enrollment {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
};

// Type for paginated response
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

// Define the options interface based on Inertia's usage
interface DeleteOptions {
    preserveScroll?: boolean;
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean | void;
    onFinish?: () => void;
    [key: string]: any; // Allow additional options
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
};

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    other_name?: string;
    gender: 'Male' | 'Female' | 'Other';
    phone_number?: string;
    student_id: string;
    address: string;
    next_of_kin_phone_number: string;
    next_of_kin_email?: string;
    relationship: 'Parent' | 'Spouse' | 'Sibling' | 'Guardian' | 'Other';
    user_id: number;
    image: string;
    user: User;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}