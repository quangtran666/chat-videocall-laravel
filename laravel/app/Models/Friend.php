<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @property int $friend_id
 * @property-read \App\Models\User $friend
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend whereFriendId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Friend whereUserId($value)
 * @mixin \Eloquent
 */
class Friend extends Pivot
{
    protected $table = 'friends';

    public $incrementing = true;

    protected $fillable = [
        'user_id',
        'friend_id',
    ];

    /**
     * Get the user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the friend user.
     */
    public function friend(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
