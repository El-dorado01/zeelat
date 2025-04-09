import { FormErrors, ServiceRequest } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { Switch } from './ui/switch';
import { usePost } from './usePost';

const MarkAsDone = ({ serviceRequest }: { serviceRequest: ServiceRequest }) => {
    const hasDone = Boolean(serviceRequest.hasDone);

    const [hasDoneValue, setHasDoneValue] = useState(hasDone);

    const initialData = {
        customer_name: serviceRequest.customer_name,
        email: serviceRequest.email,
        phone_number: serviceRequest.phone_number,
        service_type: serviceRequest.service_type,
        service_desc: serviceRequest.service_desc,
        hasDone: hasDoneValue ? 1 : 0,
    };

    const { handleRequest, processing, errors, data, setData } = usePost(
        `service-request/${serviceRequest.id}`,
        initialData,
        {
            onSuccess: () => {
                //  setAlumniOpen(false);
            },
            onError: (errors: FormErrors) => {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'An error occurred');
            },
        },
        'PUT',
    );

    function handleCheckChange(checked: boolean) {
        setHasDoneValue(checked);
        const newData = { hasDone: checked ? 1 : 0 };
        handleRequest(newData);
    }

    return <Switch checked={hasDoneValue} onCheckedChange={handleCheckChange} disabled={processing} />;
};

export default MarkAsDone;
