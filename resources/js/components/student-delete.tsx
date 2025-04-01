import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ViewDetailsContent } from './view-details-content';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useDelete } from './useDelete';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const StudentDelete = ({student} : any) => {
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

    return (
        <>
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
                                This action cannot be undone. This will permanently delete {student.first_name} {student.last_name} from the system.
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
        </>
    );
};

export default StudentDelete;
