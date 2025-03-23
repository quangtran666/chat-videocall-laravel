<?php

namespace App\Models;

use App\Enums\RoomRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $room_id
 * @property int $user_id
 * @property RoomRole $role
 * @property-read \App\Models\Room $room
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomMembership whereUserId($value)
 * @mixin \Eloquent
 */
class RoomMembership extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'room_id',
        'role',
    ];

    protected $casts = [
        'role' => RoomRole::class,
    ];

    /**
     * Get the user that belongs to the membership.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the room that belongs to the membership.
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
