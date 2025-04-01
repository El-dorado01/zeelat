import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useDelete } from './useDelete';
import { toast } from 'sonner';
import { useForm } from '@inertiajs/react';

interface DeleteProps<T> {
    enrollment: T;
}

export const EnrollmentActions = <T extends { id: number; email: string }>({ enrollment }: DeleteProps<T>) => {
    const [open, setOpen] = useState(false);

    const { handleDelete, deleteProcessing, deleteErrors } = useDelete(`/enrollments/${enrollment.id}`, {
        onSuccess: () => {
            setOpen(false); ;
        },
        onError(errors) {
            toast.error(errors[0])
        },
    });

    const { post, processing, errors } = useForm({
        'action': "approve"
    });
    const handleApprove = () => {
        post(`/enrollments/approve/${enrollment.id}`, {
            preserveScroll: true,
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleApprove} disabled={processing}>
                        {processing ? (
                            <>
                                <span>Approving</span> <LoaderCircle className="animate-spin" />
                            </>
                        ) : (
                            'Approve'
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(enrollment.email);
                            toast.info('Copied to clipboard');
                        }}
                    >
                        Copy Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem asChild className="bg-red-500 transition duration-200">
                            <Button variant="destructive" className="w-full">
                                Delete
                            </Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this enrollment data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                        {deleteProcessing ? (
                            <>
                                <span>Deleting</span> <LoaderCircle className="animate-spin" />
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
