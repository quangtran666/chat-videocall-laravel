<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\FriendActionType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pagination\CursorPaginationRequest;
use App\Http\Requests\User\FriendActionRequest;
use App\Http\Requests\User\UserSearchRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Throwable;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly UserService $userService
    )
    {
    }

    public function getPotentialFriends(CursorPaginationRequest $request): JsonResponse
    {
        $potentialFriends = $this->userService->getPotentialFriends($request->limit, $request->cursor);

        return $this->successResponse([
            'data' => UserResource::collection($potentialFriends->items()),
            'next_cursor' => $potentialFriends->nextCursor()?->encode(),
            'prev_cursor' => $potentialFriends->previousCursor()?->encode(),
            'has_more' => $potentialFriends->hasMorePages(),
        ], 'Potential friends retrieved successfully');
    }

    public function getSentFriendRequests(CursorPaginationRequest $request): JsonResponse
    {
        $sentFriendRequests = $this->userService->getSentFriendRequestsUsers($request->limit, $request->cursor);

        return $this->successResponse([
            'data' => UserResource::collection($sentFriendRequests->items()),
            'next_cursor' => $sentFriendRequests->nextCursor()?->encode(),
            'prev_cursor' => $sentFriendRequests->previousCursor()?->encode(),
            'has_more' => $sentFriendRequests->hasMorePages(),
        ], 'Sent friend requests retrieved successfully');
    }

    public function getReceivedFriendRequests(CursorPaginationRequest $request): JsonResponse
    {
        $requestingUsers = $this->userService->getReceivedFriendRequestsUsers($request->limit, $request->cursor);

        return $this->successResponse([
            'data' => UserResource::collection($requestingUsers->items()),
            'next_cursor' => $requestingUsers->nextCursor()?->encode(),
            'prev_cursor' => $requestingUsers->previousCursor()?->encode(),
            'has_more' => $requestingUsers->hasMorePages(),
        ], 'Users who sent you friend requests retrieved successfully');
    }

    public function searchUsers(UserSearchRequest $request): JsonResponse
    {
        $searchResults = $this->userService->searchUsers(
            $request->get('query'),
            $request->get('per_page', 12),
            $request->get('page', 1)
        );

        return $this->successResponse([
            'data' => UserResource::collection($searchResults->items()),
            'current_page' => $searchResults->currentPage(),
            'per_page' => $searchResults->perPage(),
            'total' => $searchResults->total(),
            'last_page' => $searchResults->lastPage(),
        ], 'Users retrieved successfully');
    }

    /**
     * Handle friend actions (send, accept, reject, cancel)
     *
     * @param FriendActionRequest $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function handleFriendAction(FriendActionRequest $request) : JsonResponse
    {
        $action = FriendActionType::from($request->input('action'));
        $userId = $request->input('user_id');

        $result = match($action) {
            FriendActionType::SEND => $this->userService->sendFriendRequest($userId),
            FriendActionType::ACCEPT => $this->userService->acceptFriendRequest($userId),
            FriendActionType::REJECT => $this->userService->rejectFriendRequest($userId),
            FriendActionType::CANCEL => $this->userService->cancelFriendRequest($userId),
        };

        if (! $result['success']) {
            return $this->errorResponse($result['message']);
        }

        return $this->successResponse([], $result['message']);
    }
}
