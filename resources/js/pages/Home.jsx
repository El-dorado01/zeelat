import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Contact from '../components/page/Contact';
import Explore from '../components/page/Explore';
import Faq from '../components/page/Faq';
import Featured from '../components/page/Featured';
import Hero from '../components/page/Hero';
import Timeline from '../components/page/Timeline';
import PageLayout from '../layouts/page-layout';

export default function Home() {
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
            <PageLayout title="This is a layout">
                <Head title="Home" />
                <Hero />
                <Featured />
                <Explore />
                <Timeline />
                <Faq />
                <Contact />
            </PageLayout>
        </>
    );
}
