import { DeleteOptions } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
// import { useState } from 'react';

export const usePost = (url: string, formData: any, options?: DeleteOptions, method: 'POST' | 'PATCH' | 'PUT' = 'POST') => {
    const { data, setData, post, put, patch, delete: destroy, processing: formProcessing, errors, setError, recentlySuccessful } = useForm(formData);
    const [putProcessing, setPutProcessing] = useState(false);

    let handleRequest;

    if (method === 'PUT') {
        handleRequest = (updatedData?: any) => {
            const requestData = updatedData !== undefined ? { ...data, ...updatedData } : data;

            router.put(url, requestData, {
                preserveScroll: true,
                ...options,
                onStart: () => {
                    setPutProcessing(true); // Set processing to true for PUT
                },
                onFinish: () => {
                    setPutProcessing(false); // Reset processing when done
                },
                onError: (err) => {
                    setError(err); // Sync errors with useForm
                    if (options?.onError) options.onError(err);
                },
            });
        };
    } 
    else if(method === "PATCH"){
        handleRequest = (requestData: any) => {
            
            //     patch(url, {
            //         preserveScroll: true,
            //         ...options,
            //     });
            router.patch(url, requestData, {
                preserveScroll: true,
                ...options,
                onStart: () => {
                    setPutProcessing(true); // Set processing to true for PUT
                },
                onFinish: () => {
                    setPutProcessing(false); // Reset processing when done
                },
                onError: (err) => {
                    setError(err); // Sync errors with useForm
                    if (options?.onError) options.onError(err);
                },
            });
        };
    }
    else {
        handleRequest = () => {            
            post(url, {
                preserveScroll: true,
                ...options,
            });
        };
    }

    // Use formProcessing for POST, putProcessing for PUT
    const processing = method === 'PUT' ? putProcessing : method === 'PATCH' ? putProcessing : formProcessing;

    return { handleRequest, processing, errors, data, setData, recentlySuccessful };
};
