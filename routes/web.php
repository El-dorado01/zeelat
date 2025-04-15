<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\Dashboard\ServiceRequestController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/debug', function () {
    return 'Debug mode: ' . (config('app.debug') ? 'ON' : 'OFF');
});

// Route::get('/migrate', function () {
//     try {
//         \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
//         return 'Migrations completed successfully. Output: ' . \Illuminate\Support\Facades\Artisan::output();
//     } catch (\Exception $e) {
//         return 'Migration failed: ' . $e->getMessage() . ' | Stack: ' . $e->getTraceAsString();
//     }
// });

Route::post('contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('enrollments', [EnrollmentController::class, 'store'])->name('enrollment.store');

Route::post('service-request', [ServiceRequestController::class, 'store'])->name('service_request.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // Check if user has completed their registration, else redirect to registration page
        if(Auth::user()->name === "User" && !auth()->user()->isAdmin) 
            return to_route('students.create')->with('message', 'Please complete your registration.');

        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';
require __DIR__.'/settings.php';


// Route::get('/seed-database/{token}', function ($token) {
//     if ($token === env('SEED_TOKEN', 'eldorado')) {
//         try {
//             Artisan::call('db:seed');
//             return response()->json([
//                 'message' => 'Database seeded successfully!',
//                 'output' => Artisan::output(),
//             ]);
//         } catch (\Exception $e) {
//             return response()->json([
//                 'error' => 'Failed to seed database.',
//                 'message' => $e->getMessage(),
//             ], 500);
//         }
//     }

//     return response()->json([
//         'error' => 'Invalid token.',
//     ], 403);
// });

Route::get('/create-test-user/{token}', function ($token) {
    if ($token === env('SEED_TOKEN', 'eldorado')) {
        try {
            // Generate a random email (e.g., user_abc123@test.com)
            $randomString = Str::random(8); // 8-character random string
            $email = "user_{$randomString}@test.com";

            // Ensure email is unique (optional, but safer)
            while (User::where('email', $email)->exists()) {
                $randomString = Str::random(8);
                $email = "user_{$randomString}@test.com";
            }

            $user = User::create([
                'name' => 'Test User',
                'email' => $email,
                'password' => Hash::make('password'),
                'avatar' => 'https://zeelatcomputeracademy.onrender.com/build/assets/appLogo-Br6aAksU.png', // Replace with a real URL if desired
                'isAdmin' => true,
                'email_verified_at' => now(), // Marks email as verified
            ]);

            return response()->json([
                'message' => 'Test user created successfully!',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create test user.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    return response()->json([
        'error' => 'Invalid token.',
    ], 403);
});