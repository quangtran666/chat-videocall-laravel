<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Conversation\CreateConversationRequest;
use App\Http\Requests\Message\SendMessageRequest;
use App\Http\Requests\Pagination\CursorPaginationRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Services\ConversationService;
use App\Services\MessageService;
use App\Traits\ApiResponse;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Throwable;

class ConversationController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly ConversationService $conversationService,
        private readonly MessageService $messageService
    ){}

    /**
     * @TODO : Cái đoạn code này bận quá, cần refactor lại. Nó làm quá nhiêu việc
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

    /**
     * Lấy thông tin người dùng khác trong cuộc trò chuyện
     */
    public function getOtherUser(Conversation $conversation): JsonResponse
    {
        if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
            return $this->forbiddenResponse('You are not authorized to view this conversation');
        }

        $otherUser = $this->conversationService->getOtherUserInConversation($conversation);

        if (!$otherUser['success']) {
            return $this->forbiddenResponse($otherUser['message']);
        }

        return $this->successResponse([
            'other_user' => $otherUser['other_user'],
        ], 'Other user retrieved successfully');
    }

    /**
     * Lấy tin nhắn trong cuộc trò chuyện
     */
    public function getMessages(Conversation $conversation, CursorPaginationRequest $request) : JsonResponse
    {
        if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
            return $this->forbiddenResponse('You are not authorized to view this conversation');
        }

        $messages = $this->conversationService->getConversationMessages($conversation, $request->limit, $request->cursor);

        return $this->successResponse([
            'data' => MessageResource::collection($messages->items()),
            'next_cursor' => $messages->nextCursor()?->encode(),
            'prev_cursor' => $messages->previousCursor()?->encode(),
            'has_more' => $messages->hasMorePages(),
        ], 'Messages retrieved successfully');
    }

    /**
     * Gửi tin nhắn trong cuộc trò chuyện
     * @throws Exception
     */
    public function sendMessage(SendMessageRequest $request, Conversation $conversation) : JsonResponse
    {
        if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
            return $this->forbiddenResponse('You are not authorized to view this conversation');
        }

        $result = $this->messageService->sendConversationMessage($conversation, Auth::user(), $request->get('content'));

        if (! $result['success']) {
            return $this->errorResponse($result['message']);
        }

        return $this->successResponse(['message' => $result['message']], 'Message sent successfully');
    }
}
