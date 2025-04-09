import Heading from '@/components/page-builder-heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { useEffect, useState } from 'react';

type sidebarNavItemsProps = {
    children?: React.ReactNode;
    sidebarNavItems: NavItem[];
    title: string;
    description?: string;
};

export default function SiteSettingsLayout({ children, sidebarNavItems, title, description }: sidebarNavItemsProps) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

     const [currentPath, setCurrentPath] = useState(window.location.href.split('#')[1]);

     useEffect(() => {
         const handleHashChange = () => {
             setCurrentPath(window.location.href.split('#')[1]);
         };

         window.addEventListener('hashchange', handleHashChange);

         return () => {
             window.removeEventListener('hashchange', handleHashChange);
         };
     }, []); 

     useEffect(() => {
         getActiveTab(currentPath);
     }, [currentPath]);

     const getActiveTab = (e: string) => {
         if (currentPath === undefined && e === 'auto-enroll') {
             return true;
         }
         if (currentPath !== e) {
             return false;
         }
         return true;
     };


    return (
        <div className="px-4 py-6">
            <Heading title={title} description={description} />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.href}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': getActiveTab(item.href),
                                })}
                            >
                                <a href={'#' + item.href}>{item.title}</a>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
