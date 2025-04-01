<?php

namespace App\Http\Controllers;

use App\Mail\UserWelcomeEmail;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AdminEnrollmentController extends Controller
{
    /**
     * Handle the approval and deletion of an enrollment by an admin.
     */
    public function approveAndDelete(Enrollment $enrollment, Request $request)
    {
        // Ensure only admins can perform this action
        if (!auth()->user() || !auth()->user()->isAdmin) { 
            return redirect()->back()->withErrors('Unauthorized action.');
        }

        // Validate enrollment email
        if (!$enrollment->email || !filter_var($enrollment->email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withErrors('Invalid enrollment email.');
        }

        $message = $request->input('action') === 'approve'
            ? 'Enrollment has been approved and user created!'
            : 'Enrollment has been deleted!';

        if ($request->input('action') === 'approve') {
            DB::transaction(function () use ($enrollment, &$message) {
                try {
                    // Generate a random password
                    $generated_password = Str::random(12);

                    // Create the user 
                    $user = User::create([
                        'email' => $enrollment->email,
                        'password' => Hash::make($generated_password),
                        'name' => 'User'
                    ]);

                    // Use the Markdown-based Mailable
                    Mail::to($user->email)->send(new UserWelcomeEmail($user->email, $generated_password));

                } catch (\Exception $e) {
                    throw new \Exception('Failed to process enrollment: ' . $e->getMessage());
                }

                // Delete the enrollment
                $enrollment->delete();
            });
        } else {
            $enrollment->delete();
        }

        // Redirect back to the admin page with success message
        return redirect()->back()->with('success', $message);
    }
}