<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

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
    public function getSentFriendRequestsUsers(int $limit = 9, ?string $cursor = null) : CursorPaginator
    {
        $currentUser = Auth::user();

        $sentRequestUserIds = $currentUser?->sentFriendRequests()->pluck('receiver_id')->toArray();

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
    public function getReceivedFriendRequestsUsers(int $limit = 9, ?string $cursor = null) : CursorPaginator
    {
        $currentUser = Auth::user();

        $receivedRequests = $currentUser?->receivedFriendRequests()->pluck('sender_id')->toArray();

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
}
