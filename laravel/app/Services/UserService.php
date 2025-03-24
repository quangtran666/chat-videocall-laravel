<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class UserService
{
    /**
     * Get users that the current user hasn't befriended or sent friend requests to
     *
     * @return Collection
     */
    public function getPotentialFriends(): Collection
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

        // Get all users except those in the exclude list
        return User::whereNotIn('id', $excludeIds)->get();
    }

    /**
     * Get users that the current user has sent friend requests to
     * with eager loading to avoid N+1 problem
     *
     * @return Collection
     */
    public function getSentFriendRequestsUsers() : Collection
    {
        $currentUser = Auth::user();

        // Eager load the receiver relationship to avoid N+1 query
        $sentRequests = $currentUser?->sentFriendRequests()->with('receiver')->get();

        return $sentRequests->map(function ($request) {
            return $request->receiver;
        })->filter(); // Filter out any null values
    }

    /**
     * Get users that have sent friend requests to the current user
     * with eager loading to avoid N+1 problem
     *
     * @return Collection
     */
    public function getReceivedFriendRequestsUsers() : Collection
    {
        $currentUser = Auth::user();

        $receivedRequests = $currentUser?->receivedFriendRequests()->with('sender')->get();

        return $receivedRequests->map(function ($request) {
            return $request->sender;
        })->filter();
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
}
