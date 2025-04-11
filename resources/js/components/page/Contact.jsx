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

                        <p>Orita Aje, Iludun Osogbo, Osun State</p>

                        <hr />

                        <p className="d-flex align-items-center mb-1">
                            <span className="me-2">Phone</span>

                            <a href="tel: 080-5192-9719" className="site-footer-link">
                                080-5192-9719
                            </a>
                        </p>

                        <p className="d-flex align-items-center">
                            <span className="me-2">Email</span>

                            <a href={site_settings.length > 0 ? site_settings.active_email : 'info@company.com'} className="site-footer-link">
                                {site_settings.length > 0 ? site_settings.active_email : 'info@company.com'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
