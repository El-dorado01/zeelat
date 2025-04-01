<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SiteSettingsRequest;
use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user() || !auth()->user()->isAdmin) { 
            return redirect()->back()->withErrors('Unauthorized action.');
        }
        return Inertia::render('dashboard/site-settings');
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SiteSettings $siteSettings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SiteSettings $siteSettings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SiteSettingsRequest $request, SiteSettings $siteSettings)
    {
        try {
            $siteSettings->update($request->validated());
    
            return to_route('site_settings.index')->with('success', 'Settings updated successfully!');
        } catch (\Exception $e) {
            throw new \Exception('Failed to update site settings: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SiteSettings $siteSettings)
    {
        //
    }
}
