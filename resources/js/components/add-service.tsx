import PageBuilderLayout from '@/layouts/pageBuilder/layout';
import { FormErrors, type NavItem } from '@/types';
import { LoaderCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Services',
        href: '/page-builder/services',
        icon: null,
    },
    {
        title: 'Add Services',
        href: '/page-builder/services/add',
        icon: null,
    },
];

const AddService = () => {
    const initialData = {
        name: '',
        image: '',
        description: '',
        service_count: 0,
    };

    const { handleRequest, processing, errors, data, setData } = usePost(
        `/page-builder/services`,
        initialData,
        {
            onSuccess: () => {
                // Reset form fields
                setData(initialData);
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

    return (
        <PageBuilderLayout sidebarNavItems={sidebarNavItems} title="Add Services" description="This page allows you to add a new service">
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
                        <Button className="w-full" disabled={processing} onClick={handleRequest}>
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-1 animate-spin" />
                                    Adding
                                </>
                            ) : (
                                <>
                                    <Plus /> Add
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </PageBuilderLayout>
    );
};

export default AddService;
