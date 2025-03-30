<?php

namespace App\Events\Conversation;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewConversationMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public readonly Message $message
    )
    {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('conversation.' . $this->message),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'new.message';
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        // Đảm bảo dữ liệu trả về đầy đủ cho client
        return [
            'id' => $this->message->id,
            'content' => $this->message->content,
            'type' => $this->message->type,
            'sender_id' => $this->message->sender_id,
            'reply_id' => $this->message->reply_id,
            'messageable_id' => $this->message->messageable_id,
            'messageable_type' => $this->message->messageable_type,
            'created_at' => $this->message->created_at->toIso8601String(),
            'updated_at' => $this->message->updated_at->toIso8601String(),
            'sender' => [
                'id' => $this->message->sender->id,
                'name' => $this->message->sender->name,
                'avatar_url' => $this->message->sender->avatar_url,
            ],
        ];
    }
}
