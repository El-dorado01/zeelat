import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ServiceRequest } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const ServiceRequestActions = ({ serviceRequest }: { serviceRequest: ServiceRequest }) => {
    const [viewOpen, setViewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const MessageViewContent = () => (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">{serviceRequest.service_type || 'No Service Type Selected'}</h2>
                <p className="mt-1 text-sm text-gray-500">
                    From:{' '}
                    <strong>
                        {serviceRequest.customer_name || 'Unknown'} &lt;{serviceRequest.email}&gt;
                    </strong>
                </p>
                {serviceRequest.phone_number && (
                    <p className="mt-1 text-sm text-gray-500">
                        Phone Number: <strong>{serviceRequest.phone_number}</strong>
                    </p>
                )}
            </div>

            {/* Message Body */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-700">Service Description</h3>
                <p className="mt-2 whitespace-pre-wrap text-gray-900">{serviceRequest.service_desc || 'No message content available.'}</p>
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
                        <a href={`mailto:${serviceRequest.email}`}>Send Response</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(serviceRequest.email);
                            toast.info('Copied to clipboard');
                        }}
                    >
                        Copy Email
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ServiceRequestActions;
