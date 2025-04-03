<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class ConversationService
{
    /**
     * Create or retrieve a conversation between the current user and another user
     *
     * @param int $otherUserId The ID of the other user
     * @return array Response with conversation ID or error message
     * @throws Throwable
     */
    public function getOrCreatePrivateConversation(int $otherUserId): array
    {
        $currentUser = Auth::user();

        // Check if the other user exists
        $otherUser = User::find($otherUserId);
        if (!$otherUser) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        // Check if they are friends
        $areFriends = Friend::where('user_id', $currentUser?->id)
            ->where('friend_id', $otherUserId)
            ->exists();

        if (!$areFriends) {
            return [
                'success' => false,
                'message' => 'You can only start conversations with your friends'
            ];
        }

        // Check if a conversation already exists
        $conversation = Conversation::where(static function ($query) use ($currentUser, $otherUserId) {
            $query->where('user_one_id', $currentUser->id)
                ->where('user_two_id', $otherUserId);
        })->orWhere(function ($query) use ($currentUser, $otherUserId) {
            $query->where('user_one_id', $otherUserId)
                ->where('user_two_id', $currentUser->id);
        })->first();

        if ($conversation) {
            return [
                'success' => true,
                'exists' => true,
                'conversation' => $conversation,
            ];
        }

        // Create a new conversation
        try {
            DB::beginTransaction();

            $conversation = Conversation::create([
                'user_one_id' => $currentUser?->id,
                'user_two_id' => $otherUserId,
            ]);

            DB::commit();

            return [
                'success' => true,
                'exists' => false,
                'conversation' => $conversation,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Failed to create conversation: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Get the other user in a conversation
     *
     * @param Conversation $conversation
     * @return array
     */
    public function getOtherUserInConversation(Conversation $conversation) : array
    {
        // Get the other user in the conversation
        $otherUserId = $conversation->user_one_id === Auth::id() ? $conversation->user_two_id : $conversation->user_one_id;
        $otherUser = User::find($otherUserId);

        if (!$otherUser) {
            return [
                'success' => false,
                'message' => 'Other user not found'
            ];
        }

        return [
            'success' => true,
            'other_user' => $otherUser,
        ];
    }


    /**
     * Get messages from a conversation with cursor pagination
     *
     * @param Conversation $conversation
     * @param int $limit
     * @param string|null $cursor
     * @return CursorPaginator
     */
    public function getConversationMessages(Conversation $conversation, int $limit = 9, ?string $cursor = null): CursorPaginator
    {
        // Lấy tin nhắn và thông tin người gửi
        return $conversation->messages()
            ->with('sender')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc') // Prevent duplicate created_at, because cursor using > or < not >= or <= to compare
            ->cursorPaginate($limit, ['*'], "cursor", $cursor);
    }
}
