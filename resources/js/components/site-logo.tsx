import React, { FormEventHandler } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Transition } from '@headlessui/react';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import HeadingSmall from './heading-small';
import { FormErrors, Site_Setting } from '@/types';
import { useForm } from '@inertiajs/react';
import InputError from './input-error';
import { usePost } from './usePost';
import { toast } from 'sonner';


const SiteLogo = ({site_settings}:{site_settings: Site_Setting}) => {
    const initialSiteLogoData = {
        site_logo: site_settings.site_logo || '',
        _method: 'PATCH',
    };

    const { handleRequest, processing, errors, data, setData, recentlySuccessful } = usePost(
        route('site_settings.update', site_settings.id),
        initialSiteLogoData,
        {
            onSuccess: () => {
                // setEditOpen(false);
            },
            onError: (errors: FormErrors) => {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'An error occurred');
            },
            forceFormData: true, // Required for file uploads
        },
        'POST',
    );

    const handleEditSiteLogo = () => {
        handleRequest(data);
    };

  return (
      <div className="space-y-6" id="active-email">
          <HeadingSmall title="Site Logo" description="Update your website logo anytime" />
          <Card className="w-full rounded-sm shadow-xs">
              <CardContent>
                  <div className="space-y-6">
                      <div className="grid gap-2">
                          <Label htmlFor="image">Image Logo</Label>

                          <Input
                              id="image"
                              type="file"
                              required
                              accept="image/*"
                              onChange={(e) => setData('site_logo', e.target.files?.[0] || null)}
                              className="mt-1 w-full"
                          />

                          <InputError className="mt-2" message={errors.site_logo} />
                      </div>

                      <div className="flex items-center gap-4">
                          <Button disabled={processing} onClick={handleEditSiteLogo}>
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
              </CardContent>
          </Card>
      </div>
  );
}

export default SiteLogo