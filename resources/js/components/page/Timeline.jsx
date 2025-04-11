const Timeline = () => {
    return (
        <section className="timeline-section section-padding" id="section_3">
            <div className="section-overlay"></div>

            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="mb-4 text-white">How does it work?</h2>
                    </div>

                    <div className="col-lg-10 col-12 mx-auto">
                        <div className="timeline-container">
                            <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                                <div className="list-progress">
                                    <div className="inner"></div>
                                </div>

                                <li>
                                    <h4 className="mb-3 text-white">Submit your Email</h4>

                                    <p className="text-white" style={{ fontSize: '16px', lineHeight: '2rem' }}>
                                        Get started by submitting your email address. This will initiate the enrollment process, and you'll receive a
                                        confirmation message with further instructions. Please ensure you provide a valid email to receive important
                                        updates.
                                    </p>

                                    <div className="icon-holder">
                                        <i className="bi-envelope"></i>
                                    </div>
                                </li>

                                <li>
                                    <h4 className="mb-3 text-white">Check Email for Approval Message</h4>

                                    <p className="text-white" style={{ fontSize: '16px', lineHeight: '2rem' }}>
                                        After submitting your email, check your inbox for an approval message from us. This message will contain a
                                        link to verify your email address and proceed with the enrollment process. Please check your spam folder if
                                        you don't see it.
                                    </p>

                                    <div className="icon-holder">
                                        <i className="bi-person-rolodex"></i>
                                    </div>
                                </li>

                                <li>
                                    <h4 className="mb-3 text-white">Complete your Registration</h4>

                                    <p className="text-white" style={{ fontSize: '16px', lineHeight: '2rem' }}>
                                        Once you've verified your email address, you'll be able to login with your credentials to complete the
                                        registration process. Fill out the required information, set up your account and you're ready to go!
                                    </p>

                                    <div className="icon-holder">
                                        <i className="bi-book"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 mt-5 text-center">
                        <p className="text-white">
                            Want to learn more?
                            <a href="#section_5" className="btn custom-btn custom-border-btn click-scroll ms-3">
                                Contact Us
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
