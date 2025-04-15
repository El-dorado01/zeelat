import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FormErrors, type Work } from '@/types';
import { Edit, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';

// Define form data type
interface WorkFormData {
  work_title: string;
  work_desc: string;
  image: File | string | null;
  work_url: string;
  _method: 'PUT';
}

// Define props interface
interface EditWorkFormProps {
  data: WorkFormData;
  setData: (key: keyof WorkFormData, value: WorkFormData[keyof WorkFormData]) => void;
  errors: FormErrors;
  processing: boolean;
  handleEditWork: () => void;
}

const EditWorkForm = ({ data, setData, errors, processing, handleEditWork }: EditWorkFormProps) => (
    <div className="container mx-auto">
        <Card className="w-full">
            <CardContent className="flex flex-col space-y-2">
                <div>
                    <Label htmlFor="name">Work Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter work name"
                        required
                        value={data.work_title || ''}
                        onChange={(e) => setData('work_title', e.target.value)}
                        className="mt-1 w-full"
                    />
                    {errors.work_title && <p className="mt-1 text-sm text-red-500">{errors.work_title}</p>}
                </div>
                <div>
                    <Label htmlFor="image">Work Image</Label>
                    <Input
                        id="image"
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        className="mt-1 w-full"
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>
                <div>
                    <Label htmlFor="image">Work URL</Label>
                    <Input
                        id="image"
                        type="url"
                        placeholder="https:// (optional)"
                        onChange={(e) => setData('work_url', e.target.value)}
                        className="mt-1 w-full"
                    />
                    {errors.work_url && <p className="mt-1 text-sm text-red-500">{errors.work_url}</p>}
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter work description..."
                        required
                        value={data.work_desc || ''}
                        onChange={(e) => setData('work_desc', e.target.value)}
                        className="mt-1 min-h-[100px] w-full"
                    />
                    {errors.work_desc && <p className="mt-1 text-sm text-red-500">{errors.work_desc}</p>}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled={processing} onClick={handleEditWork}>
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-1 animate-spin" />
                            Editing
                        </>
                    ) : (
                        <>
                            <Edit /> Edit
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    </div>
);

const WorkEdit = ({ work }: { work: Work }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const initialEditData = {
        work_title: work.work_title || '',
        work_desc: work.work_desc || '',
        image: work.image || '',
        work_url: work.work_url || '',
        _method: 'PUT',
    };

    const { handleRequest, processing, errors, data, setData } = usePost(
        route('works.update', work.id),
        initialEditData,
        {
            onSuccess: () => {
                setEditOpen(false);
            },
            onError: (errors: FormErrors) => {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'An error occurred');
            },
        },
        'POST',
    );

    const handleEditWork = () => {
        handleRequest(data);
    };

    return (
        <>
            {/* Edit Button and Form */}
            {isMobile ? (
                <Drawer open={editOpen} onOpenChange={setEditOpen}>
                    <DrawerTrigger asChild>
                        <Button className="w-full">
                            <Edit /> Edit Work
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Edit Work</DrawerTitle>
                            <DrawerDescription>Update the work's details below.</DrawerDescription>
                        </DrawerHeader>
                        <EditWorkForm data={data} setData={setData} errors={errors} processing={processing} handleEditWork={handleEditWork} />
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Edit /> Edit Work
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Work</DialogTitle>
                            <DialogDescription>Update the work's details below.</DialogDescription>
                        </DialogHeader>
                        <EditWorkForm data={data} setData={setData} errors={errors} processing={processing} handleEditWork={handleEditWork} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default WorkEdit;
