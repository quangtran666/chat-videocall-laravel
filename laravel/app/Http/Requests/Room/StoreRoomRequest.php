<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'is_private' => 'required|boolean',
            'tags' => 'required|array|min:1|max:10',
            'tags.*' => 'string',
            'owner_id' => 'required|exists:users,id'
        ];
    }
}
