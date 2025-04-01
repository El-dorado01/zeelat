import ContactForm from "./ContactForm";

const Contact = () => {
    return (
        <section className="contact-section section-padding section-bg" id="section_5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12 text-center">
                        <h2 className="mb-5">Get in touch</h2>
                    </div>

                    <ContactForm />

                    <div className="col-lg-3 col-md-6 mb-lg- mb-md-0 col-12 ms-auto mb-3">
                        <h4 className="mb-3">Head office</h4>

                        <p>Bay St &amp;, Larkin St, San Francisco, CA 94109, United States</p>

                        <hr />

                        <p className="d-flex align-items-center mb-1">
                            <span className="me-2">Phone</span>

                            <a href="tel: 305-240-9671" className="site-footer-link">
                                305-240-9671
                            </a>
                        </p>

                        <p className="d-flex align-items-center">
                            <span className="me-2">Email</span>

                            <a href="mailto:info@company.com" className="site-footer-link">
                                info@company.com
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12 mx-auto">
                        <h4 className="mb-3">Dubai office</h4>

                        <p>Burj Park, Downtown Dubai, United Arab Emirates</p>

                        <hr />

                        <p className="d-flex align-items-center mb-1">
                            <span className="me-2">Phone</span>

                            <a href="tel: 110-220-3400" className="site-footer-link">
                                110-220-3400
                            </a>
                        </p>

                        <p className="d-flex align-items-center">
                            <span className="me-2">Email</span>

                            <a href="mailto:info@company.com" className="site-footer-link">
                                info@company.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
