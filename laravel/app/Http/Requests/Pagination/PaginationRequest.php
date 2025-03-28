<?php

namespace App\Http\Requests\Pagination;

use Illuminate\Foundation\Http\FormRequest;

class PaginationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'query' => 'sometimes|max:255',
            'page' => 'sometimes|integer|min:1',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ];
    }
}
