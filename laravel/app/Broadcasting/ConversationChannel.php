<?php

namespace App\Broadcasting;

use App\Models\Conversation;
use App\Models\User;

class ConversationChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, Conversation $conversation): array|bool
    {
        return $user->id === $conversation->user_one_id || $user->id === $conversation->user_two_id;
    }
}
