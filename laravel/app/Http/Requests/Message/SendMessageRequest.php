<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Todo: Add reply Id and files
     */
    public function rules(): array
    {
        return [
            'content' => 'required|string|max:1000',
        ];
    }
}
