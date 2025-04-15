<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WorkRequest;
use App\Models\Alumni;
use App\Models\Service;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/works', [
            'alumni' => fn () => Alumni::latest()->paginate(5),
            'services' => fn () => Service::latest()->paginate(5),
            'works' => fn () => Work::latest()->paginate(5),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/add-works', [
            'alumni' => fn () => Alumni::latest()->paginate(5),
            'services' => fn () => Service::latest()->paginate(5),
            'works' => fn () => Work::latest()->paginate(5),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkRequest $request)
    {
        DB::transaction(function () use ($request) {
            try {
                $validated = $request->validated();

                // Handle file upload if provided
                if ($request->hasFile('image')) {
                    $validated['image'] = $request->file('image')->store('works-images', 'public');
                }

                // Create the alumni record
                Work::create($validated);

            } catch (\Exception $e) {
                throw new \Exception('Failed to add to work: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'A new work has been added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Work $work)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Work $work)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkRequest $request, Work $work)
    {
        DB::transaction(function () use ($request, $work) {
            try {
                // Get validated data
                $data = $request->validated();

                if ($request->hasFile('image')) {
                    // Delete old image if it exists
                    if ($work->image) {
                        Storage::disk('public')->delete($work->image);
                    }
                    // Store new image and update path
                    $data['image'] = $request->file('image')->store('works-images', 'public');
                }

                $work->update($data);

            } catch (\Exception $e) {
                throw new \Exception('Failed to update work: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Work information updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Work $work)
    {
        DB::transaction(function () use ($work) {
            try {
                $message = "Work has been removed!";
        
                // Delete old image if it exists
                if ($work->image) {
                    Storage::disk('public')->delete($work->image);
                }
                
                $work->delete();
                return redirect()->back()->with('success', $message);
                
            } catch (\Exception $e) {
                throw new \Exception('Failed to delete work: ' . $e->getMessage());
            }
        });
    }
}
