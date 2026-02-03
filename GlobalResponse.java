// Framework: Spring Boot
// Archivo: GlobalResponse.java

package com.example.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Respuesta estándar para operaciones de API en Spring Boot
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GlobalResponse<T> {
    
    private Boolean success;
    private String message;
    private String code;
    private T data;
    private Integer totalRows;
    private Integer currentPage;
    private Integer totalPages;
    private Integer pageSize;

    /**
     * Crea una respuesta exitosa simple
     */
    public static <T> GlobalResponse<T> ok(String message) {
        return GlobalResponse.<T>builder()
                .success(true)
                .message(message)
                .build();
    }

    /**
     * Crea una respuesta exitosa con datos
     */
    public static <T> GlobalResponse<T> okWithData(T data, String message, String code) {
        return GlobalResponse.<T>builder()
                .success(true)
                .data(data)
                .message(message)
                .code(code)
                .build();
    }

    /**
     * Crea una respuesta exitosa con datos (sin código)
     */
    public static <T> GlobalResponse<T> okWithData(T data, String message) {
        return okWithData(data, message, null);
    }

    /**
     * Crea una respuesta exitosa con paginación
     */
    public static <T> GlobalResponse<T> okPaginated(
            T data,
            int totalRows,
            int currentPage,
            int pageSize,
            String message,
            String code) {
        
        int totalPages = pageSize > 0 ? (int) Math.ceil((double) totalRows / pageSize) : 0;
        
        return GlobalResponse.<T>builder()
                .success(true)
                .data(data)
                .totalRows(totalRows)
                .currentPage(currentPage)
                .totalPages(totalPages)
                .pageSize(pageSize)
                .message(message)
                .code(code)
                .build();
    }

    /**
     * Crea una respuesta de error
     */
    public static <T> GlobalResponse<T> error(String message, String code) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message)
                .code(code)
                .build();
    }

    /**
     * Crea una respuesta de error con datos
     */
    public static <T> GlobalResponse<T> errorWithData(T data, String message, String code) {
        return GlobalResponse.<T>builder()
                .success(false)
                .data(data)
                .message(message)
                .code(code)
                .build();
    }
}

// Ejemplo de uso en Spring Boot
/*
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public ResponseEntity<GlobalResponse<List<User>>> getUsers() {
        List<User> users = Arrays.asList(
            new User(1, "Juan"),
            new User(2, "María")
        );
        return ResponseEntity.ok(
            GlobalResponse.okWithData(users, "Usuarios obtenidos")
        );
    }

    @GetMapping("/paginated")
    public ResponseEntity<GlobalResponse<List<User>>> getUsersPaginated() {
        List<User> users = IntStream.range(1, 11)
            .mapToObj(i -> new User(i, "User" + i))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(
            GlobalResponse.okPaginated(users, 100, 1, 10, "Usuarios obtenidos", null)
        );
    }
}
*/