<?php

use App\Http\Controllers\AdminEnrollmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\AlumniController;
use App\Http\Controllers\Dashboard\ServiceRequestController;
use App\Http\Controllers\Dashboard\SiteSettingsController;
use App\Http\Controllers\Dashboard\StudentsController;
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

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('page-builder/alumni', [AlumniController::class, 'index'])->name('alumni.index');
    Route::post('page-builder/alumni', [AlumniController::class, 'store'])->name('alumni.store');
    Route::put('page-builder/alumni', [AlumniController::class, 'update'])->name('alumni.update');
    Route::delete('page-builder/alumni', [AlumniController::class, 'destroy'])->name('alumni.destroy');
});

/**
 * ADMIN ONLY
 * ROUTES TO DISPLAY SERVICE REQUESTS PAGE, UPDATE AND DELETE SERVICE REQUESTS
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('service-request', [ServiceRequestController::class, 'index'])->name('service_request.index');
    Route::put('service-request', [ServiceRequestController::class, 'update'])->name('service_request.update');
    Route::delete('service-request', [ServiceRequestController::class, 'destroy'])->name('service_request.destroy');
});


/**
 * ADMIN ONLY
 * ROUTES TO DISPLAY SITE SETTINGS PAGE, UPDATE SITE SETTINGS
 */
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('site-settings', [SiteSettingsController::class, 'index'])->name('site_settings.index');
    Route::put('site-settings', [SiteSettingsController::class, 'store'])->name('site_settings.update');
});

/**
 * ROUTES TO DISPLAY STUDENTS PAGE, UPDATE STUDENTS' INFO - ADMIN ONLY
 * ROUTE TO COMPLETE REGISTRATION - USER ONLY
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('students', [StudentsController::class, 'index'])->middleware('admin')->name('students.index');
    Route::patch('students/{id}', [StudentsController::class, 'update'])->middleware('admin')->name('students.update');
    Route::delete('students/{student}', [StudentsController::class, 'destroy'])->middleware('admin')->name('students.destroy');

    Route::get('students/complete-registration', [StudentsController::class, 'create'])->name('students.create');
    Route::post('students/complete-registration', [StudentsController::class, 'store'])->name('students.store');
});