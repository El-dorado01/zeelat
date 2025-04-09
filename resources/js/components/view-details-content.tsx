import { Student } from '@/types';
import { UserIcon } from 'lucide-react';
import MoreActions from './more-actions';
import { StudentAddToAlumni } from './student-addToAlumni';
import StudentEdit from './student-edit';

// Enhanced card design for View Details
export const ViewDetailsContent = ({ student, setViewOpen }: { student: Student; setViewOpen: (open: boolean) => void }) => (
    <div className="space-y-6">
        {/* Card Container */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            {/* Header with Image */}
            <div className="flex items-center gap-4 bg-gray-100 p-4">
                {student.image ? (
                    <img
                        src={student.image.startsWith('http') ? student.image : '/storage/' + student.image}
                        alt={`${student.first_name} ${student.last_name}`}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                ) : (
                    <UserIcon className="h-16 w-16 text-gray-400" />
                )}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {`${student.first_name} ${student.last_name} ${student.other_name || ''}`}
                    </h2>
                    <p className="text-sm text-gray-500">Student ID: {student.student_id}</p>
                </div>
            </div>

            {/* Personal Info */}
            <div className="border-t border-gray-200 p-4">
                <h3 className="mb-2 text-lg font-medium text-gray-700">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
                    <div>
                        <span className="font-medium">Gender:</span> {student.gender}
                    </div>
                    <div>
                        <span className="font-medium">Phone Number:</span> {student.phone_number}
                    </div>
                    <div className="sm:col-span-2">
                        <span className="font-medium">Address:</span> {student.address || 'Not provided'}
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="border-t border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 text-lg font-medium text-gray-700">User Account</h3>
                <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
                    <div>
                        <span className="font-medium">Email:</span> {student.user.email}
                    </div>
                    <div>
                        <span className="font-medium">Name:</span> {student.user.name}
                    </div>
                    <div>
                        <span className="font-medium">Email Verified:</span> {student.user.email_verified_at ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>

            {/* Next of Kin */}
            <div className="border-t border-gray-200 p-4">
                <h3 className="mb-2 text-lg font-medium text-gray-700">Next of Kin</h3>
                <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
                    <div>
                        <span className="font-medium">Phone Number:</span> {student.next_of_kin_phone_number}
                    </div>
                    <div>
                        <span className="font-medium">Email:</span> {student.next_of_kin_email || 'Not provided'}
                    </div>
                    <div>
                        <span className="font-medium">Relationship:</span> {student.relationship}
                    </div>
                </div>
            </div>

            {/* Timestamps */}
            <div className="border-t border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                <p>Created: {new Date(student.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(student.updated_at).toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-gray-200 p-4">
                {/* <MoreActions student={student} /> */}
                <StudentEdit student={student} />
                <StudentAddToAlumni student={student} setViewOpen={setViewOpen} />
            </div>
        </div>
    </div>
);
