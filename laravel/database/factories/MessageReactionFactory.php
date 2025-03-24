<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageReactionFactory extends Factory
{
    public function definition(): array
    {
        $emojis = ['👍', '👎', '❤️', '😂', '😮', '😢', '🎉', '🔥', '👏', '🙏'];

        return [
            'emoji' => $this->faker->randomElement($emojis),
            'message_id' => Message::factory(),
            'user_id' => User::factory(),
        ];
    }
}
