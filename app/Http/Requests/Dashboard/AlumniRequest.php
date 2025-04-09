<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlumniRequest extends FormRequest
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
        return [
            'student_id' => 'nullable|string|max:20',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:100|unique:alumnis,email'. $this->alumni?->id,
            'phone_number' => 'nullable|string|max:14'. $this->alumni?->id,
            'remarks' => 'required|string',
            'image' => [
                'required', 
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        // If it's a string, just ensure it's not too long
                        if (strlen($value) > 255) {
                            $fail('The ' . $attribute . ' must not exceed 255 characters.');
                        }
                    } else if ($value instanceof \Illuminate\Http\UploadedFile) {
                        // If it's an uploaded file, apply image-specific rules
                        $imageRules = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048';
                        $validator = \Validator::make([$attribute => $value], [$attribute => $imageRules]);
                        if ($validator->fails()) {
                            $fail($validator->errors()->first($attribute));
                        }
                    } else {
                        $fail('The ' . $attribute . ' must be a string or an uploaded image.');
                    }
                },
            ],
            'graduated_on' => 'nullable|max:100',
        ];
    }
}
