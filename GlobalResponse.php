<?php
// Framework: Laravel
// Archivo: GlobalResponse.php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\JsonResponse;

/**
 * Respuesta estándar para operaciones de API en Laravel
 */
class GlobalResponse implements Arrayable
{
    private bool $success;
    private string $message;
    private string $code;
    private mixed $data;
    private int $totalRows;
    private int $currentPage;
    private int $totalPages;
    private int $pageSize;

    private function __construct()
    {
        $this->success = false;
        $this->message = '';
        $this->code = '';
        $this->data = null;
        $this->totalRows = 0;
        $this->currentPage = 0;
        $this->totalPages = 0;
        $this->pageSize = 0;
    }

    /**
     * Crea una respuesta exitosa simple
     */
    public static function ok(string $message = 'Operación exitosa'): self
    {
        $response = new self();
        $response->success = true;
        $response->message = $message;
        return $response;
    }

    /**
     * Crea una respuesta exitosa con datos
     */
    public static function okWithData(
        mixed $data,
        string $message = 'Operación exitosa',
        string $code = ''
    ): self {
        $response = new self();
        $response->success = true;
        $response->data = $data;
        $response->message = $message;
        $response->code = $code;
        return $response;
    }

    /**
     * Crea una respuesta exitosa con paginación
     */
    public static function okPaginated(
        mixed $data,
        int $totalRows,
        int $currentPage,
        int $pageSize,
        string $message = 'Operación exitosa',
        string $code = ''
    ): self {
        $response = new self();
        $response->success = true;
        $response->data = $data;
        $response->totalRows = $totalRows;
        $response->currentPage = $currentPage;
        $response->pageSize = $pageSize;
        $response->totalPages = $pageSize > 0 ? (int) ceil($totalRows / $pageSize) : 0;
        $response->message = $message;
        $response->code = $code;
        return $response;
    }

    /**
     * Crea una respuesta de error
     */
    public static function error(string $message, string $code = 'ERROR'): self
    {
        $response = new self();
        $response->success = false;
        $response->message = $message;
        $response->code = $code;
        return $response;
    }

    /**
     * Crea una respuesta de error con datos
     */
    public static function errorWithData(
        mixed $data,
        string $message,
        string $code = 'ERROR'
    ): self {
        $response = new self();
        $response->success = false;
        $response->data = $data;
        $response->message = $message;
        $response->code = $code;
        return $response;
    }

    /**
     * Convierte a array eliminando valores vacíos
     */
    public function toArray(): array
    {
        $result = [];
        
        $result['success'] = $this->success;
        
        if (!empty($this->message)) {
            $result['message'] = $this->message;
        }
        
        if (!empty($this->code)) {
            $result['code'] = $this->code;
        }
        
        if ($this->data !== null) {
            $result['data'] = $this->data;
        }
        
        if ($this->totalRows > 0) {
            $result['totalRows'] = $this->totalRows;
        }
        
        if ($this->currentPage > 0) {
            $result['currentPage'] = $this->currentPage;
        }
        
        if ($this->totalPages > 0) {
            $result['totalPages'] = $this->totalPages;
        }
        
        if ($this->pageSize > 0) {
            $result['pageSize'] = $this->pageSize;
        }
        
        return $result;
    }

    /**
     * Convierte a JsonResponse de Laravel
     */
    public function toJsonResponse(int $status = 200): JsonResponse
    {
        return response()->json($this->toArray(), $status);
    }
}

// Ejemplo de uso en Laravel
/*
use App\Http\Responses\GlobalResponse;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = [
            ['id' => 1, 'name' => 'Juan'],
            ['id' => 2, 'name' => 'María']
        ];
        
        return GlobalResponse::okWithData($users, 'Usuarios obtenidos')
            ->toJsonResponse();
    }

    public function paginated(): JsonResponse
    {
        $users = collect(range(1, 10))->map(fn($i) => [
            'id' => $i,
            'name' => "User{$i}"
        ])->all();
        
        return GlobalResponse::okPaginated($users, 100, 1, 10)
            ->toJsonResponse();
    }
}
*/