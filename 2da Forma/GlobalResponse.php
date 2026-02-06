<?php
// Framework: Laravel
// Archivo: GlobalResponse.php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JsonSerializable;

class GlobalResponse implements Arrayable, Jsonable, JsonSerializable
{
    protected bool $success;
    protected string $message;
    protected mixed $data;
    protected mixed $errors;
    protected ?PaginationInfo $pagination;

    private function __construct(
        bool $success,
        string $message,
        mixed $data = null,
        mixed $errors = null,
        ?PaginationInfo $pagination = null
    ) {
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
        $this->errors = $errors;
        $this->pagination = $pagination;
    }

    // Success responses
    public static function ok(string $message = 'Operación exitosa'): self
    {
        return new self(true, $message);
    }

    public static function okWithData(mixed $data, string $message = 'Operación exitosa'): self
    {
        return new self(true, $message, $data);
    }

    public static function okPaginated(
        mixed $data,
        int $totalItems,
        int $currentPage,
        int $pageSize,
        string $message = 'Datos obtenidos exitosamente'
    ): self {
        $pagination = new PaginationInfo($totalItems, $currentPage, $pageSize);
        return new self(true, $message, $data, null, $pagination);
    }

    // Error responses
    public static function fail(string $message): self
    {
        return new self(false, $message);
    }

    public static function failWithErrors(string $message, mixed $errors): self
    {
        return new self(false, $message, null, $errors);
    }

    public static function validationError(string $message, array $validationErrors): self
    {
        return new self(false, $message, null, $validationErrors);
    }

    public static function notFound(string $message = 'Recurso no encontrado'): self
    {
        return new self(false, $message);
    }

    public static function unauthorized(string $message = 'No autorizado'): self
    {
        return new self(false, $message);
    }

    public static function serverError(string $message = 'Error interno del servidor'): self
    {
        return new self(false, $message);
    }

    public function toArray(): array
    {
        $result = [
            'success' => $this->success,
            'message' => $this->message,
        ];

        if ($this->data !== null) {
            $result['data'] = $this->data;
        }

        if ($this->errors !== null) {
            $result['errors'] = $this->errors;
        }

        if ($this->pagination !== null) {
            $result['pagination'] = $this->pagination->toArray();
        }

        return $result;
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->jsonSerialize(), $options);
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}

class PaginationInfo implements Arrayable, JsonSerializable
{
    public int $totalItems;
    public int $currentPage;
    public int $pageSize;
    public int $totalPages;
    public bool $hasPrevious;
    public bool $hasNext;

    public function __construct(int $totalItems, int $currentPage, int $pageSize)
    {
        $this->totalItems = $totalItems;
        $this->currentPage = $currentPage;
        $this->pageSize = $pageSize;
        $this->totalPages = (int) ceil($totalItems / $pageSize);
        $this->hasPrevious = $currentPage > 1;
        $this->hasNext = $currentPage < $this->totalPages;
    }

    public function toArray(): array
    {
        return [
            'totalItems' => $this->totalItems,
            'currentPage' => $this->currentPage,
            'pageSize' => $this->pageSize,
            'totalPages' => $this->totalPages,
            'hasPrevious' => $this->hasPrevious,
            'hasNext' => $this->hasNext,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}