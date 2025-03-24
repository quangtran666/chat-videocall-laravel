<?php

use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\SocialiteController;
use App\Http\Controllers\Api\Room\RoomController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticatedSessionController::class, 'login']);
Route::post('register', [AuthenticatedSessionController::class, 'register']);
Route::get('{provider}/redirect', [SocialiteController::class, 'redirectToProvider']);
Route::get('{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get("/user", static function () { return auth()->user(); });
    Route::post('logout', [AuthenticatedSessionController::class, 'logout'])->middleware('auth:sanctum');

    Route::apiResource('rooms', RoomController::class);
});
