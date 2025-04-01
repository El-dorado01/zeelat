<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceRequest>
 */
class ServiceRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone_number' => fake()->numerify('##############'),
            'service_type' => fake()->realText(),
            'service_desc' => fake()->sentence(),
            'hasDone' => fake()->boolean(),
        ];
    }
}
