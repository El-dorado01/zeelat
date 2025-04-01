<?php

namespace App\Http\Controllers;

use App\Http\Requests\EnrollmentRequest;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enrollments = Enrollment::latest()->get();
        return Inertia::render('dashboard/enrollments', [
            'enrollments' => $enrollments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EnrollmentRequest $request)
    {
        try {
            Enrollment::create($request->validated());
    
            return to_route('home')->with('success', 'Your enrollment request has been received, you will be contacted through your email!');
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to submit enrollment request: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollment $enrollment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Enrollment $enrollment)
    {
        if (!$enrollment->email || !filter_var($enrollment->email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withErrors('Invalid enrollment email.');
        }
        
        try {
            $message = "Enrollment has been deleted!";
    
            $enrollment->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete enrollment: ' . $e->getMessage());
        }
    }

}
