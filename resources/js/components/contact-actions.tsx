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
import { LoaderCircle, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useDelete } from './useDelete';

interface ContactProps<T> {
    contact: T;
}

// Extend T with name, subject, and message
export const ContactActions = <T extends { id: number; email: string; name?: string; subject?: string; message?: string }>({
    contact,
}: ContactProps<T>) => {
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

    const { handleDelete, deleteProcessing, deleteErrors } = useDelete(`/contacts/${contact.id}`, {
        onSuccess: () => {
            setDeleteOpen(false);
        },
        onError: (errors) => {
            toast.error(Object.values(errors)[0]);
        },
    });

    // Shared content for Drawer and Dialog
    const MessageViewContent = () => (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">{contact.subject || 'No Subject'}</h2>
                <p className="mt-1 text-sm text-gray-500">
                    From: {contact.name || 'Unknown'} &lt;{contact.email}&gt;
                </p>
            </div>

            {/* Message Body */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-700">Message</h3>
                <p className="mt-2 whitespace-pre-wrap text-gray-900">{contact.message || 'No message content available.'}</p>
            </div>

        </div>
    );

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

                    {/* View Message */}
                    {isMobile ? (
                        <Drawer open={viewOpen} onOpenChange={setViewOpen}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setViewOpen(true);
                                }}
                            >
                                View Message
                            </DropdownMenuItem>
                            <DrawerContent className="p-4">
                                <DrawerHeader className="border-b pb-4">
                                    <DrawerTitle className="text-lg font-bold">Message Details</DrawerTitle>
                                    <DrawerDescription className="text-sm text-gray-500">View the full message below.</DrawerDescription>
                                </DrawerHeader>
                                <div className="py-4">
                                    <MessageViewContent />
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
                                View Message
                            </DropdownMenuItem>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-bold">Message Details</DialogTitle>
                                    <DialogDescription className="text-sm text-gray-500">View the full message below.</DialogDescription>
                                </DialogHeader>
                                <MessageViewContent />
                                <DialogFooter className="mt-6">
                                    <Button variant="outline" onClick={() => setViewOpen(false)}>
                                        Close
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

                    <DropdownMenuItem>
                        <a href={`mailto:${contact.email}`}>Reply</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(contact.email);
                            toast.info('Copied to clipboard');
                        }}
                    >
                        Copy Email
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Delete */}
                    {isMobile ? (
                        <Drawer open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <DropdownMenuItem
                                asChild
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setDeleteOpen(true);
                                }}
                            >
                                <Button variant="destructive" className="w-full transition duration-300">
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Are you sure?</DrawerTitle>
                                    <DrawerDescription>
                                        This action cannot be undone. This will permanently delete this message from our servers.
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
                                asChild
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setDeleteOpen(true);
                                }}
                            >
                                <Button variant="destructive" className="w-full transition duration-300">
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete this message from our servers.
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
