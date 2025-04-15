import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Alumni } from '@/types';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatRelativeDateTime } from './format-date';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const AlumniViewDetails = ({ alumnus }: { alumnus: Alumni }) => {
    const [viewOpen, setViewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const AlumnusDetails = () => {
        return (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[200px_1fr] sm:grid-rows-[auto_auto]">
                <div className="w-full sm:row-span-2">
                    <img
                        src={alumnus.image.startsWith('http') ? alumnus.image : '/storage/' + alumnus.image}
                        className="h-auto max-h-[200px] w-full rounded-tl-lg rounded-br-lg object-cover"
                        alt=""
                    />
                </div>
                <div className="w-full space-y-0.5 rounded-tr-lg rounded-bl-lg border p-3 shadow-sm shadow-blue-300">
                    <h2 className="text-xl font-semibold tracking-tight">{alumnus.name}</h2>
                    <p className="text-muted-foreground text-sm">
                        <strong>{alumnus.email}</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                        <strong>{alumnus.phone_number}</strong>
                    </p>
                    {alumnus.graduated_on && (
                        <p className="text-muted-foreground text-sm">
                            <strong> Graduated On: {formatRelativeDateTime(alumnus.graduated_on)}</strong>
                        </p>
                    )}
                </div>
                <div className="w-full rounded-tl-lg rounded-br-lg border p-3 shadow-sm shadow-amber-300">
                    <p className="text-muted-foreground text-sm">
                        <strong>{alumnus.remarks}</strong>
                    </p>
                </div>
            </div>
        );
    };
    return (
        <>
            {isMobile ? (
                <Drawer open={viewOpen} onOpenChange={setViewOpen}>
                    <Button
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewOpen(true);
                        }}
                    >
                        <Eye className="mr-2" /> View Alumni
                    </Button>
                    <DrawerContent className="max-h-[80vh] overflow-y-auto p-4">
                        <DrawerHeader className="border-b pb-4">
                            <DrawerTitle className="text-lg font-bold">Alumni Details</DrawerTitle>
                            <DrawerDescription className="text-sm text-gray-500">View alumni information below.</DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className="overflow-y-auto">
                            <AlumnusDetails />
                        </ScrollArea>
                        <DrawerFooter className="border-t pt-4">
                            <Button variant="outline" onClick={() => setViewOpen(false)}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                    <Button
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewOpen(true);
                        }}
                    >
                        <Eye className="mr-2" /> View Alumni
                    </Button>
                    <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold">Alumni Details</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">View alumni information below.</DialogDescription>
                        </DialogHeader>
                        <AlumnusDetails />
                        <DialogFooter className="mt-6">
                            <Button variant="outline" onClick={() => setViewOpen(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

// export default StudentViewDetails;
