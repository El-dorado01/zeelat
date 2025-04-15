import { useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';
import { Transition } from '@headlessui/react';
import { Button } from './ui/button';
import { useRef } from 'react';

export default function ChangeAvatar() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, reset, errors, clearErrors, recentlySuccessful } = useForm({
        avatar: null as File | null,
    });

    const changeAvatar = () => {

        post(route('profile.change-avatar'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Change avatar" description="Update your avatar" />
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="avatar" className="sr-only">
                        Avatar
                    </Label>

                    <Input
                        id="avatar"
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setData('avatar', e.target.files?.[0] || null)}
                        className="mt-1 w-full"
                    />

                    <InputError message={errors.avatar} />
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={changeAvatar} disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                </div>
            </div>
        </div>
    );
}
