<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $emoji
 * @property int $message_id
 * @property int $user_id
 * @property-read \App\Models\Message $message
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageReaction whereUserId($value)
 * @mixin \Eloquent
 */
class MessageReaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'emoji',
        'message_id',
        'user_id',
    ];

    /**
     * Get the message that owns the reaction.
     */
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    /**
     * Get the user that created the reaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
