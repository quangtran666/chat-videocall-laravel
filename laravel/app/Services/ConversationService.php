<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Friend;
use App\Models\User;
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
                'conversation' => $conversation
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
                'conversation' => $conversation
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Failed to create conversation: ' . $e->getMessage()
            ];
        }
    }
}
