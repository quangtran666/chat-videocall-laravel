<?php

namespace App\Http\Resources;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userService = new UserService();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar_url' => $this->avatar_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'mutual_friends_count' => $userService->countMutualFriends($this->resource),
        ];
    }
}
