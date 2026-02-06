// Framework: Gin (Go)
// Archivo: global_response.go

package models

import "math"

// GlobalResponse representa la respuesta estándar de API
type GlobalResponse[T any] struct {
    Success     bool   `json:"success"`
    Message     string `json:"message,omitempty"`
    Code        string `json:"code,omitempty"`
    Data        *T     `json:"data,omitempty"`
    TotalRows   int    `json:"totalRows,omitempty"`
    CurrentPage int    `json:"currentPage,omitempty"`
    TotalPages  int    `json:"totalPages,omitempty"`
    PageSize    int    `json:"pageSize,omitempty"`
}

// Ok crea una respuesta exitosa simple
func Ok[T any](message string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: true,
        Message: message,
    }
}

// OkWithData crea una respuesta exitosa con datos
func OkWithData[T any](data T, message, code string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: true,
        Data:    &data,
        Message: message,
        Code:    code,
    }
}

// OkPaginated crea una respuesta exitosa con paginación
func OkPaginated[T any](data T, totalRows, currentPage, pageSize int, message, code string) *GlobalResponse[T] {
    totalPages := 0
    if pageSize > 0 {
        totalPages = int(math.Ceil(float64(totalRows) / float64(pageSize)))
    }

    return &GlobalResponse[T]{
        Success:     true,
        Data:        &data,
        TotalRows:   totalRows,
        CurrentPage: currentPage,
        TotalPages:  totalPages,
        PageSize:    pageSize,
        Message:     message,
        Code:        code,
    }
}

// Error crea una respuesta de error
func Error[T any](message, code string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: false,
        Message: message,
        Code:    code,
    }
}

// ErrorWithData crea una respuesta de error con datos
func ErrorWithData[T any](data *T, message, code string) *GlobalResponse[T] {
    return &GlobalResponse[T]{
        Success: false,
        Data:    data,
        Message: message,
        Code:    code,
    }
}

// Ejemplo de uso en Gin
/*
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func main() {
    r := gin.Default()

    r.GET("/api/users", func(c *gin.Context) {
        users := []User{
            {ID: 1, Name: "Juan"},
            {ID: 2, Name: "María"},
        }
        response := OkWithData(users, "Usuarios obtenidos", "")
        c.JSON(http.StatusOK, response)
    })

    r.GET("/api/users/paginated", func(c *gin.Context) {
        users := make([]User, 10)
        for i := 0; i < 10; i++ {
            users[i] = User{ID: i + 1, Name: fmt.Sprintf("User%d", i+1)}
        }
        response := OkPaginated(users, 100, 1, 10, "Usuarios obtenidos", "")
        c.JSON(http.StatusOK, response)
    })

    r.Run(":8080")
}
*/