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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:100|unique:alumnis,email'. $this->alumni?->id,
            'phone_number' => 'sometimes|string|max:14'. $this->alumni?->id,
            'remarks' => 'required|string',
            'image' => 'required|string',
            'graduated_on' => 'sometimes|string|max:100',
        ];
    }
}
