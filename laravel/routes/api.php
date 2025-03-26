<?php

use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\SocialiteController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Room\RoomController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticatedSessionController::class, 'login']);
Route::post('register', [AuthenticatedSessionController::class, 'register']);
Route::get('{provider}/redirect', [SocialiteController::class, 'redirectToProvider']);
Route::get('{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('rooms', RoomController::class);

    Route::prefix('user')->group(function () {
       Route::get('/', static function () { return auth()->user(); });
       Route::get('/search', [UserController::class, 'searchUsers']);
       Route::prefix('friends')->group(function () {
           Route::get('/potential-friends', [UserController::class, 'getPotentialFriends']);
           Route::get('/sent-friend-requests', [UserController::class, 'getSentFriendRequests']);
           Route::get('/received-friend-requests', [UserController::class, 'getReceivedFriendRequests']);
       });
    });

    Route::post('logout', [AuthenticatedSessionController::class, 'logout'])->middleware('auth:sanctum');

});
