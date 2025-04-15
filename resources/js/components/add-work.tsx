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
        title: 'Works',
        href: '/page-builder/works',
        icon: null,
    },
    {
        title: 'Add Works',
        href: '/page-builder/works/add',
        icon: null,
    },
];

const AddWork = () => {
    const initialData = {
        work_title: '',
        image: '',
        work_desc: '',
        work_url: '',
    };

    const { handleRequest, processing, errors, data, setData } = usePost(
        route('works.store'),
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
        <PageBuilderLayout sidebarNavItems={sidebarNavItems} title="Add Works" description="This page allows you to add a new work">
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
                                type='url'
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

export default AddWork;
