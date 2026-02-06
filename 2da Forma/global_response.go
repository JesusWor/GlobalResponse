// Framework: Go (Gin/Echo/Chi)
// Archivo: global_response.go

package responses

import "math"

type GlobalResponse[T any] struct {
    Success    bool            `json:"success"`
    Message    string          `json:"message"`
    Data       *T              `json:"data,omitempty"`
    Errors     interface{}     `json:"errors,omitempty"`
    Pagination *PaginationInfo `json:"pagination,omitempty"`
}

type PaginationInfo struct {
    TotalItems  int  `json:"totalItems"`
    CurrentPage int  `json:"currentPage"`
    PageSize    int  `json:"pageSize"`
    TotalPages  int  `json:"totalPages"`
    HasPrevious bool `json:"hasPrevious"`
    HasNext     bool `json:"hasNext"`
}

// Success responses
func Ok[T any](message string) *GlobalResponse[T] {
    if message == "" {
        message = "Operación exitosa"
    }
    return &GlobalResponse[T]{
        Success: true,
        Message: message,
    }
}

func OkWithData[T any](data T, message string) *GlobalResponse[T] {
    if message == "" {
        message = "Operación exitosa"
    }
    return &GlobalResponse[T]{
        Success: true,
        Message: message,
        Data:    &data,
    }
}

func OkPaginated[T any](data T, totalItems, currentPage, pageSize int, message string) *GlobalResponse[T] {
    if message == "" {
        message = "Datos obtenidos exitosamente"
    }
    
    totalPages := int(math.Ceil(float64(totalItems) / float64(pageSize)))
    pagination := &PaginationInfo{
        TotalItems:  totalItems,
        CurrentPage: currentPage,
        PageSize:    pageSize,
        TotalPages:  totalPages,
        HasPrevious: currentPage > 1,
        HasNext:     currentPage < totalPages,
    }
    
    return &GlobalResponse[T]{
        Success:    true,
        Message:    message,
        Data:       &data,
        Pagination: pagination,
    }
}

// Error responses
func Fail[T any](message string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
    }
}

func FailWithErrors[T any](message string, errors interface{}) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
        Errors:  errors,
    }
}

func ValidationError[T any](message string, validationErrors map[string][]string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
        Errors:  validationErrors,
    }
}

func NotFound[T any](message string) *GlobalResponse[T] {
    if message == "" {
        message = "Recurso no encontrado"
    }
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
    }
}

func Unauthorized[T any](message string) *GlobalResponse[T] {
    if message == "" {
        message = "No autorizado"
    }
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
    }
}

func ServerError[T any](message string) *GlobalResponse[T] {
    if message == "" {
        message = "Error interno del servidor"
    }
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
    }
}