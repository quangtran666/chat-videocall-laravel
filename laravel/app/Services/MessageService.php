<?php

namespace App\Services;

use App\Enums\MessageType;
use App\Events\Conversation\NewConversationMessageEvent;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use DB;
use Exception;

class MessageService
{
    /**
     * Gửi tin nhắn trong một cuộc trò chuyện
     *
     * @throws Exception
     */
    public function sendConversationMessage(Conversation $conversation, User $sender, string $content): array
    {
        // Kiểm tra người gửi có thuộc cuộc trò chuyện không
        if ($conversation->user_one_id !== $sender->id || $conversation->user_two_id !== $sender->id) {
            return [
                'success' => false,
                'message' => 'Unauthorized: User is not part of this conversation'
            ];
        }

        try {
            DB::beginTransaction();

            // Tạo tin nhắn mới
            $message = new Message([
                'content' => $content,
                'type' => MessageType::User->value,
                'sender_id' => $sender->id,
            ]);

            // Lưu tin nhắn liên kết với cuộc trò chuyện
            $conversation->messages()->save($message);

            // Load sender để broadcast
            $message->load('sender');

            broadcast(new NewConversationMessageEvent($message))->toOthers();

            DB::commit();

            return [
                'success' => true,
                'message' => $message,
            ];
        }
        catch (Exception $e)
        {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Failed to send message: ' . $e->getMessage()
            ];
        }
    }
}
