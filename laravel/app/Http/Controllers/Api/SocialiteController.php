<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    use ApiResponse;

    public function redirectToProvider(string $provider): JsonResponse
    {
        return $this->successResponse([
            'redirect_url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function handleProviderCallback(string $provider): JsonResponse
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        $userInDatabase = User::updateOrCreate(
            ['email' => $socialUser->getEmail()],
            [
                'name' => $socialUser->getName(),
                'password' => Hash::make(Str::random(24)),
                'email_verified_at' => now(),
                'avatar_url' => $socialUser->getAvatar(),
            ]
        );

        Auth::login($userInDatabase, true);

        return $this->successResponse([
            'user' => $userInDatabase,
        ]);
    }
}
