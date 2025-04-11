import { ImageComponent } from './Images';
import SharedButtons from './SharedButtons';

const Featured = ({ services, student_count }) => {
    return (
        <section className="featured-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 mb-lg-0 col-12 mb-4">
                        <div className="custom-block bg-white shadow-lg">
                            <a>
                                <div className="d-flex">
                                    <div>
                                        <h5 className="mb-2">Web Design</h5>

                                        <p className="mb-0" style={{ fontSize: '16px' }}>
                                            Crafting digital experiences that amaze. Discover our web design services.
                                        </p>
                                    </div>

                                    <span className="badge bg-design rounded-pill ms-auto">
                                        {services.length > 0
                                            ? services.map((service) => (service.name == 'Web Design' ? service.service_count : 14))
                                            : 14}
                                    </span>
                                </div>

                                <ImageComponent id="featured-1" />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12">
                        <div className="custom-block custom-block-overlay">
                            <div className="d-flex flex-column h-100">
                                <ImageComponent id="featured-3" />

                                <div className="custom-block-overlay-text d-flex">
                                    <div>
                                        <h5 className="mb-2 text-white">Student Enrollment</h5>

                                        <p className="text-white" style={{ fontSize: '16px' }}>
                                            Unlock your potential: Enroll now and start your journey to academic excellence! Discover new
                                            opportunities, explore your passions, and achieve your goals with our comprehensive programs and expert
                                            guidance.
                                        </p>

                                        {/* <a href="topics-detail.html" className="btn custom-btn mt-lg-3 mt-2">
                                            Learn More
                                        </a> */}
                                    </div>

                                    <span className="badge bg-finance rounded-pill ms-auto">{student_count >=25 ? student_count: 25}</span>
                                </div>

                                <SharedButtons />

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
