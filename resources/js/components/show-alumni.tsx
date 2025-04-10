import PageBuilderLayout from '@/layouts/pageBuilder/layout';
import { Alumni, FormErrors, type NavItem } from '@/types';
import { CircleOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AlumniDelete from './alumni-delete';
import { ALumniViewDetails } from './alumnus-show';
import { Card, CardContent, CardFooter } from './ui/card';
import { Switch } from './ui/switch';
import { usePost } from './usePost';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Alumni',
        href: '/page-builder/alumni',
        icon: null,
    },
    {
        title: 'Add Alumni',
        href: '/page-builder/alumni/add',
        icon: null,
    },
];

const ShowAlumni = ({ alumni }: { alumni: Alumni[] }) => {
    const [alumniArray, setAlumniArray] = useState(alumni);

    const initialData = {
        id: '',
        isDisplayed: false,
    };
    const { handleRequest, processing, errors, data, setData } = usePost(
        '/page-builder/alumni/display',
        initialData,
        {
            onError: (errors: FormErrors) => {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'An error occurred');

                // Revert local state on error
                setAlumniArray(alumniArray.map((a) => (a.id === data.id ? { ...a, isDisplayed: !a.isDisplayed } : a)));
            },
        },
        'PATCH',
    );

    const handleDisplayAlumni = (alumnus: Alumni) => {
        setAlumniArray(alumniArray.map((a) => (a.id === alumnus.id ? { ...a, isDisplayed: !a.isDisplayed } : a)));

        const newIsDisplayed = !alumnus.isDisplayed;
        setData('id', alumnus.id);
        setData('isDisplayed', newIsDisplayed);

        handleRequest({ id: alumnus.id, isDisplayed: newIsDisplayed });
    };
    return (
        <PageBuilderLayout sidebarNavItems={sidebarNavItems} title="List Alumni" description="This page displays and manages all the alumni">
            <div className="container mx-auto">
                {alumniArray.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                            {alumniArray.map((alumnus) => (
                                <Card key={alumnus.id} className="relative flex w-full flex-col">
                                    <Switch
                                        className="absolute top-3 right-3 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
                                        title="Toggle Display"
                                        checked={alumnus.isDisplayed}
                                        onCheckedChange={() => handleDisplayAlumni(alumnus)}
                                        disabled={processing}
                                    />
                                    <CardContent className="flex flex-grow flex-col items-center justify-center space-y-2 p-4">
                                        <div className="h-[100px] w-[100px] rounded-full">
                                            <img
                                                src={alumnus.image.startsWith('http') ? alumnus.image : '/storage/' + alumnus.image}
                                                className="h-[100%] w-[100%] rounded-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-0 text-center">
                                            <h4 className="text-lg font-semibold uppercase">{alumnus.name}</h4>
                                            <p className="text-muted-foreground text-sm">{alumnus.email}</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col justify-between space-y-2 p-4">
                                        <ALumniViewDetails alumnus={alumnus} />
                                        <AlumniDelete alumnus={alumnus} />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <Card className="flex h-[300px] w-full items-center justify-center rounded-xs border shadow-xs">
                        <CardContent className="text-muted-foreground flex items-center justify-center space-x-2">
                            <CircleOff className="h-5 w-5" />
                            <span> Nothing to show here</span>
                        </CardContent>
                    </Card>
                )}
            </div>
        </PageBuilderLayout>
    );
};

export default ShowAlumni;
