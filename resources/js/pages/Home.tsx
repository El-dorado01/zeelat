import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Contact from '../components/page/Contact';
import Explore from '../components/page/Explore';
import Faq from '../components/page/Faq';
import Featured from '../components/page/Featured';
import Hero from '../components/page/Hero';
import Timeline from '../components/page/Timeline';
import PageLayout from '../layouts/page-layout';
import { type Services, type Alumni, type Site_Settings } from '@/types';

export default function Home() {
    const { alumni, site_settings, services } = usePage<{
        services: Services;
        site_settings: Site_Settings;
    }>().props;
    
    useEffect(() => {
        import('../lib/jquery.min').then(() => {
            import('../lib/bootstrap.bundle.min').then(() => {
                import('../lib/click-scroll').then(() => {
                    import('../lib/jquery.sticky').then(() => {
                        import('../lib/custom').then(() => {});
                    });
                });
            });
        });
    }, []);
    // useEffect(() => {
    //     Promise.all([
    //         import('../lib/jquery.min'),
    //         import('../lib/bootstrap.bundle.min'),
    //         import('../lib/click-scroll'),
    //         import('../lib/jquery.sticky'),
    //         import('../lib/custom'),
    //     ]).catch((error) => {
    //         console.error('Failed to load scripts:', error);
    //     });
    // }, []);

    return (
        <>
            <PageLayout site_settings={site_settings}>
                <Head title="Home" />
                <Hero />
                <Featured />
                <Explore alumni={alumni} services={services} />
                <Timeline />
                <Faq />
                <Contact site_settings={site_settings} />
            </PageLayout>
        </>
    );
}
