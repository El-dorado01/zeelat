import { CircleOff, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

import PageBuilderLayout from '@/layouts/pageBuilder/layout';
import { Services, type NavItem } from '@/types';
import { useState } from 'react';
import { Badge } from './ui/badge';
import ServiceEdit from './edit-service';
import DeleteService from './delete-service';

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

const ShowServices = ({ services }: { services: Services[] }) => {
    const [servicesArray, setServicesArray] = useState(services);
    return (
        <PageBuilderLayout
            sidebarNavItems={sidebarNavItems}
            title="List Services"
            description="This page displays and manages all the services offered"
        >
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <Card key={service.id} className="relative">
                                <Badge variant={'outline'} className="absolute top-3 right-3">
                                    {service.service_count}
                                </Badge>
                                <CardContent className="flex flex-grow flex-col items-center justify-center space-y-2 p-4">
                                    <div className="flex w-full flex-col">
                                        <h2 className="text-lg font-semibold">{service.name}</h2>
                                        <p className="text-muted-foreground text-sm">{service.description}</p>
                                    </div>
                                    <div className="h-[200px] w-full">
                                        <img src={'/storage/' + service.image} className="h-[100%] w-[100%] rounded-full object-cover" alt="" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-2">
                                    <ServiceEdit service={service} />
                                    <DeleteService service={service} />
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <Card className="flex h-[300px] w-full items-center justify-center rounded-xs shadow-xs border">
                            <CardContent className="text-muted-foreground flex justify-center items-center space-x-2">
                                <CircleOff className='h-5 w-5' />
                                <span> Nothing to show here</span>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </PageBuilderLayout>
    );
};

export default ShowServices;
