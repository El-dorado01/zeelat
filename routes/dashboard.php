<?php

use App\Http\Controllers\AdminEnrollmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\AlumniController;
use App\Http\Controllers\Dashboard\ComplaintController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\ServiceRequestController;
use App\Http\Controllers\Dashboard\SiteSettingsController;
use App\Http\Controllers\Dashboard\StudentsController;
use App\Http\Controllers\Dashboard\WorkController;
use App\Http\Controllers\EnrollmentController;
use Illuminate\Support\Facades\Route;

/**
 * ROUTES TO CONTACTS 
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});

/**
 * ROUTES TO ENROLLMENTS 
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::post('enrollments/approve/{enrollment}', [AdminEnrollmentController::class, 'approveAndDelete'])->name('enrollments.approve');
    Route::delete('enrollments/{enrollment}', [EnrollmentController::class, 'destroy'])->name('enrollments.destroy');
});

/**
 * ROUTES TO MANAGE ALUMNI
 */

Route::middleware(['auth', 'verified', 'admin'])->prefix('page-builder/')->group(function () {
    Route::get('alumni', [AlumniController::class, 'index'])->name('alumni.index');
    Route::get('alumni/add', [AlumniController::class, 'create'])->name('alumni.create');
    Route::post('alumni', [AlumniController::class, 'store'])->name('alumni.store');
    Route::put('alumni', [AlumniController::class, 'update'])->name('alumni.update');
    Route::patch('alumni/display', [AlumniController::class, 'displayOnHomePage'])->name('alumni.displayOnHomePage');
    Route::delete('alumni/{alumni}', [AlumniController::class, 'destroy'])->name('alumni.destroy');

    // Services
    Route::get('services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('services/add', [ServiceController::class, 'create'])->name('services.create');
    Route::post('services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('services/{service}', [ServiceController::class, 'destroy'])->name('services.delete');

    // Works
    Route::get('works', [WorkController::class, 'index'])->name('works.index');
    Route::get('works/add', [WorkController::class, 'create'])->name('works.create');
    Route::post('works', [WorkController::class, 'store'])->name('works.store');
    Route::put('works/{work}', [WorkController::class, 'update'])->name('works.update');
    Route::delete('works/{work}', [WorkController::class, 'destroy'])->name('works.delete');
});

/**
 * ADMIN ONLY
 * ROUTES TO DISPLAY SERVICE REQUESTS PAGE, UPDATE AND DELETE SERVICE REQUESTS
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('service-request', [ServiceRequestController::class, 'index'])->name('service_request.index');
    Route::put('service-request/{serviceRequest}', [ServiceRequestController::class, 'update'])->name('service_request.update');
    Route::delete('service-request', [ServiceRequestController::class, 'destroy'])->name('service_request.destroy');
});


/**
 * ADMIN ONLY
 * ROUTES TO DISPLAY SITE SETTINGS PAGE, UPDATE SITE SETTINGS
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('site-settings', [SiteSettingsController::class, 'index'])->name('site_settings.index');
    Route::post('site-settings', [SiteSettingsController::class, 'store'])->name('site_settings.store');
    Route::patch('site-settings/{siteSettings}', [SiteSettingsController::class, 'update'])->name('site_settings.update');
});

/**
 * ROUTES TO DISPLAY STUDENTS PAGE, UPDATE STUDENTS' INFO - ADMIN ONLY
 * ROUTE TO COMPLETE REGISTRATION - USER ONLY
 */
Route::middleware(['auth', 'verified'])->prefix('students')->group(function () {
    Route::get('/', [StudentsController::class, 'index'])->middleware('admin')->name('students.index');
    Route::patch('{student}', [StudentsController::class, 'update'])->middleware('admin')->name('students.update');
    Route::delete('{student}', [StudentsController::class, 'destroy'])->middleware('admin')->name('students.destroy');

    Route::get('complete-registration', [StudentsController::class, 'create'])->name('students.create');
    Route::post('complete-registration', [StudentsController::class, 'store'])->name('students.store');

    // STUDENTS COMPLAINTS
    Route::prefix('complaints')->group( function () {
        Route::get('/', [ComplaintController::class, 'index'])->name('students.complaints.index');
    });
});