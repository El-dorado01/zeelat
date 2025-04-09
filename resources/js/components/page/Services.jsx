import { CircleSlash2 } from "lucide-react";

const Services = ({ services }) => {
    return (
        <>
            {services.length > 0 ? (
                <div className="row">
                    {services.map((service) => (
                        <div key={service.id} className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                            <div className="custom-block bg-white shadow-lg">
                                <a>
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2">{service.name}</h5>

                                            <p className="mb-0" style={{ fontSize: '14px' }}>
                                                {service.description}
                                            </p>
                                        </div>

                                        <span className="badge bg-design rounded-pill ms-auto">{service.service_count}</span>
                                    </div>
                                    <img
                                        src={service.image.startsWith('http') ? service.image : '/storage/' + service.image}
                                        className="custom-block-image img-fluid"
                                        alt={'Services - ' + service.name}
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="empty-display">
                        <CircleSlash2 />
                        <span>Nothing to display here.</span>
                    </div>
                </>
            )}
        </>
    );
};

export default Services;
