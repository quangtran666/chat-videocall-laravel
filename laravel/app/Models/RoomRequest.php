<?php

namespace App\Models;

use App\Enums\RequestStatus;
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
 * @property RequestStatus $status
 * @property int|null $reviewed_by
 * @property-read \App\Models\User|null $reviewer
 * @property-read \App\Models\Room $room
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereReviewedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RoomRequest whereUserId($value)
 * @mixin \Eloquent
 */
class RoomRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'status',
        'reviewed_by',
    ];

    protected $casts = [
        'status' => RequestStatus::class,
    ];

    /**
     * Get the room associated with the request.
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get the user that made the request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user that reviewed the request.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
