<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
