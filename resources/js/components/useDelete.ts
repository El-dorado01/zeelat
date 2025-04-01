// hooks/useDelete.ts
import { DeleteOptions } from '@/types';
import { useForm } from '@inertiajs/react';

export const useDelete = (url: string, options?: DeleteOptions) => {
    const { delete: destroy, processing, errors } = useForm();

    const handleDelete = () => {
        destroy(url, {
            preserveScroll: true, 
            ...options, 
        });
    };

    return { handleDelete, deleteProcessing: processing, deleteErrors: errors };
};
