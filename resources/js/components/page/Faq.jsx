import ImageFAQ from '#@/images/faq_graphic.jpg';

const Faq = () => {
    return (
        <section className="faq-section section-padding" id="section_4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <h2 className="mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-lg-5 col-12">
                        <img src={ImageFAQ} className="img-fluid" alt="FAQs" />
                    </div>

                    <div className="col-lg-6 col-12 m-auto">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        What services do you offer?
                                    </button>
                                </h2>

                                <div
                                    id="collapseOne"
                                    className="accordion-collapse show collapse"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        We offer <strong>website design and development services</strong>, as well as{' '}
                                        <strong>enrollment management solutions.</strong>
                                        To get started, simply submit your email address to initiate the enrollment process or contact us to discuss
                                        your website design needs.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        How long does website design take?
                                    </button>
                                </h2>

                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        The timeframe for completing a website design project varies depending on the scope and complexity of the
                                        project. We work closely with our clients to ensure timely delivery, and our team is committed to meeting
                                        deadlines.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        Do you offer ongoing support and maintenance ?
                                    </button>
                                </h2>

                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        Yes, we offer ongoing support and maintenance for websites and enrolled programs. Our team is available to
                                        answer questions, provide updates, and ensure that your website or program continues to run smoothly.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
