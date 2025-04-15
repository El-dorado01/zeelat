import { AppLogoIcon } from "./Images";

const Footer = ({ site_settings }) => {
    const getFullYear = () => {
        return new Date().getFullYear()
    }
    return (
        <footer className="site-footer section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12 mb-4 pb-2">
                        <a className="navbar-brand" href="/" style={{ display: 'flex', gap: '2px' }}>
                            <div style={{ width: '45px', height: '40px' }}>
                                <AppLogoIcon />
                            </div>
                            <span style={{ marginTop: '5px' }}>ZCA</span>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-4 col-6">
                        <h6 className="site-footer-title mb-3">Resources</h6>

                        <ul className="site-footer-links">
                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">
                                    Home
                                </a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">
                                    How it works
                                </a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">
                                    FAQs
                                </a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-4 mb-lg-0 col-6 mb-4">
                        <h6 className="site-footer-title mb-3">Information</h6>

                        <p className="d-flex mb-1 text-white">
                            <a href={'tel:' + site_settings.phone_number ? site_settings.phone_number : '081_****_****'} className="site-footer-link">
                                {site_settings.phone_number ? site_settings.phone_number : '081_****_****'}
                            </a>
                        </p>

                        <p className="d-flex text-white">
                            <a href={site_settings ? site_settings.active_email : 'info@company.com'} className="site-footer-link">
                                {site_settings ? site_settings.active_email : 'info@company.com'}
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-4 mt-lg-0 col-12 ms-auto mt-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                English
                            </button>

                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" type="button">
                                        Thai
                                    </button>
                                </li>

                                <li>
                                    <button className="dropdown-item" type="button">
                                        Myanmar
                                    </button>
                                </li>

                                <li>
                                    <button className="dropdown-item" type="button">
                                        Arabic
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <p className="copyright-text mt-lg-5 mt-4">
                            Copyright © {getFullYear()} Zeelat Computer Academy. All rights reserved.
                            <br />
                            <br />
                            Coded:{' '}
                            <a rel="nofollow" href="https://eldorado-iota.vercel.app" target="_blank">
                                El Dorado
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
