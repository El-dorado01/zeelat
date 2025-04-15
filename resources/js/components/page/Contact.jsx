import ContactForm from './ContactForm';

const Contact = ({ site_settings }) => {
    return (
        <section className="contact-section section-padding section-bg" id="section_5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12 text-center">
                        <h2 className="mb-5">Get in touch</h2>
                    </div>

                    <ContactForm />

                    <div className="col-lg-4 col-md-6 col-12 mx-auto">
                        <h4 className="mb-3">Head office</h4>

                        <p>{site_settings.address ? site_settings.address : '23 Address, street example, Nigeria.'}</p>

                        <hr />

                        <p className="d-flex align-items-center mb-1">
                            <span className="me-2">Phone</span>

                            <a href={'tel:' + site_settings.phone_number ? site_settings.phone_number : '081_****_****'} className="site-footer-link">
                                {site_settings.phone_number ? site_settings.phone_number : '081_****_****'}
                            </a>
                        </p>

                        <p className="d-flex align-items-center">
                            <span className="me-2">Email</span>

                            <a
                                href={'mailto:' + site_settings.active_email ? site_settings.active_email : 'info@company.com'}
                                className="site-footer-link"
                            >
                                {site_settings.active_email ? site_settings.active_email : 'info@company.com'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
