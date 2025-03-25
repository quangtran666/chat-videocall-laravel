<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pagination\CursorPaginationRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

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
}
