<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Service;
use App\Models\SiteSettings;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $settings = SiteSettings::first()?->only(['active_email', 'site_logo']) ?? [];
        return Inertia::render('Home', [
            'alumni' => Alumni::where('isDisplayed',operator: true)->get(),
            'services' => Service::all(),
            'site_settings' => $settings,
            'student_count' => Student::count()   
        ]);
    }
}
