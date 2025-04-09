import { Student } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface EditStudentFormProps {
    data: Partial<Student>;
    setData: (key: string, value: any) => void;
    errors: { [key: string]: string | string[] | undefined };
    processing: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

export const EditStudentForm = ({ data, setData, errors, processing, onSubmit, onCancel }: EditStudentFormProps) => {
    return (
        <div className="space-y-8 p-4">
            {/* Personal Details Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Personal Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            placeholder="Enter first name"
                            value={data.first_name || ''}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="mt-1 w-full"
                        />
                        {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            placeholder="Enter last name"
                            value={data.last_name || ''}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="mt-1 w-full"
                        />
                        {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="other_name">Other Name</Label>
                        <Input
                            id="other_name"
                            placeholder="Enter other name (optional)"
                            value={data.other_name || ''}
                            onChange={(e) => setData('other_name', e.target.value)}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            placeholder="Enter phone number (optional)"
                            value={data.phone_number || ''}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="mt-1 w-full"
                        />
                    </div>
                    {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
                    <div>
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
                <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        placeholder="Enter address"
                        value={data.address || ''}
                        onChange={(e) => setData('address', e.target.value)}
                        className="mt-1 min-h-[100px] w-full"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div>
                    <Label htmlFor="image">Student Image</Label>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        className="mt-1 w-full"
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>
            </div>

            {/* Next of Kin Details Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Next of Kin Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="next_of_kin_phone_number">Phone Number</Label>
                        <Input
                            id="next_of_kin_phone_number"
                            placeholder="Enter phone number"
                            value={data.next_of_kin_phone_number || ''}
                            onChange={(e) => setData('next_of_kin_phone_number', e.target.value)}
                            className="mt-1 w-full"
                        />
                        {errors.next_of_kin_phone_number && <p className="mt-1 text-sm text-red-500">{errors.next_of_kin_phone_number}</p>}
                    </div>
                    <div>
                        <Label htmlFor="next_of_kin_email">Email</Label>
                        <Input
                            id="next_of_kin_email"
                            placeholder="Enter email (optional)"
                            value={data.next_of_kin_email || ''}
                            onChange={(e) => setData('next_of_kin_email', e.target.value)}
                            className="mt-1 w-full"
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select value={data.relationship} onValueChange={(value) => setData('relationship', value)}>
                        <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
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

            {/* Form Actions */}
            <div className="flex justify-end gap-2">
                <Button onClick={onSubmit} disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-1 animate-spin" />Saving
                        </>
                    ) : (
                        'Save'
                    )}
                </Button>
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};
