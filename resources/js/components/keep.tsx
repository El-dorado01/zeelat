import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Student } from '@/types';
import { LoaderCircle, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useDelete } from './useDelete';
import { ViewDetailsContent } from './view-details-content';

interface StudentActionsProps<T> {
    student: T;
}

export const StudentActions = <T extends Student>({ student }: StudentActionsProps<T>) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const { handleDelete, deleteProcessing, deleteErrors } = useDelete(`/students/${student.id}`, {
        onSuccess: () => {
            setDeleteOpen(false);
            toast.success('Student deleted successfully');
        },
        onError: (errors) => {
            toast.error(Object.values(errors)[0]);
        },
    });

    // Enhanced card design for View Details
    // const ViewDetailsContent = () => (
    //     <div className="space-y-6">
    //         {/* Card Container */}
    //         <div className="overflow-hidden rounded-lg bg-white shadow-md">
    //             {/* Header with Image */}
    //             <div className="flex items-center gap-4 bg-gray-100 p-4">
    //                 {student.image ? (
    //                     <img src={student.image} alt={`${student.first_name} ${student.last_name}`} className="h-16 w-16 rounded-full object-cover" />
    //                 ) : (
    //                     <UserIcon className="h-16 w-16 text-gray-400" />
    //                 )}
    //                 <div>
    //                     <h2 className="text-xl font-semibold text-gray-900">
    //                         {`${student.first_name} ${student.last_name} ${student.other_name || ''}`}
    //                     </h2>
    //                     <p className="text-sm text-gray-500">Student ID: {student.student_id}</p>
    //                 </div>
    //             </div>

    //             {/* Personal Info */}
    //             <div className="border-t border-gray-200 p-4">
    //                 <h3 className="mb-2 text-lg font-medium text-gray-700">Personal Information</h3>
    //                 <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
    //                     <div>
    //                         <span className="font-medium">Gender:</span> {student.gender}
    //                     </div>
    //                     <div>
    //                         <span className="font-medium">Phone Number:</span> {student.phone_number}
    //                     </div>
    //                     <div className="sm:col-span-2">
    //                         <span className="font-medium">Address:</span> {student.address || 'Not provided'}
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* User Info */}
    //             <div className="border-t border-gray-200 bg-gray-50 p-4">
    //                 <h3 className="mb-2 text-lg font-medium text-gray-700">User Account</h3>
    //                 <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
    //                     <div>
    //                         <span className="font-medium">Email:</span> {student.user.email}
    //                     </div>
    //                     <div>
    //                         <span className="font-medium">Name:</span> {student.user.name}
    //                     </div>
    //                     <div>
    //                         <span className="font-medium">Email Verified:</span> {student.user.email_verified_at ? 'Yes' : 'No'}
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Next of Kin */}
    //             <div className="border-t border-gray-200 p-4">
    //                 <h3 className="mb-2 text-lg font-medium text-gray-700">Next of Kin</h3>
    //                 <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
    //                     <div>
    //                         <span className="font-medium">Phone Number:</span> {student.next_of_kin_phone_number}
    //                     </div>
    //                     <div>
    //                         <span className="font-medium">Email:</span> {student.next_of_kin_email || 'Not provided'}
    //                     </div>
    //                     <div>
    //                         <span className="font-medium">Relationship:</span> {student.relationship}
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Timestamps */}
    //             <div className="border-t border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
    //                 <p>Created: {new Date(student.created_at).toLocaleString()}</p>
    //                 <p>Updated: {new Date(student.updated_at).toLocaleString()}</p>
    //             </div>
    //         </div>
    //     </div>
    // );

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
                    {isMobile ? (
                        <Drawer open={viewOpen} onOpenChange={setViewOpen}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setViewOpen(true);
                                }}
                            >
                                View Details
                            </DropdownMenuItem>
                            <DrawerContent className="max-h-[80vh] overflow-y-auto p-4">
                                <DrawerHeader className="border-b pb-4">
                                    <DrawerTitle className="text-lg font-bold">Student Details</DrawerTitle>
                                    <DrawerDescription className="text-sm text-gray-500">View student information below.</DrawerDescription>
                                </DrawerHeader>
                                <div className="py-4">
                                    <ViewDetailsContent student={student} />
                                </div>
                                <DrawerFooter className="border-t pt-4">
                                    <Button variant="outline" onClick={() => setViewOpen(false)}>
                                        Close
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setViewOpen(true);
                                }}
                            >
                                View Details
                            </DropdownMenuItem>
                            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-bold">Student Details</DialogTitle>
                                    <DialogDescription className="text-sm text-gray-500">View student information below.</DialogDescription>
                                </DialogHeader>
                                <ViewDetailsContent student={student} />
                                <DialogFooter className="mt-6">
                                    <Button variant="outline" onClick={() => setViewOpen(false)}>
                                        Close
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

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
                    {isMobile ? (
                        <Drawer open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setDeleteOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                            <DrawerContent className="p-4">
                                <DrawerHeader>
                                    <DrawerTitle>Are you sure?</DrawerTitle>
                                    <DrawerDescription>
                                        This will permanently delete {student.first_name} {student.last_name}.
                                    </DrawerDescription>
                                </DrawerHeader>
                                {deleteErrors.email && <span className="text-red-500">{deleteErrors.email}</span>}
                                <DrawerFooter>
                                    <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                        {deleteProcessing ? (
                                            <>
                                                <LoaderCircle className="mr-2 animate-spin" />
                                                Deleting
                                            </>
                                        ) : (
                                            'Confirm'
                                        )}
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setDeleteOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete {student.first_name} {student.last_name} from the
                                        system.
                                    </DialogDescription>
                                </DialogHeader>
                                {deleteErrors.email && <span className="text-red-500">{deleteErrors.email}</span>}
                                <DialogFooter>
                                    <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                        {deleteProcessing ? (
                                            <>
                                                <LoaderCircle className="mr-2 animate-spin" />
                                                Deleting
                                            </>
                                        ) : (
                                            'Confirm'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
