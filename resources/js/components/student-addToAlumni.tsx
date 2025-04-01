// components/StudentAddToAlumni.tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';
import { useState } from 'react';
import { Student } from '@/types';

interface StudentAddToAlumniProps {
    student: Student;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isMobile: boolean;
}

export const StudentAddToAlumni = ({ student, open, onOpenChange, isMobile }: StudentAddToAlumniProps) => {
    const [alumniForm, setAlumniForm] = useState({
        name: `${student.first_name} ${student.last_name} ${student.other_name || ''}`.trim(),
        email: student.user.email,
        phone_number: String(student.phone_number),
        remarks: '',
        image: student.image,
        graduated_on: '',
    });

    const { handleRequest, processing, errors } = usePost('/alumni', 'POST', alumniForm, {
        onSuccess: () => onOpenChange(false),
        onError: () => null, // Toast handled in StudentActions
    });

    const AlumniFormContent = () => (
        <div className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={alumniForm.name}
                    onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    value={alumniForm.email}
                    onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
            <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                    id="phone_number"
                    value={alumniForm.phone_number}
                    onChange={(e) => setAlumniForm({ ...alumniForm, phone_number: e.target.value })}
                    className={errors.phone_number ? 'border-red-500' : ''}
                />
            </div>
            <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                    id="remarks"
                    value={alumniForm.remarks}
                    onChange={(e) => setAlumniForm({ ...alumniForm, remarks: e.target.value })}
                    className={errors.remarks ? 'border-red-500' : ''}
                />
                {errors.remarks && <span className="text-sm text-red-500">{errors.remarks}</span>}
            </div>
            <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                    id="image"
                    value={alumniForm.image}
                    onChange={(e) => setAlumniForm({ ...alumniForm, image: e.target.value })}
                    className={errors.image ? 'border-red-500' : ''}
                />
                {errors.image && <span className="text-sm text-red-500">{errors.image}</span>}
            </div>
            <div>
                <Label htmlFor="graduated_on">Graduated On</Label>
                <Input
                    id="graduated_on"
                    value={alumniForm.graduated_on}
                    onChange={(e) => setAlumniForm({ ...alumniForm, graduated_on: e.target.value })}
                    placeholder="e.g., 2023-05-15"
                />
            </div>
        </div>
    );

    return isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[80vh] overflow-y-auto p-4">
                <DrawerHeader>
                    <DrawerTitle>Add to Alumni</DrawerTitle>
                    <DrawerDescription>
                        Add {student.first_name} {student.last_name} to alumni.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="py-4">
                    <AlumniFormContent />
                </div>
                <DrawerFooter>
                    <Button onClick={() => handleRequest(alumniForm)} disabled={processing}>
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 animate-spin" />
                                Adding
                            </>
                        ) : (
                            'Add'
                        )}
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add to Alumni</DialogTitle>
                    <DialogDescription>
                        Add {student.first_name} {student.last_name} to alumni.
                    </DialogDescription>
                </DialogHeader>
                <AlumniFormContent />
                <DialogFooter>
                    <Button onClick={() => handleRequest(alumniForm)} disabled={processing}>
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 animate-spin" />
                                Adding
                            </>
                        ) : (
                            'Add'
                        )}
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
