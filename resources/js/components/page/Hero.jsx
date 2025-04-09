import EnrollmentForm from "./EnrollmentForm";

const Hero = () => {
    return (
        <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-12 mx-auto">
                        <h1 className="text-center text-white">Enroll. Learn. Enjoy</h1>

                        <h6 className="text-center">academy for creatives around the world</h6>

                        <EnrollmentForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
