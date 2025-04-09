import { AppLogoIcon } from './Images';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="/" style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '45px', height: '40px' }}>
                        <AppLogoIcon />
                    </div>
                    <span style={{ marginTop: '5px' }}>ZCA</span>
                </a>

                <div className="d-lg-none ms-auto me-4">
                    <a href="/login" className="navbar-icon bi-person smoothscroll"></a>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbarNav">
                    <ul className="navbar-nav ms-lg-5 me-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_1">
                                Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_2">
                                Services & Solutions
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_3">
                                How it works
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_4">
                                FAQs
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_5">
                                Contact
                            </a>
                        </li>

                        {/* <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarLightDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Pages
                            </a>

                            <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                <li>
                                    <a className="dropdown-item" href="topics-listing.html">
                                        Topics Listing
                                    </a>
                                </li>

                                <li>
                                    <a className="dropdown-item" href="contact.html">
                                        Contact Form
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                    </ul>

                    <div className="d-none d-lg-block">
                        <a href="/login" className="navbar-icon bi-person smoothscroll"></a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
