<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequestRequest extends FormRequest
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
            'customer_name' => ['required', 'string', 'max:255'],
            'email' =>  ['required', 'email', 'string', 'max:100'],
            'phone_number' => ['nullable', 'digits_between:1,14'],
            'service_type' => ['required', 'string', 'max:255'],
            'service_desc' => ['required', 'string'],
            'hasDone' => ['required', 'boolean']
        ];
    }
}
