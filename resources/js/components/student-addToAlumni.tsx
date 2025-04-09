// components/StudentAddToAlumni.tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';
import { useEffect, useState } from 'react';
import { FormErrors, Student } from '@/types';
import { toast } from 'sonner';

export const StudentAddToAlumni = ({ student, setViewOpen }: { student: Student; setViewOpen: (open: boolean) => void }) => {
    const [alumniOpen, setAlumniOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const initialAlumniData = {
        student_id: student.student_id,
        name: student.user.name,
        email: student.user.email,
        phone_number: student.phone_number,
        remarks: remarks,
        image: student.image,
        graduated_on: new Date().toISOString(),
    };

    const { handleRequest, processing, errors, data, setData } = usePost(`page-builder/alumni`, initialAlumniData, {
        onSuccess: () => {
            setAlumniOpen(false);
            setViewOpen(false);
        },
        onError: (errors: FormErrors) => {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || 'An error occurred');
        },
    });

    // Sync remarks with form data
    useEffect(() => {
        setData('remarks', remarks);
    }, [remarks, setData]);

    return (
        <>
            {isMobile ? (
                <Drawer open={alumniOpen} onOpenChange={setAlumniOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="default" className="md:hidden">
                            Add to Alumni
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Add to Alumni</DrawerTitle>
                            <DrawerDescription>Enter remarks for adding this student to the alumni list.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">
                            <Textarea
                                placeholder="Enter your remarks here..."
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleRequest} disabled={processing}>
                                {processing ? (
                                    <>
                                        <LoaderCircle className="mr-1 animate-spin" />
                                        Submitting
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={alumniOpen} onOpenChange={setAlumniOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="hidden md:block">
                            Add to Alumni
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add to Alumni</DialogTitle>
                            <DialogDescription>Enter remarks for adding this student to the alumni list.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Textarea
                                placeholder="Enter your remarks here..."
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleRequest} disabled={processing}>
                                {processing ? (
                                    <>
                                        <LoaderCircle className="mr-1 animate-spin" />
                                        Submitting
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                            <Button variant="outline" onClick={() => setAlumniOpen(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};
