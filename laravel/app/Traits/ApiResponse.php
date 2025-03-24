<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Trả về response thành công
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */
    protected function successResponse(mixed $data, string $message = 'Success', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    /**
     * Trả về response lỗi
     *
     * @param string $message
     * @param int $statusCode
     * @param null $error
     * @return JsonResponse
     */
    protected function errorResponse(string $message = 'Error', int $statusCode = 400, $error = null): JsonResponse
    {
        $response = [
            'status' => 'error',
            'message' => $message
        ];

        if (!is_null($error)) {
            $response['error'] = $error;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Trả về response không tìm thấy (404)
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function notFoundResponse(string $message = 'Resource not found'): JsonResponse
    {
        return $this->errorResponse($message, 404);
    }

    /**
     * Trả về response đã tạo thành công (201)
     *
     * @param mixed $data
     * @param string $message
     * @return JsonResponse
     */
    protected function createdResponse(mixed $data, string $message = 'Created Successfully'): JsonResponse
    {
        return $this->successResponse($data, $message, 201);
    }

    /**
     * Trả về response đã xoá thành công (204)
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function deletedResponse(string $message = 'Deleted Successfully'): JsonResponse
    {
        return $this->successResponse([], $message, 204);
    }
}
