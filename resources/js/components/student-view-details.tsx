import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ViewDetailsContent } from './view-details-content';
const StudentViewDetails = ({ student }: any) => {
    const [viewOpen, setViewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    return (
        <>
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
        </>
    );
};

export default StudentViewDetails;
