import { useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';
import { Transition } from '@headlessui/react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type NextOfKinProps = {
    data: {
        next_of_kin_phone_number: string;
        next_of_kin_email: string;
        relationship: string;
    };
    setData: (key: string, value: any) => void;
    errors: any
};

export default function NextOfKin({data, setData, errors}:NextOfKinProps) {

    return (
        <div className="space-y-6">
            <HeadingSmall title="Next of Kin" description="Fill in the details of your next of kin" />
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="next_of_kin_phone_number">Phone Number*</Label>

                        <Input
                            id="next_of_kin_phone_number"
                            type="tel"
                            className="mt-1 block w-full"
                            required
                            value={data.next_of_kin_phone_number}
                            onChange={(e) => setData('next_of_kin_phone_number', e.target.value)}
                            autoComplete="next_of_kin_phone_number"
                            placeholder="Phone Number (Next of Kin)"
                        />

                        <InputError className="mt-2" message={errors.next_of_kin_phone_number} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.next_of_kin_email}
                            onChange={(e) => setData('next_of_kin_email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Email address"
                        />

                        <InputError className="mt-2" message={errors.next_of_kin_email} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="relationship">Relationship*</Label>
                    <Select onValueChange={(value: string) => setData('relationship', value)}>
                        <SelectTrigger className="w-full" id="relationship">
                            <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Guardian">Guardian</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.relationship && <p className="mt-1 text-sm text-red-500">{errors.relationship}</p>}
                </div>
            </div>
        </div>
    );
}
