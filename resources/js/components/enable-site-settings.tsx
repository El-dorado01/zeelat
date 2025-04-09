import { useForm } from '@inertiajs/react';
import { Button } from './ui/button';

type EnableSiteSettingsForm = {
    auto_enroll: boolean;
    active_email: string;
};

const EnableSiteSettings = () => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<EnableSiteSettingsForm>>({
        auto_enroll: false,
        active_email: 'example@example.com',
    });

    const handleEnable = () => {
        post(route('site_settings.store'), {
            preserveScroll: true,
        });
    };

    return <Button onClick={handleEnable} disabled={processing}>Enable Site Settings</Button>;
};

export default EnableSiteSettings;
