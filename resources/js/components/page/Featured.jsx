import { ImageComponent } from "./Images";

const Featured = () => {
    return (
        <section className="featured-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 mb-lg-0 col-12 mb-4">
                        <div className="custom-block bg-white shadow-lg">
                            <a href="topics-detail.html">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Web Design</h5>

                                        <p className="mb-0">
                                            When you search for free CSS templates, you will notice that TemplateMo is one of the best websites.
                                        </p>
                                    </div>

                                    <span className="badge bg-design rounded-pill ms-auto">14</span>
                                </div>

                                <ImageComponent id="featured-1" />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12">
                        <div className="custom-block custom-block-overlay">
                            <div className="d-flex flex-column h-100">
                                <ImageComponent id="featured-2" />

                                <div className="custom-block-overlay-text d-flex">
                                    <div>
                                        <h5 className="mb-2 text-white">Finance</h5>

                                        <p className="text-white">
                                            Topic Listing Template includes homepage, listing page, detail page, and contact page. You can feel free
                                            to edit and adapt for your CMS requirements.
                                        </p>

                                        <a href="topics-detail.html" className="btn custom-btn mt-lg-3 mt-2">
                                            Learn More
                                        </a>
                                    </div>

                                    <span className="badge bg-finance rounded-pill ms-auto">25</span>
                                </div>

                                <div className="social-share d-flex">
                                    <p className="me-4 text-white">Share:</p>

                                    <ul className="social-icon">
                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi-twitter"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi-facebook"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi-pinterest"></a>
                                        </li>
                                    </ul>

                                    <a href="#" className="custom-icon bi-bookmark ms-auto"></a>
                                </div>

                                <div className="section-overlay"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
