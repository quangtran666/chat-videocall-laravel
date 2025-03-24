<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

class RoomFactory extends Factory
{
    /**
     * @throws RandomException
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'tags' => implode(',', fake()->words(random_int(1, 5))),
            'description' => fake()->paragraph(),
            'is_private' => fake()->boolean(20), // 20% chance of being private
            'owner_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the room is private.
     */
    public function private(): static
    {
        return $this->state(fn (array $attributes) =>[
            'is_private' => true,
        ]);
    }

    /**
     * Indicate that the room is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) =>[
            'is_private' => false,
        ]);
    }
}
