<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ServiceRequestRequest;
use App\Mail\ServiceRequestEmail;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/service-request');
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
    public function store(ServiceRequestRequest $request)
    {
        DB::transaction(function() use ($request) {
            try {
                $service = ServiceRequest::create($request->validated());

                // Send email to customer
                Mail::to($service->email)->send(new ServiceRequestEmail($service->customer_name,$service->email, $service->service_type));

                
            } catch (\Exception $e) {
                throw new \Exception('Failed to send a message: ' . $e->getMessage());
            }
        });

        return to_route('home')->with('success', 'Your request for ' . $request->service_type . ' has been received, you will be contacted through your email!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRequest $serviceRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRequest $serviceRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequestRequest $request, ServiceRequest $serviceRequest)
    {
        try {
            $serviceRequest->update($request->validated());

            return redirect()->back()->with('success', 'Updated successfully!');
        } catch (\Exception $e) {
            throw new \Exception('Failed to update this service request: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $serviceRequest)
    {
        try {
            $message = "Service Request has been deleted!";
    
            $serviceRequest->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete enrollment: ' . $e->getMessage());
        }
    }
}
