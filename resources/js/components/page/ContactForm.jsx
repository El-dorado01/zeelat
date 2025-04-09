import { useForm, usePage } from '@inertiajs/react';
import Toast from './Toast';

const ContactForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <>
            <div className="col-lg-7 mb-lg-0 col-12 mb-4">
                <form onSubmit={handleSubmit} className="custom-form contact-form" role="form">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                />

                                <label htmlFor="floatingInput">Name</label>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-12" style={{ gap: '0' }}>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    id="email"
                                    pattern="[^ @]*@[^ @]*"
                                    className="form-control"
                                    placeholder="Email address"
                                    required
                                />

                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                        </div>

                        <div className="col-lg-12 col-12">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    name="subject"
                                    id="name"
                                    className="form-control"
                                    placeholder="Subject"
                                    required
                                />

                                <label htmlFor="floatingInput">Subject</label>
                            </div>

                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    id="message"
                                    name="message"
                                    placeholder="Your Message..."
                                ></textarea>

                                <label htmlFor="floatingTextarea">Your Message...</label>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12 ms-auto">
                            <button type="submit" className="form-control" disabled={processing}>
                                {processing ? <>Submitting...</> : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {errors.name && <Toast message={errors.name} type="error" />}
            {errors.email && <Toast message={errors.email} type="error" />}
            {errors.subject && <Toast message={errors.subject} type="error" />}
            {errors.message && <Toast message={errors.message} type="error" />}
            {flash?.success && <Toast message={flash.success} type="success" />}
        </>
    );
};

export default ContactForm;
