<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ServiceRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

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
