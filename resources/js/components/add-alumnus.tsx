import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageBuilderLayout from '@/layouts/pageBuilder/layout';
import { cn } from '@/lib/utils';
import { FormErrors, type NavItem } from '@/types';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, LoaderCircle, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { TabsContent } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { usePost } from './usePost';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Alumni',
        href: '/page-builder/alumni',
        icon: null,
    },
    {
        title: 'Add Alumni',
        href: '/page-builder/alumni/add',
        icon: null,
    },
];

const AddAlumnus = () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    const initialData = {
        student_id: '',
        name: '',
        email: '',
        phone_number: '',
        image: '',
        remarks: '',
        graduated_on: date,
    };
    

    const { handleRequest, processing, errors, data, setData } = usePost(
        `/page-builder/alumni`,
        initialData,
        {
            onSuccess: () => {
                // Reset form fields
                 setData(initialData); // Reset all form data to initial values
                 setDate(undefined); 
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

    const handleGraduatedOn = (date: Date | undefined) => {
        setDate(date);
        setData('graduated_on', date);
    }

    return (
        <PageBuilderLayout sidebarNavItems={sidebarNavItems} title="Add Alumnus" description="This page allows you to add a new alumnus">
            <div className="container mx-auto">
                    <Card className="w-full">
                        <CardContent className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter name"
                                        required
                                        value={data.name || ''}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 w-full"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="student_id">Student ID</Label>
                                    <Input
                                        id="student_id"
                                        placeholder="Enter student ID"
                                        value={data.student_id || ''}
                                        onChange={(e) => setData('student_id', e.target.value)}
                                        className="mt-1 w-full"
                                    />
                                    {errors.student_id && <p className="mt-1 text-sm text-red-500">{errors.student_id}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        required
                                        value={data.email || ''}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 w-full"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <Input
                                        id="phone_number"
                                        placeholder="Enter phone number (optional)"
                                        value={data.phone_number || ''}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        className="mt-1 w-full"
                                    />
                                    {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="image">Alumni Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        required
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="mt-1 w-full"
                                    />
                                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                                </div>
                                <div className="flex-1 md:flex-1/2">
                                    <Label htmlFor="graduated_on">Graduated On:</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                            <Select
                                                onValueChange={(value: string) => {
                                                    const daysToAdd = parseInt(value, 10); // Convert string to number
                                                    const newDate = addDays(new Date(), daysToAdd); // Calculate new date
                                                    handleGraduatedOn(newDate);
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="0">Today</SelectItem>
                                                    <SelectItem value="1">Tomorrow</SelectItem>
                                                    <SelectItem value="3">In 3 days</SelectItem>
                                                    <SelectItem value="7">In a week</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="rounded-md border">
                                                <Calendar mode="single" selected={date} onSelect={handleGraduatedOn} />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    {errors.graduated_on && <p className="mt-1 text-sm text-red-500">{errors.graduated_on}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="remarks">Remarks</Label>
                                <Textarea
                                    id="remarks"
                                    placeholder="Enter remarks..."
                                    value={data.remarks || ''}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    className="mt-1 min-h-[100px] w-full"
                                />
                                {errors.remarks && <p className="mt-1 text-sm text-red-500">{errors.remarks}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled={processing} onClick={handleRequest}>
                                {processing ? (
                                    <>
                                        <LoaderCircle className="mr-1 animate-spin" />
                                        Adding
                                    </>
                                ) : (
                                    <>
                                    <UserPlus /> Add
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
            </div>
        </PageBuilderLayout>
    );
};

export default AddAlumnus;
