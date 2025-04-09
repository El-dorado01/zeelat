<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AlumniRequest;
use App\Models\Alumni;
use App\Models\Student;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AlumniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumni =  Alumni::latest()->paginate(5);
        $services = Service::latest()->paginate(5);
        return Inertia::render('dashboard/alumni', [
            'alumni' => $alumni,
            'services' => $services,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $alumni =  Alumni::latest()->paginate(5);
        $services = Service::latest()->paginate(5);
        return Inertia::render('dashboard/add-alumni', [
            'alumni' => $alumni,
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AlumniRequest $request)
    {
        DB::transaction(function () use ($request) {
            try {
                $validated = $request->validated();

                if ($request->has('student_id') && !empty($request->input('student_id'))) {
                    // Find the student by student_id
                    $student = Student::where('student_id', $validated['student_id'])->firstOrFail();

                    // Update the students table to mark as alumni
                    $student->update(['isAlumni' => true]);

                    // Prepare alumni data using student details
                    $alumniData = [
                        'name' => trim("{$student->first_name} {$student->last_name}"),
                        'email' => $validated['email'] ?? null,
                        'phone_number' => $student->phone_number ?? $validated['phone_number'] ?? null,
                        'remarks' => $validated['remarks'] ?? null,
                        'image' => $student->image ?? null,
                        'graduated_on' => $validated['graduated_on'] ?? now(),
                    ];
                } else {
                    // No student_id, use validated data directly for a new alumni
                    $alumniData = $validated;
                    $alumniData['graduated_on'] = $alumniData['graduated_on'] ?? now();
                }

                // Handle file upload if provided
                if ($request->hasFile('image')) {
                    $alumniData['image'] = $request->file('image')->store('alumni-images', 'public');
                }

                // Create the alumni record
                Alumni::create($alumniData);

            } catch (\Exception $e) {
                throw new \Exception('Failed to add to alumni: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'A new alumnus has been added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alumni $alumni)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumni $alumni)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AlumniRequest $request, Alumni $alumni)
    {
        try {
            $alumni->update($request->validated());
        } catch (\Exception $e) {
            throw new \Exception('Failed to update alumni information: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Alumni information has been updated successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function displayOnHomePage(Request $request, Alumni $alumni)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:alumnis,id',
            'isDisplayed' => 'required|boolean',
        ]);            
        DB::transaction(function () use ($request, $validatedData) {

            $alumni = Alumni::findOrFail($validatedData['id']);
            // Fetch currently displayed alumni
            $displayedAlumni = Alumni::displayedOnHomePage();
            $currentCount = $displayedAlumni->count();

            // If toggling ON (isDisplayed = true), check the limit
            if ($validatedData['isDisplayed'] && $currentCount >= 3 && !$alumni->isDisplayed) {
                return back()->withErrors('You cannot display more than 3 alumni on the home page.');
            }

            try {
                $alumni->update($validatedData);
                
                if ($validatedData['isDisplayed']){
                    $message = "Alumnus has been displayed on the home page!";
                } else {
                    $message = "Alumnus has been removed from the home page!";
                }
        
                return redirect()->back()->with('success', $message);
            } catch (\Exception $e) {
                throw new \Exception('Failed to display alumni information: ' . $e->getMessage());
            }
        });

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alumni $alumni)
    {
        try {
            $message = "Alumni has been removed!";
    
            $alumni->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete alumni: ' . $e->getMessage());
        }
    }
}
