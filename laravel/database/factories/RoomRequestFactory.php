<?php

namespace Database\Factories;

use App\Enums\RequestStatus;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'user_id' => User::factory(),
            'status' => RequestStatus::PENDING->value,
            'reviewed_by' => null,
        ];
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => RequestStatus::ACCEPTED->value,
                'reviewed_by' => User::factory(),
            ];
        });
    }

    /**
     * Indicate that the request is rejected.
     */
    public function rejected(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => RequestStatus::REJECTED->value,
                'reviewed_by' => User::factory(),
            ];
        });
    }
}
