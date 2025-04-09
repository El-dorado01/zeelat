import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Contact from '../components/page/Contact';
import Explore from '../components/page/Explore';
import Faq from '../components/page/Faq';
import Featured from '../components/page/Featured';
import Hero from '../components/page/Hero';
import Timeline from '../components/page/Timeline';
import PageLayout from '../layouts/page-layout';

export default function Home() {
    const { props } = usePage();
    
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

    return (
        <>
            <PageLayout title="This is a layout" site_settings={props.site_settings}>
                <Head title="Home" />
                <Hero />
                <Featured />
                <Explore alumni={props.alumni} services={props.services} />
                <Timeline />
                <Faq />
                <Contact site_settings={props.site_settings} />
            </PageLayout>
        </>
    );
}
