<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('dashboard/contacts', [
            'contacts' => $contacts
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
    public function store(ContactRequest $request)
    {
        try {
            Contact::create($request->validated());
    
            return to_route('home')->with('success', 'Your message has been received!');
        } catch (\Exception $e) {
            throw new \Exception('Failed to send a message: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        if (!$contact->email || !filter_var($contact->email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withErrors('Invalid contact email.');
        }
        
        try {
            $message = "Message has been deleted!";
    
            $contact->delete();
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            throw new \Exception('Failed to delete contact message: ' . $e->getMessage());
        }
    }
}
