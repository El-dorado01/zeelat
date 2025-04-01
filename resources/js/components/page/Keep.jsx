import { ImageComponent } from './Images';

const Explore = () => {
    return (
        <section className="explore-section section-padding" id="section_2">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="mb-4">Browse Topics</h2>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="design-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#design-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="design-tab-pane"
                                aria-selected="true"
                            >
                                Design
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="marketing-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#marketing-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="marketing-tab-pane"
                                aria-selected="false"
                            >
                                Marketing
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="finance-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#finance-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="finance-tab-pane"
                                aria-selected="false"
                            >
                                Finance
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="music-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#music-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="music-tab-pane"
                                aria-selected="false"
                            >
                                Music
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="education-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#education-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="education-tab-pane"
                                aria-selected="false"
                            >
                                Education
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" tabindex="0">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 mb-lg-0 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Web Design</h5>

                                                        <p className="mb-0">Topic Listing Template based on Bootstrap 5</p>
                                                    </div>

                                                    <span className="badge bg-design rounded-pill ms-auto">14</span>
                                                </div>

                                                <ImageComponent id="explore-1" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 mb-lg-0 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Graphic</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-design rounded-pill ms-auto">75</span>
                                                </div>

                                                <ImageComponent id="explore-2" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-12">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Logo Design</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-design rounded-pill ms-auto">100</span>
                                                </div>

                                                <ImageComponent id="explore-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="marketing-tab-pane" role="tabpanel" aria-labelledby="marketing-tab" tabindex="0">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Advertising</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-advertising rounded-pill ms-auto">30</span>
                                                </div>

                                                <ImageComponent id="explore-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Video Content</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-advertising rounded-pill ms-auto">65</span>
                                                </div>

                                                <ImageComponent id="explore-5" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-12">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Viral Tweet</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-advertising rounded-pill ms-auto">50</span>
                                                </div>

                                                <ImageComponent id="explore-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="finance-tab-pane" role="tabpanel" aria-labelledby="finance-tab" tabindex="0">
                                {' '}
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mb-lg-0 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Investment</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-finance rounded-pill ms-auto">30</span>
                                                </div>

                                                <ImageComponent id="explore-7" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="custom-block custom-block-overlay">
                                            <div className="d-flex flex-column h-100">
                                                <ImageComponent id="explore-8" />

                                                <div className="custom-block-overlay-text d-flex">
                                                    <div>
                                                        <h5 className="mb-2 text-white">Finance</h5>

                                                        <p className="text-white">
                                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint animi necessitatibus
                                                            aperiam repudiandae nam omnis
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

                            <div className="tab-pane fade" id="music-tab-pane" role="tabpanel" aria-labelledby="music-tab" tabindex="0">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Composing Song</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-music rounded-pill ms-auto">45</span>
                                                </div>

                                                <ImageComponent id="explore-9" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Online Music</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-music rounded-pill ms-auto">45</span>
                                                </div>

                                                <ImageComponent id="explore-10" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-12">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Podcast</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-music rounded-pill ms-auto">20</span>
                                                </div>

                                                <ImageComponent id="explore-11" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="education-tab-pane" role="tabpanel" aria-labelledby="education-tab" tabindex="0">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Graduation</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-education rounded-pill ms-auto">80</span>
                                                </div>

                                                <ImageComponent id="explore-12" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a href="topics-detail.html">
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Educator</h5>

                                                        <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                                                    </div>

                                                    <span className="badge bg-education rounded-pill ms-auto">75</span>
                                                </div>

                                                <ImageComponent id="explore-13" />
                                            </a>
                                        </div>
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

export default Explore;
