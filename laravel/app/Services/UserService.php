<?php

namespace App\Services;

use App\Enums\RequestStatus;
use App\Models\Friend;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Throwable;

class UserService
{
    /**
     * Get users that the current user hasn't befriended or sent friend requests to
     * with cursor pagination
     *
     * @param int $limit
     * @param string|null $cursor
     * @return CursorPaginator
     */
    public function getPotentialFriends(int $limit = 9, ?string $cursor = null): CursorPaginator
    {
        $currentUser = Auth::user();

        // Get IDs of current friends
        $friendIds = $currentUser?->friends->pluck('id')->toArray();

        // Get IDs of users the current user has sent friend requests to
        $sentRequestIds = $currentUser?->sentFriendRequests->pluck('receiver_id')->toArray();

        // Get IDs of users who have sent friend requests to the current user
        $receivedRequestIds = $currentUser?->receivedFriendRequests->pluck('sender_id')->toArray();

        // Combine all IDs to exclude
        $excludeIds = array_merge([$currentUser?->id], $friendIds, $sentRequestIds, $receivedRequestIds);

        // Get all users except those in the exclude list with cursor pagination
        return User::whereNotIn('id', $excludeIds)
            ->orderBy('id')
            ->cursorPaginate($limit, ['*'], 'id', $cursor);
    }

    /**
     * Get users that the current user has sent friend requests to
     * and cursor pagination
     *
     * @param int $limit
     * @param string|null $cursor
     * @return CursorPaginator
     */
    public function getSentFriendRequestsUsers(int $limit = 9, ?string $cursor = null): CursorPaginator
    {
        $currentUser = Auth::user();

        $sentRequestUserIds = $currentUser?->sentFriendRequests()
            ->where('status', [RequestStatus::PENDING->value])
            ->pluck('receiver_id')->toArray();

        return User::whereIn('id', $sentRequestUserIds)
            ->orderBy('id')
            ->cursorPaginate($limit, ['*'], 'id', $cursor);
    }

    /**
     * Get users that have sent friend requests to the current user
     * and cursor pagination
     *
     * @param int $limit
     * @param string|null $cursor
     * @return CursorPaginator
     */
    public function getReceivedFriendRequestsUsers(int $limit = 9, ?string $cursor = null): CursorPaginator
    {
        $currentUser = Auth::user();

        $receivedRequests = $currentUser?->receivedFriendRequests()
            ->whereNotIn('status', [RequestStatus::REJECTED->value, RequestStatus::ACCEPTED->value])
            ->pluck('sender_id')->toArray();

        return User::whereIn('id', $receivedRequests)
            ->orderBy('id')
            ->cursorPaginate($limit, ['*'], 'id', $cursor);
    }

    /**
     * Count mutual friends between the current user and another user
     *
     * @param User $user
     * @return int
     */
    public function countMutualFriends(User $user): int
    {
        $currentUser = Auth::user();

        // Get IDs of current user's friends
        $currentUserFriendIds = $currentUser?->friends->pluck('id')->toArray();

        // Get IDs of the other user's friends
        $otherUserFriendIds = $user->friends->pluck('id')->toArray();

        // Count the intersection of the two arrays
        return count(array_intersect($currentUserFriendIds, $otherUserFriendIds));
    }

    /**
     * Search users by name or email using full-text search
     *
     * @param string $query The search query
     * @param int $perPage Number of results per page
     * @param int $page Current page number
     * @return LengthAwarePaginator
     */
    public function searchUsers(string $query, int $perPage = 12, int $page = 1): LengthAwarePaginator
    {
        $userId = Auth::id();

        return User::search($query)
            ->whereNotIn('id', [$userId])
            ->paginate($perPage, 'page', $page);
    }

    /**
     * Send a friend request to a user
     * @param int $receiverId
     * @return array
     */
    public function sendFriendRequest(int $receiverId): array
    {
        $currentUser = Auth::user();

        // Check if user exists
        $receiver = User::find($receiverId);
        if (!$receiver) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        // Check if trying to send a friend request to self
        if ($currentUser?->id === $receiver->id) {
            return [
                'success' => false,
                'message' => 'You cannot send a friend request to yourself'
            ];
        }

        // Check if already friends
        if (Friend::where('user_id', $currentUser?->id)
            ->where('friend_id', $receiverId)
            ->exists()) {
            return [
                'success' => false,
                'message' => 'You are already friends with this user'
            ];
        }

        // Check if a friend request has already been sent
        $existingRequest = FriendRequest::where('sender_id', $currentUser?->id)
            ->where('receiver_id', $receiverId)
            ->first();

        // Check if already sent friend request or if the request was rejected then resend it
        if ($existingRequest) {
            if ($existingRequest->status === RequestStatus::PENDING->value) {
                return [
                    'success' => false,
                    'message' => 'Friend request already sent'
                ];
            }

            if ($existingRequest->status === RequestStatus::REJECTED->value) {
                $existingRequest->status = RequestStatus::PENDING->value;
                $existingRequest->save();
                return [
                    'success' => true,
                    'message' => 'Friend request resent successfully'
                ];
            }
        }

        // Check if there's a request from the other user
        $reverseRequest = FriendRequest::where('sender_id', $receiverId)
            ->where('receiver_id', $currentUser?->id)
            ->first();

        if ($reverseRequest && $reverseRequest->status === RequestStatus::PENDING) {
            return [
                'success' => false,
                'message' => 'This user has already sent you a friend request. Check your received requests.'
            ];
        }

        // Create a new friend request
        FriendRequest::create([
            'sender_id' => $currentUser?->id,
            'receiver_id' => $receiverId,
            'status' => RequestStatus::PENDING->value,
        ]);

        return [
            'success' => true,
            'message' => 'Friend request sent successfully'
        ];
    }

    /**
     * Accept a friend request from a user
     *
     * @param int $senderId
     * @return array
     * @throws Throwable
     */
    public function acceptFriendRequest(int $senderId): array
    {
        $currentUser = Auth::user();

        // Check if the user exists
        $sender = User::find($senderId);
        if (!$sender) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        // Find the friend request
        $friendRequest = FriendRequest::where('sender_id', $senderId)
            ->where('receiver_id', $currentUser?->id)
            ->first();

        if (!$friendRequest) {
            return [
                'success' => false,
                'message' => 'No pending friend request found from this user'
            ];
        }

        try {
            \DB::beginTransaction();

            // Update the friend request status to accepted
            FriendRequest::where('sender_id', $senderId)
                ->where('receiver_id', $currentUser?->id)
                ->update(['status' => RequestStatus::ACCEPTED->value]);

            // Create a new friend record
            Friend::create([
                'user_id' => $currentUser?->id,
                'friend_id' => $senderId,
            ]);

            // Create a reciprocal friend record
            Friend::create([
                'user_id' => $senderId,
                'friend_id' => $currentUser?->id,
            ]);

            \DB::commit();

            return [
                'success' => true,
                'message' => 'Friend request accepted successfully'
            ];
        } catch (\Exception $e) {
            \DB::rollBack();
            return [
                'success' => false,
                'message' => 'An error occurred while accepting the friend request: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Reject a friend request from a user
     *
     * @param int $senderId
     * @return array
     */
    public function rejectFriendRequest(int $senderId): array
    {
        $currentUser = Auth::user();

        // Find the friend request
        $friendRequest = FriendRequest::where('sender_id', $senderId)
            ->where('receiver_id', $currentUser?->id)
            ->where('status', RequestStatus::PENDING->value)
            ->first();

        if (!$friendRequest) {
            return [
                'success' => false,
                'message' => 'No pending friend request found from this user'
            ];
        }

        // Update the friend request status to rejected
        FriendRequest::where('sender_id', $senderId)
            ->where('receiver_id', $currentUser?->id)
            ->update(['status' => RequestStatus::REJECTED->value]);

        return [
            'success' => true,
            'message' => 'Friend request rejected successfully'
        ];
    }

    /**
     * Cancel a sent friend request
     *
     * @param int $receiverId
     * @return array
     */
    public function cancelFriendRequest(int $receiverId): array
    {
        $currentUser = Auth::user();

        // Find the friend request
        $friendRequest = FriendRequest::where('sender_id', $currentUser?->id)
            ->where('receiver_id', $receiverId)
            ->where('status', RequestStatus::PENDING->value)
            ->first();

        if (!$friendRequest) {
            return [
                'success' => false,
                'message' => 'No pending friend request found to this user'
            ];
        }

        // Delete the friend request
        FriendRequest::where('sender_id', $currentUser?->id)
            ->where('receiver_id', $receiverId)
            ->where('status', RequestStatus::PENDING->value)
            ->delete();

        return [
            'success' => true,
            'message' => 'Friend request canceled successfully'
        ];
    }

    /**
     * Search through the current user's friends by name
     *
     * @param string|null $query The search query
     * @param int $perPage Number of results per page
     * @param int $page Current page number
     * @return LengthAwarePaginator
     */
    public function getUserFriends(?string $query, int $perPage = 9, int $page = 1): LengthAwarePaginator
    {
        $currentUser = Auth::user();

        if ($query)
        {
            $friendIds = $currentUser?->friends->pluck('users.id')->toArray();

            return User::search($query)
                ->whereIn('id', $friendIds)
                ->paginate($perPage, 'page', $page);
        }

        return $currentUser?->friends()
            ->orderBy('id')
            ->paginate($perPage, ['*'], 'page', $page);
    }
}
