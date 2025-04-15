import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { FormErrors, type Work } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useDelete } from './useDelete';

const DeleteWork = ({ work }: { work: Work }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const { handleDelete, deleteProcessing, deleteErrors } = useDelete(route('works.delete', work.id), {
        onSuccess: () => {
            setDeleteOpen(false);
        },
        onError: (errors: FormErrors) => {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || 'An error occurred');
        },
    });

    const handleDeleteWork = () => {
        setDeleteOpen(true);
    };

    return (
        <>
            {isMobile ? (
                <Drawer open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <Button className="w-full transition duration-300" variant="destructive" onClick={handleDeleteWork}>
                        Delete
                    </Button>

                    <DrawerContent className="p-4">
                        <DrawerHeader>
                            <DrawerTitle>Are you sure?</DrawerTitle>
                            <DrawerDescription>
                                This action cannot be undone. This will permanently delete <strong>{work.work_title}</strong> from the system.
                            </DrawerDescription>
                        </DrawerHeader>

                        <DrawerFooter>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                {deleteProcessing ? (
                                    <>
                                        <LoaderCircle className="animate-spin" />
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
                    <Button className="w-full transition duration-300" variant="destructive" onClick={handleDeleteWork}>
                        Delete
                    </Button>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete <strong>{work.work_title}</strong> from the system.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                {deleteProcessing ? (
                                    <>
                                        <LoaderCircle className="animate-spin" />
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

export default DeleteWork;
