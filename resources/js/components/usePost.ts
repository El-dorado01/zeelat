// components/usePost.ts
import { DeleteOptions } from '@/types';
import { useForm } from '@inertiajs/react';
// import { useState } from 'react';

export const usePost = (url: string, method: 'POST' | 'PATCH' = 'POST', editForm: any, options?: DeleteOptions) => {
    // const [processing, setProcessing] = useState(false);
    // const [errors, setErrors] = useState<any>({});

    const { data, setData, post, patch, delete: destroy, processing, errors } = useForm(editForm);

    // const handleRequest = async (data: any) => {
    //     setProcessing(true);
    //     setErrors({});
    //     try {
    //         const response = await fetch(url, {
    //             method,
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data),
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw errorData.errors || 'Failed to submit';
    //         }
    //         options.onSuccess?.();
    //     } catch (error: any) {
    //         setErrors(error);
    //         options.onError?.(error);
    //     } finally {
    //         setProcessing(false);
    //     }
    // };

    let handleRequest;

    if(method === "PATCH"){
        handleRequest = (data: any) => {
            patch(url, {
                preserveScroll: true,
                ...options,
            });
        };
    }else {
        handleRequest = (data: any) => {
            post(url, {
                preserveScroll: true,
                ...options,
            });
        };

    }


    return { handleRequest, processing, errors, data, setData };
};
