<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AlumniRequest;
use App\Models\Alumni;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/alumni');
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
    public function store(AlumniRequest $request)
    {
        try {
            Alumni::create($request->validated());
        } catch (\Exception $e) {
            throw new \Exception('Failed to complete registration: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'A new alumni has been added successfully!');
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
     * Remove the specified resource from storage.
     */
    public function destroy(Alumni $alumni)
    {
        try {
            $message = "Alumni has been deleted!";
    
            $alumni->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete alumni: ' . $e->getMessage());
        }
    }
}
