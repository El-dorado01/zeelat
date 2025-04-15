import { CircleOff } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';

import PageBuilderLayout from '@/layouts/pageBuilder/layout';
import { Service, type Work, type NavItem } from '@/types';
import { useState } from 'react';
import DeleteService from './delete-service';
import ServiceEdit from './edit-service';
import { Badge } from './ui/badge';
import WorkEdit from './edit-work';
import DeleteWork from './delete-work';

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

const ShowWorks = ({ works }: { works: Work[] }) => {
    const [worksArray, setWorksArray] = useState(works);
    return (
        <PageBuilderLayout
            sidebarNavItems={sidebarNavItems}
            title="List Works"
            description="This page displays and manages all your works you have done"
        >
            <div className="container mx-auto">
                {works.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                            {works.map((work) => (
                                <Card key={work.id} className="relative">
                                    <CardContent className="flex flex-grow flex-col items-center justify-center space-y-2 p-4">
                                        <div className="flex w-full flex-col">
                                            <h2 className="text-lg font-semibold">{work.work_title}</h2>
                                            <p className="text-muted-foreground text-sm">{work.work_desc}</p>
                                        </div>
                                        <div className="h-[200px] w-full">
                                            <img src={'/storage/' + work.image} className="h-[100%] w-[100%] rounded-sm object-cover" alt="" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col space-y-2">
                                        <WorkEdit work={work} />
                                        <DeleteWork work={work} />
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

export default ShowWorks;
