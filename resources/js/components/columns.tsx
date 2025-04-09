import { Contact, Enrollment, ServiceRequest, Student } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import { ContactActions } from './contact-actions';
import { EnrollmentActions } from './enrollment-actions';
import { formatRelativeDateTime } from './format-date';
import MarkAsDone from './mark-as-done';
import { StudentActions } from './student-actions';
import { Button } from './ui/button';
import ServiceRequestActions from './service-request-actions';

export const enrollmentsColumns: ColumnDef<Enrollment>[] = [
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'created_at',
        header: () => <div>Created At</div>,
        cell: ({ row }) => {
            const createdAt = row.getValue('created_at') as string;
            const formatted = formatRelativeDateTime(createdAt);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const enrollment = row.original;
            return <EnrollmentActions enrollment={enrollment} />;
        },
    },
];

export const contactsColumns: ColumnDef<Contact>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ row }) => {
            const subject = row.getValue('subject') as string;
            const newSubject = subject.length > 30 ? subject.slice(0, 30) + '...' : subject;
            return <div>{newSubject}</div>;
        },
    },
    {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ row }) => {
            const message = row.getValue('message') as string;
            const newMessage = message.length > 50 ? message.slice(0, 50) + '...' : message;
            return <div>{newMessage}</div>;
        },
    },
    {
        accessorKey: 'created_at',
        header: () => <div>Received On</div>,
        cell: ({ row }) => {
            const createdAt = row.getValue('created_at') as string;
            const formatted = formatRelativeDateTime(createdAt);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const contact = row.original;
            return <ContactActions contact={contact} />;
        },
    },
];

export const studentsColumns: ColumnDef<Student>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const firstName = row.original.first_name;
            const lastName = row.original.last_name;
            const otherName = row.original.other_name;

            return <div className="font-medium">{`${firstName} ${lastName} ${otherName}`}</div>;
        },
    },
    {
        accessorKey: 'student_id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Student ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const email = row.original.user.email;

            return <div className="font-medium">{`${email}`}</div>;
        },
    },
    {
        accessorKey: 'gender',
        header: 'Gender',
    },
    {
        accessorKey: 'phone_number',
        header: 'Student Phone Number',
    },
    {
        accessorKey: 'next_of_kin_phone_number',
        header: 'Next of Kin Number',
    },
    {
        accessorKey: 'created_at',
        header: () => <div>Enrolled On</div>,
        cell: ({ row }) => {
            const createdAt = row.getValue('created_at') as string;
            const formatted = formatRelativeDateTime(createdAt);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const student = row.original;

            return <StudentActions student={student} />;
        },
    },
];

export const serviceRequestsColumns: ColumnDef<ServiceRequest>[] = [
    {
        accessorKey: 'customer_name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Customer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'phone_number',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Phone Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'service_type',
        header: 'Service Type',
        cell: ({ row }) => {
            const subject = row.getValue('service_type') as string;
            const newSubject = subject.length > 30 ? subject.slice(0, 30) + '...' : subject;
            return <div>{newSubject}</div>;
        },
    },
    {
        accessorKey: 'service_desc',
        header: 'Service Description',
        cell: ({ row }) => {
            const message = row.getValue('service_desc') as string;
            const newMessage = message.length > 50 ? message.slice(0, 50) + '...' : message;
            return <div>{newMessage}</div>;
        },
    },
    {
        accessorKey: 'created_at',
        header: () => <div>Received On</div>,
        cell: ({ row }) => {
            const createdAt = row.getValue('created_at') as string;
            const formatted = formatRelativeDateTime(createdAt);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'hasDone',
        header: () => <div>Is Done</div>,
        cell: ({ row }) => {
            const serviceRequest = row.original;
            return <MarkAsDone serviceRequest={serviceRequest} />;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const serviceRequest = row.original;
            return <ServiceRequestActions serviceRequest={serviceRequest} />;
        },
    },
];
