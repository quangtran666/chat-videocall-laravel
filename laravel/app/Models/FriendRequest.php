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
 * @property int $sender_id
 * @property int $receiver_id
 * @property RequestStatus $status
 * @property-read \App\Models\User $receiver
 * @property-read \App\Models\User $sender
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FriendRequest whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FriendRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'status',
    ];

    protected $casts = [
        'status' => RequestStatus::class,
    ];

    /**
     * Get the user that sent the request.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Get the user that received the request.
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
