import Alumni from './Alumni';
import { ImageComponent } from './Images';
import Services from './Services';

const Explore = ({ alumni, services }) => {
    return (
        <section className="explore-section section-padding" id="section_2">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="mb-4">Services & Solutions</h2>
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
                                Services
                            </button>
                        </li>

                        {/* <li className="nav-item" role="presentation">
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
                        </li> */}

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
                                Alumni
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
                                Enrollment
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" tabIndex="0">
                                <Services services={services} />
                            </div>

                            <div className="tab-pane fade" id="music-tab-pane" role="tabpanel" aria-labelledby="music-tab" tabIndex="0">
                                <Alumni alumni={alumni} />
                            </div>

                            <div className="tab-pane fade" id="education-tab-pane" role="tabpanel" aria-labelledby="education-tab" tabIndex="0">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mb-lg-3 col-12 mb-4">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a>
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Graduation</h5>

                                                        <p className="mb-0">More than 20 students have been graduated. </p>
                                                    </div>

                                                    <span className="badge bg-education rounded-pill ms-auto">80</span>
                                                </div>

                                                <ImageComponent id="explore-12" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="custom-block bg-white shadow-lg">
                                            <a>
                                                <div className="d-flex">
                                                    <div>
                                                        <h5 className="mb-2">Physical Classes</h5>

                                                        <p className="mb-0">Real time lessons on our comprehensive programs and expert guidance.</p>
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
