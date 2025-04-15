import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Alumni, FormErrors } from '@/types';
import { LoaderCircle, UserMinus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useDelete } from './useDelete';

const AlumniDelete = ({ alumnus }: { alumnus: Alumni }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    // const [viewOpen, setViewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const { handleDelete, deleteProcessing, deleteErrors } = useDelete(`/page-builder/alumni/${alumnus.id}`, {
        onSuccess: () => {
            setDeleteOpen(false);
        },
        onError: (errors: FormErrors) => {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || 'An error occurred');
        },
    });

    return (
        <>
            {isMobile ? (
                <Drawer open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setDeleteOpen(true);
                        }}
                    >
                        <UserMinus className="mr-2" /> Remove
                    </Button>
                    <DrawerContent className="p-4">
                        <DrawerHeader>
                            <DrawerTitle>Are you sure?</DrawerTitle>
                            <DrawerDescription>
                                This action cannot be undone. This will permanently remove <strong>{alumnus.name}</strong> from alumni list.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                {deleteProcessing ? (
                                    <>
                                        <LoaderCircle className="mr-1 animate-spin" />
                                        Removing
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
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setDeleteOpen(true);
                        }}
                    >
                        <UserMinus className="mr-2" /> Remove
                    </Button>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently remove <strong>{alumnus.name}</strong> from alumni list.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleteProcessing}>
                                {deleteProcessing ? (
                                    <>
                                        <LoaderCircle className="mr-1 animate-spin" />
                                        Removing
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

export default AlumniDelete;
