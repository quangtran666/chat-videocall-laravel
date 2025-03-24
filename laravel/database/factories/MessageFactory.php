<?php

namespace Database\Factories;

use App\Enums\MessageType;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        $messageableType = $this->faker->randomElement([
            Conversation::class,
            Room::class,
        ]);

        $messageable = $messageableType::factory()->create();

        return [
            'content' => fake()->paragraph(),
            'type' => MessageType::User->value,
            'sender_id' => User::factory(),
            'reply_id' => null,
            'messageable_id' => $messageable->id,
            'messageable_type' => $messageableType,
        ];
    }

    /**
     * Indicate that the message is a user message.
     */
    public function asUserMessage(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => MessageType::User->value,
        ]);
    }

    /**
     * Indicate that the message is a system message.
     */
    public function asSystemMessage(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => MessageType::System->value,
        ]);
    }

    /**
     * Indicate that the message is a reply to another message.
     */
    public function asReply(): static
    {
        return $this->state(function (array $attributes) {
            $originalMessage = Message::factory()->create([
                'messageable_id' => $attributes['messageable_id'],
                'messageable_type' => $attributes['messageable_type'],
            ]);

            return [
                'reply_id' => $originalMessage->id,
            ];
        });
    }

    /**
     * Set the messageable to a conversation.
     */
    public function inConversation(Conversation $conversation = null): static
    {
        return $this->state(function (array $attributes) use ($conversation) {
            $conversation = $conversation ?? Conversation::factory()->create();

            return [
                'messageable_id' => $conversation->id,
                'messageable_type' => Conversation::class,
                'sender_id' => $this->faker->randomElement([$conversation->user_one_id, $conversation->user_two_id]),
            ];
        });
    }

    /**
     * Set the messageable to a room.
     */
    public function inRoom(Room $room = null): static
    {
        return $this->state(function (array $attributes) use ($room) {
            $room = $room ?? Room::factory()->create();

            return [
                'messageable_id' => $room->id,
                'messageable_type' => Room::class,
                'sender_id' => $room->owner_id,
            ];
        });
    }
}
