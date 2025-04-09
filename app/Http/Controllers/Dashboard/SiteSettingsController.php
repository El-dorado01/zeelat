<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SiteSettingsRequest;
use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        $settings = SiteSettings::first();
        return Inertia::render('dashboard/site-settings', [
            'site_settings' => $settings
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
    public function store(SiteSettingsRequest $request)
    {
        try {
            SiteSettings::create($request->validated());
            return redirect()->back()->with('success', 'Site settings has been enabled!');
        } catch (\Exception $e) {
            throw new \Exception('Failed to enable site settings: ' . $e->getMessage());
        }
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
        // dd($request->validated());
        DB::transaction(function () use ($request, $siteSettings) {
            try {
                $data = $request->validated();

                if ($request->hasFile('site_logo')) {
                    // Delete old image if it exists
                    if ($siteSettings->site_logo) {
                        Storage::disk('public')->delete($siteSettings->site_logo);
                    }
                    // Store new image and update path
                    $data['site_logo'] = $request->file('site_logo')->store('site-logo', 'public');
                }

                $success = $siteSettings->update($data);
                if (!$success) {
                    \Log::error('Update failed', $request->validated());
                    throw new \Exception('Update operation returned false');
                }
                
                return redirect()->back()->with('success', 'Settings updated successfully!');
            } catch (\Exception $e) {
                throw new \Exception('Failed to update site settings: ' . $e->getMessage());
            }

        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SiteSettings $siteSettings)
    {
        //
    }
}
