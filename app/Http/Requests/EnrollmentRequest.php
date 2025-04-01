<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EnrollmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required', 
                'email', 
                'max:255', 
                'lowercase', 
                'unique:enrollments,email', 
                'unique:users,email'
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower($this->input('email')),
        ]);
    }

    public function messages(): array
    {
        return [
            'email.lowercase' => 'The email must be in lowercase letters.',
            'email.unique' => 'This user has already been enrolled.',
        ];
    }
}
