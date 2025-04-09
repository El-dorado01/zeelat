import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Student } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import StudentDelete from './student-delete';
import { StudentViewDetails } from './student-view-details';
import { Button } from './ui/button';

export const StudentActions = ({ student }: { student: Student }) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* View Details */}
                    <StudentViewDetails student={student} />

                    <DropdownMenuItem>
                        <a href={`mailto:${student.user.email}`}>Send Email</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(student.user.email);
                            toast.info('Email copied to clipboard');
                        }}
                    >
                        Copy Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {/* Delete Student */}
                    <StudentDelete student={student} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
