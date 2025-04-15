<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StudentRequest;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Admin only
        $students = Student::with('user')->where('isAlumni', '=', false)->get();

        return Inertia::render('dashboard/students', [
            'students' => $students,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Check if user has already completed their registration, hence redirect to dashboard
        if((Auth::user()->name === "User" && auth()->user()->isAdmin) || Auth::user()->name !== "User") 
            return to_route('dashboard');

        return Inertia::render('dashboard/complete-registration');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            try {
    
                //Update the current user's profile
                $user = Auth::user();

                // Store new image and update path
                $data['image'] = $request->file('image')->store('student-images', 'public');

                $studentData = array_merge($data, [
                    'user_id' => $user->id,
                ]);

                $student = Student::create($studentData);

                $user->name = $student->getUsername(); 
                $user->save(); 

            } catch (\Exception $e) {
                throw new \Exception('Failed to complete registration: ' . $e->getMessage());
            }

        });

        return to_route('dashboard')->with('success', 'Welcome, ' . Auth::user()->name . '. Your registration was successful!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, Student $student)
    {
        DB::transaction(function () use ($request, $student) {
            try {
                // Get validated data
                $data = $request->validated();

                if ($request->hasFile('image')) {
                    // Delete old image if it exists
                    if ($student->image) {
                        Storage::disk('public')->delete($student->image);
                    }
                    // Store new image and update path
                    $data['image'] = $request->file('image')->store('student-images', 'public');
                }


                // Update student record
                $student->update($data);

                // If student_id changed, update the associated user's name
                if ($request->has('student_id') && $student->isDirty('first_name', 'last_name')) {
                    $user = $student->user;
                    if ($user) {
                        $user->name = $student->getUsername();
                        $user->save();
                    }
                }

            } catch (\Exception $e) {
                throw new \Exception('Failed to update student: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Student information updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        DB::transaction(function () use ($student) {
            try {
                $user = User::findOrFail($student->user_id);
                $user->delete(); // This deletes the Student too due to onDelete('cascade')

            } catch (\Exception $e) {
                throw new \Exception('Failed to delete student: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Student and associated user deleted successfully!');
    }
}
