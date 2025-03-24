<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_one_id' => User::factory(),
            'user_two_id' => User::factory(),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterMaking(function ($conversation) {
            // Ensure user_one_id is less than user_two_id to avoid duplicate conversations
            if ($conversation->user_one_id > $conversation->user_two_id) {
                $temp = $conversation->user_one_id;
                $conversation->user_one_id = $conversation->user_two_id;
                $conversation->user_two_id = $temp;
            }
        });
    }
}
