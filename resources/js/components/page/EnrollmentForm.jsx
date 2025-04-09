import { useForm, usePage } from '@inertiajs/react';
import Toast from './Toast';

const EnrollmentForm = () => {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/enrollments', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="custom-form mb-lg-0 mt-4 mb-5 pt-2" role="form">
                <div className="input-group input-group-lg">
                    <span className="input-group-text bi-envelope-fill"></span>

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

                    <button type="submit" className="form-control" disabled={processing}>
                        {processing ? 'Enrolling...' : 'Enroll'}
                    </button>
                </div>
            </form>
            {errors.email && <Toast message={errors.email} type="error" />}
            {flash?.success && <Toast message={flash.success} type="success" />}
        </>
    );
};

export default EnrollmentForm;
