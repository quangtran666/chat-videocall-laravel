<?php

namespace Database\Factories;

use App\Enums\RoomRole;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomMembershipFactory extends Factory
{
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'user_id' => User::factory(),
            'role' => RoomRole::MEMBER->value,
        ];
    }

    /**
     * Indicate that the user is a moderator.
     */
    public function asModerator(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => RoomRole::MODERATOR->value,
        ]);
    }

    /**
     * Indicate that the user is an admin.
     */
    public function asAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => RoomRole::ADMIN->value,
        ]);
    }
}
