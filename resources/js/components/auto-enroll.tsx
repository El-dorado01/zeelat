import { FormErrors, Site_Settings } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import HeadingSmall from './heading-small';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { usePost } from './usePost';

const AutoEnroll = ({ site_settings }: { site_settings: Site_Settings }) => {
    const [siteSettings, setSiteSettings] = useState(site_settings);

    const initialData = {
        id: site_settings.id,
        auto_enroll: site_settings.auto_enroll,
    };
    const { handleRequest, processing, errors, data, setData } = usePost(
        route('site_settings.update', siteSettings.id),
        initialData,
        {
            onError: (errors: FormErrors) => {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'An error occurred');

                // Revert local state on error
                setSiteSettings(siteSettings);
            },
        },
        'PATCH',
    );

    const handleAutoEnroll = (settings: Site_Settings) => {
        setSiteSettings({ ...settings, auto_enroll: !settings.auto_enroll });

        const newAutoEnroll = !settings.auto_enroll;
        setData('id', settings.id);
        setData('auto_enroll', newAutoEnroll);

        handleRequest({ id: settings.id, auto_enroll: newAutoEnroll });
    };

    return (
        <div className="space-y-6" id="auto-enroll">
            <HeadingSmall title="Automated Enrollment" description="Accept new enrollments automatically" />
            <Card className="w-full rounded-sm shadow-xs">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <h3>Enable Auto-enrollment</h3>
                        <div className="flex items-center space-x-2 text-sm">
                            <span>Off</span>
                            <Switch
                                className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
                                checked={siteSettings.auto_enroll}
                                onCheckedChange={() => handleAutoEnroll(siteSettings)}
                                disabled={processing}
                            />
                            <span>On</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AutoEnroll;
