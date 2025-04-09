import { CircleSlash2 } from "lucide-react";

const Alumni = ({ alumni }) => {
    return (
        <>
            {alumni.length > 0 ? (
                    <div className="row">
                        {alumni.map((alumnus) => (
                            <div key={alumnus.id} className="col-lg-4 col-md-6 mb-lg-3 col-12 mb-4">
                                <div className="custom-block bg-white shadow-lg">
                                    <a>
                                        <div className="d-flex">
                                            <div>
                                                <h5 className="mb-2">{alumnus.name}</h5>

                                                <p className="mb-0" style={{ fontSize: '14px' }}>
                                                    {alumnus.remarks}
                                                </p>
                                            </div>
                                        </div>
                                        <img
                                            src={alumnus.image.startsWith('http') ? alumnus.image : '/storage/' + alumnus.image}
                                            className="custom-block-image img-fluid"
                                            style={{ borderRadius: '10px' }}
                                            alt={'Alumni - ' + alumnus.name}
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

export default Alumni;
