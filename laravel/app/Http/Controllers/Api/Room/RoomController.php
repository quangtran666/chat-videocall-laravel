<?php

namespace App\Http\Controllers\Api\Room;

use App\Enums\RoomRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Models\Room;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class RoomController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store(StoreRoomRequest $request): JsonResponse
    {
        $room = Room::create($request->validated());
        $room->members()->attach(auth()->id(), ['role' => RoomRole::ADMIN->value]);
        return $this->createdResponse($room);
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
