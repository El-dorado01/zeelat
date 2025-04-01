<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'other_name' => 'nullable|string|max:100',
            'gender' => 'required|in:Male,Female,Other',
            'phone_number' => 'nullable|string|max:14|unique:students,phone_number,' . $this->student?->id,
            'address' => 'required|string',
            'next_of_kin_phone_number' => 'required|string|max:14',
            'next_of_kin_email' => 'nullable|email|max:100',
            'relationship' => 'required|in:Parent,Spouse,Sibling,Guardian,Other',
        ];

        // Add student_id rules for update (optional)
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['student_id'] = [
                'sometimes', // Only validate if provided
                'string',
                'max:20',
                Rule::unique('students', 'student_id')->ignore($this->student?->id),
            ];
        }

        return $rules;
    }
}
