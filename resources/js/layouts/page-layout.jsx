// import '../css/bootstrap-icons.css';
import '#@/css/bootstrap-icons.css';
import '#@/css/bootstrap.min.css';
import '#@/css/templatemo-topic-listing.css';

import Footer from '../components/page/Footer';
import NavBar from '../components/page/NavBar';

const PageLayout = ({ children, site_settings }) => {
    return (
        <>
            <main>
                {/* <NavBar /> */}
                {children}
                <Footer site_settings={site_settings} />
            </main>
        </>
    );
};

export default PageLayout;
