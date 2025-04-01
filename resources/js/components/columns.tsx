import { Contact, Enrollment, Student } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { ContactActions } from './contact-actions';
import { EnrollmentActions } from './enrollment-actions';
import { formatRelativeDateTime } from './format-date';
import { Button } from './ui/button';
import { ArrowUpDown } from 'lucide-react';
import { StudentActions } from './student-actions';

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
