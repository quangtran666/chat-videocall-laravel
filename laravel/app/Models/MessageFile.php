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
 * @property int $message_id
 * @property string $name
 * @property string $path
 * @property string $type
 * @property int $size
 * @property string|null $url
 * @property-read \App\Models\Message $message
 * @method static \Database\Factories\MessageFileFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MessageFile whereUrl($value)
 * @mixin \Eloquent
 */
class MessageFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'message_id',
        'name',
        'path',
        'type',
        'size',
        'url',
    ];

    /**
     * Get the message that owns the file.
     */
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }
}
