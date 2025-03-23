<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 *
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $content
 * @property array<array-key, mixed>|null $emoji
 * @property int $sender_id
 * @property int|null $reply_id
 * @property string $messageable_type
 * @property int $messageable_id
 * @property-read Model|\Eloquent $messageable
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Message> $replies
 * @property-read int|null $replies_count
 * @property-read Message|null $reply
 * @property-read \App\Models\User $sender
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereMessageableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereMessageableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereReplyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'type',
        'reply_id',
        'sender_id',
    ];

    protected $casts = [
        'emoji' => 'array',
    ];

    /**
     * Get the parent messageable model (Room or Conversation).
     */
    public function messageable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the user that sent the message.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Get the message this message is replying to.
     */
    public function reply(): BelongsTo
    {
        return $this->belongsTo(__CLASS__, 'reply_id');
    }

    /**
     * Get replies to this message.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(__CLASS__, 'reply_id');
    }

    /**
     * Get the reactions for the message.
     */
    public function reactions(): HasMany
    {
        return $this->hasMany(MessageReaction::class);
    }

    // Thêm vào class Message
    /**
     * Get the files for the message.
     */
    public function files(): HasMany
    {
        return $this->hasMany(MessageFile::class);
    }
}
