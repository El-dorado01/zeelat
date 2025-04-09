import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ViewDetailsContent } from './view-details-content';
import { FormErrors, Student } from '@/types';
import { usePost } from './usePost';
import { toast } from 'sonner';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { EditStudentForm } from './edit-student-form';

const StudentEdit = ({student} : {student: Student}) => {
    const [editOpen, setEditOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);


    // Edit form data and submission
    // const initialEditData = {
    //     first_name: student.first_name,
    //     last_name: student.last_name,
    //     other_name: student.other_name || '',
    //     gender: student.gender,
    //     phone_number: student.phone_number || '',
    //     student_id: student.student_id,
    //     address: student.address,
    //     next_of_kin_phone_number: student.next_of_kin_phone_number,
    //     next_of_kin_email: student.next_of_kin_email || '',
    //     relationship: student.relationship,
    //     image: student.image,
    // };

     const initialEditData = {
         first_name: student.first_name || '',
         last_name: student.last_name || '',
         other_name: student.other_name || '',
         gender: student.gender || 'Male',
         phone_number: student.phone_number || '',
         student_id: student.student_id || '',
         address: student.address || '',
         next_of_kin_phone_number: student.next_of_kin_phone_number || '',
         next_of_kin_email: student.next_of_kin_email || '',
         relationship: student.relationship || 'Parent',
         image: student.image || '',
         _method: 'PATCH', // Highly important, because PUT AND PATCH are not supported directly for file uploads
     };

    const {
        handleRequest: handleEditRequest,
        processing: editProcessing,
        errors: editErrors,
        data: editData,
        setData: setEditData,
    } = usePost(
        `/students/${student.id}`,
        initialEditData,
        {
            onSuccess: () => {
                setEditOpen(false);
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


  return (
      <>
          {/* Edit Button and Form */}
          {isMobile ? (
              <Drawer open={editOpen} onOpenChange={setEditOpen}>
                  <DrawerTrigger asChild>
                      <Button variant="outline" className="md:hidden">
                          Edit
                      </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                      <DrawerHeader>
                          <DrawerTitle>Edit Student</DrawerTitle>
                          <DrawerDescription>Update the student’s details below.</DrawerDescription>
                      </DrawerHeader>
                      <EditStudentForm
                          data={editData}
                          setData={setEditData}
                          errors={editErrors}
                          processing={editProcessing}
                          onSubmit={handleEditRequest}
                          onCancel={() => setEditOpen(false)}
                      />
                  </DrawerContent>
              </Drawer>
          ) : (
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                      <Button variant="outline" className="hidden md:block">
                          Edit
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                          <DialogTitle>Edit Student</DialogTitle>
                          <DialogDescription>Update the student’s details below.</DialogDescription>
                      </DialogHeader>
                      <EditStudentForm
                          data={editData}
                          setData={setEditData}
                          errors={editErrors}
                          processing={editProcessing}
                          onSubmit={handleEditRequest}
                          onCancel={() => setEditOpen(false)}
                      />
                  </DialogContent>
              </Dialog>
          )}
      </>
  );
    
  
}

export default StudentEdit