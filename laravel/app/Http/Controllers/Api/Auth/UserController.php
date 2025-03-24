<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly UserService $userService
    ){}

    public function getPotentialFriends() : JsonResponse
    {
        $potentialFriends = $this->userService->getPotentialFriends();

        return $this->successResponse(
            UserResource::collection($potentialFriends),
            'Potential friends retrieved successfully'
        );
    }

    public function getSentFriendRequests() : JsonResponse
    {
        $sentFriendRequests = $this->userService->getSentFriendRequestsUsers();

        return $this->successResponse(
            UserResource::collection($sentFriendRequests),
            'Sent friend requests retrieved successfully'
        );
    }

    public function getReceivedFriendRequests() : JsonResponse
    {
        $requestingUsers = $this->userService->getReceivedFriendRequestsUsers();

        return $this->successResponse(
            UserResource::collection($requestingUsers),
            'Users who sent you friend requests retrieved successfully'
        );
    }
}
