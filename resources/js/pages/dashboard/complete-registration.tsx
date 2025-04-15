import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import NextOfKin from '@/components/next-of-kin';
import StudentImage from '@/components/student-image';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const CompleteRegistration = () => {
    const { flash } = usePage<{
        flash: any;
    }>().props;
    

    const [date, setDate] = useState<Date | undefined>(undefined);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        first_name: '',
        last_name: '',
        other_name: '',
        gender: '',
        phone_number: '',
        address: '',
        next_of_kin_phone_number: '',
        next_of_kin_email: '',
        relationship: '',
        image: null as File | null,
        date_of_birth: date,
    });

    const handleDateOfBirth = (date: Date | undefined) => {
        setDate(date);
        setData('date_of_birth', date);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('students.store'), {
            preserveScroll: true,
            onSuccess: () => {
                router.visit(route('dashboard'), { replace: true });
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || 'An error occurred');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CompleteRegistration" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Complete Registration" description="Fill in the required details to complete your registration" />
                <div className="space-y-6">
                    <HeadingSmall title="Personal Information" description="Fill in the required student personal information" />
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First Name*</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                    autoComplete="first_name"
                                    placeholder="First name"
                                />

                                <InputError className="mt-2" message={errors.first_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name*</Label>

                                <Input
                                    id="last_name"
                                    className="mt-1 block w-full"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                    autoComplete="last_name"
                                    placeholder="Last name"
                                />

                                <InputError className="mt-2" message={errors.last_name} />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="other_name">Other Name</Label>

                                <Input
                                    id="other_name"
                                    className="mt-1 block w-full"
                                    value={data.other_name}
                                    onChange={(e) => setData('other_name', e.target.value)}
                                    autoComplete="other_name"
                                    placeholder="Other name (Optional)"
                                />

                                <InputError className="mt-2" message={errors.other_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender*</Label>
                                <Select onValueChange={(value: string) => setData('gender', value)}>
                                    <SelectTrigger className="w-full" id="gender">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">Phone Number</Label>

                                <Input
                                    id="phone_number"
                                    type="tel"
                                    className="mt-1 block w-full"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    autoComplete="phone_number"
                                    placeholder="Phone Number (Optional)"
                                />

                                <InputError className="mt-2" message={errors.phone_number} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date_of_birth">Date of Birth*</Label>
                                <Popover>
                                    <PopoverTrigger id="date_of_birth" asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                        <Calendar mode="single" selected={date} onSelect={handleDateOfBirth} />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_of_birth && <p className="mt-1 text-sm text-red-500">{errors.date_of_birth}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address*</Label>
                            <Textarea
                                id="address"
                                required
                                placeholder="Enter address..."
                                value={data.address || ''}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1 min-h-[100px] w-full"
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                        </div>

                        <NextOfKin data={data} setData={setData} errors={errors} />

                        <StudentImage image={data.image} setData={setData} errors={errors} />

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className="w-full">
                                Submit
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Submitted</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default CompleteRegistration;
