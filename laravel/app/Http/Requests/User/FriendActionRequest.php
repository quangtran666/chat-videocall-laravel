<?php

namespace App\Http\Requests\User;

use App\Enums\FriendActionType;
use Illuminate\Foundation\Http\FormRequest;

class FriendActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => 'required|in:' . implode(',', array_map(static fn($case) => $case->value, FriendActionType::cases())),
            'user_id' => 'required|exists:users,id',
        ];
    }
}
