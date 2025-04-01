<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'sender' => new UserResource($this->sender),
            'reply_id' => $this->reply_id,
            'reply' => $this->when($this->reply, fn () => new MessageResource($this->reply)),
            'files' => $this->when($this->files_count > 0, fn() => $this->files),
            'reactions_count' => $this->reactions_count ?? 0,
        ];
    }
}
