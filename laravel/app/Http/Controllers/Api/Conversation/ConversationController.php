<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Conversation\CreateConversationRequest;
use App\Services\ConversationService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Throwable;

class ConversationController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly ConversationService $conversationService
    ){}

    /**
     * Create or retrieve a private conversation with another user
     *
     * @param CreateConversationRequest $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function store(CreateConversationRequest $request): JsonResponse
    {
        $result = $this->conversationService->getOrCreatePrivateConversation($request->user_id);

        return $this->successResponse([
            'conversation' => $result['conversation'],
            'exists' => $result['exists']
        ], $result['exists'] ? 'Conversation retrieved' : 'Conversation created');
    }

}
