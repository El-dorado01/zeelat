<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'other_name' => fake()->firstName(),
            'gender' => fake()->randomElement(['Male', 'Female', 'Other']),
            'phone_number' => fake()->unique()->numerify('##############'),
            'student_id' => fn () => 'ZCA/02-26/' . str_pad(fake()->unique()->numberBetween(1, 99999), 5, '0', STR_PAD_LEFT),
            'address' => fake()->address(),
            'next_of_kin_phone_number' => fake()->numerify('##############'),
            'next_of_kin_email' => fn () => substr(fake()->unique()->safeEmail(), 0, 100),
            'relationship' => fake()->randomElement(['Parent', 'Sibling', 'Spouse', 'Guardian', 'Other']),
            'user_id' => User::factory()->create()->id,
            'image' => 'https://images.unsplash.com/photo-1742925602178-0f5939ee6845',
        ];
    }

    // public function generateStudentID(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'student_id' => fn () => 'ZCA/02-26/' . str_pad(fake()->unique()->numberBetween(1, 99999), 5, '0', STR_PAD_LEFT),
    //     ]);
    // }

    // public function generateEmail(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'next_of_kin_email' => fn () => substr(fake()->unique()->safeEmail(), 0, 100),
    //     ]);
    // }

    // public function linkUserIDOrCreateNewUser(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'user_id' => fn () => User::inRandomOrder()->first()->id ?? User::factory()->create()->id,
    //     ]);
    // }
}
