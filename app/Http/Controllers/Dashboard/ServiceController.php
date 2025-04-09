<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\Dashboard\ServiceRequest;
use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumni =  Alumni::latest()->paginate(5);
        $services = Service::latest()->paginate(5);
        return Inertia::render('dashboard/services', [
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
        return Inertia::render('dashboard/add-services', [
            'alumni' => $alumni,
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        DB::transaction(function () use ($request) {
            try {
                $validated = $request->validated();

                // Handle file upload if provided
                if ($request->hasFile('image')) {
                    $validated['image'] = $request->file('image')->store('services-images', 'public');
                }

                // Create the alumni record
                Service::create($validated);

            } catch (\Exception $e) {
                throw new \Exception('Failed to add to service: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'A new service has been added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, Service $service)
    {
        DB::transaction(function () use ($request, $service) {
            try {
                // Get validated data
                $data = $request->validated();

                if ($request->hasFile('image')) {
                    // Delete old image if it exists
                    if ($service->image) {
                        Storage::disk('public')->delete($service->image);
                    }
                    // Store new image and update path
                    $data['image'] = $request->file('image')->store('services-images', 'public');
                }

                $service->update($data);

            } catch (\Exception $e) {
                throw new \Exception('Failed to update service: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Service information updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        try {
            $message = "Service has been removed!";
    
            $service->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete service: ' . $e->getMessage());
        }
    }
}
