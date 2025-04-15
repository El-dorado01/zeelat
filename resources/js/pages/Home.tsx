import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Contact from '../components/page/Contact';
import Explore from '../components/page/Explore';
import Faq from '../components/page/Faq';
import Featured from '../components/page/Featured';
import Hero from '../components/page/Hero';
import Timeline from '../components/page/Timeline';
import PageLayout from '../layouts/page-layout';
import { type Alumni, type Service, type Site_Setting } from '@/types';

export default function Home() {
    const { alumni, site_settings, services, student_count } = usePage<{
        alumni: Alumni[];
        services: Service[];
        site_settings: Site_Setting;
        student_count: number;
    }>().props;    
    
    useEffect(() => {
        const loadScripts = async () => {
            try {
                await import('../lib/bootstrap.bundle.min.js');
                await import('../lib/click-scroll.js');
                await import('../lib/jquery.sticky.js');
                await import('../lib/custom.js');
                // console.log('Scripts loaded successfully');
            } catch (error) {
                console.error('Failed to load scripts:', error);
            }
        };

        loadScripts();
    }, []);

    return (
        <>
            <PageLayout site_settings={site_settings}>
                <Head title="Home" />
                <Hero />
                <Featured services={services} student_count={student_count} />
                <Explore alumni={alumni} services={services} />
                <Timeline />
                <Faq />
                <Contact site_settings={site_settings} />
            </PageLayout>
        </>
    );
}
