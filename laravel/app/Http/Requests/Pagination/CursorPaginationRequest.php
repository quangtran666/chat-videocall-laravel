<?php

namespace App\Http\Requests\Pagination;

use Illuminate\Foundation\Http\FormRequest;

class CursorPaginationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'limit' => 'integer|min:1|max:50',
            'cursor' => 'string|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'limit.integer' => 'The limit must be an integer',
            'limit.min' => 'The limit must be at least 1',
            'limit.max' => 'The limit must not be greater than 50',
            'cursor.string' => 'The cursor must be a string',
        ];
    }
}
