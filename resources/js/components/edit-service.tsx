import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FormErrors, Services } from '@/types';
import { Edit, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';

const ServiceEdit = ({ service }: { service: Services }) => {
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
        name: service.name || '',
        service_count: service.service_count,
        description: service.description || '',
        image: service.image || '',
        _method: 'PUT',
    };
    

    const { handleRequest, processing, errors, data, setData } = usePost(
        `/page-builder/services/${service.id}`,
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
            forceFormData: true, // Required for file uploads
        },
        'POST',
    );

    const handleEditService = () => {
        handleRequest(data);
    };

    const EditServiceForm = () => (
        <div className="container mx-auto">
            <Card className="w-full">
                <CardContent className="flex flex-col space-y-2">
                    <div>
                        <Label htmlFor="name">Service Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter service name"
                            required
                            value={data.name || ''}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="service_count">Service Count</Label>
                        <Input
                            id="service_count"
                            placeholder="Enter service count"
                            required
                            type='number'
                            value={data.service_count}
                            onChange={(e) => setData('service_count', e.target.value)}
                            className="mt-1 w-full"
                        />
                        {errors.service_count && <p className="mt-1 text-sm text-red-500">{errors.service_count}</p>}
                    </div>
                    <div>
                        <Label htmlFor="image">Service Image</Label>
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter service description..."
                            value={data.description || ''}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 min-h-[100px] w-full"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={processing} onClick={handleEditService}>
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

    return (
        <>
            {/* Edit Button and Form */}
            {isMobile ? (
                <Drawer open={editOpen} onOpenChange={setEditOpen}>
                    <DrawerTrigger asChild>
                        <Button className="w-full">
                            <Edit /> Edit Service
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Edit Service</DrawerTitle>
                            <DrawerDescription>Update the service's details below.</DrawerDescription>
                        </DrawerHeader>
                        <EditServiceForm />
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Edit /> Edit Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>Update the service’s details below.</DialogDescription>
                        </DialogHeader>
                        <EditServiceForm />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ServiceEdit;
