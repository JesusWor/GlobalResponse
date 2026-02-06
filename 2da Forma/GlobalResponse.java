// Framework: Spring Boot
// Archivo: GlobalResponse.java

package com.example.common.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GlobalResponse<T> {
    
    private Boolean success;
    private String message;
    private T data;
    private Object errors;
    private PaginationInfo pagination;

    // Success responses
    public static <T> GlobalResponse<T> ok(String message) {
        return GlobalResponse.<T>builder()
                .success(true)
                .message(message != null ? message : "Operación exitosa")
                .build();
    }

    public static <T> GlobalResponse<T> ok() {
        return ok("Operación exitosa");
    }

    public static <T> GlobalResponse<T> okWithData(T data, String message) {
        return GlobalResponse.<T>builder()
                .success(true)
                .message(message != null ? message : "Operación exitosa")
                .data(data)
                .build();
    }

    public static <T> GlobalResponse<T> okWithData(T data) {
        return okWithData(data, "Operación exitosa");
    }

    public static <T> GlobalResponse<T> okPaginated(
            T data,
            int totalItems,
            int currentPage,
            int pageSize,
            String message
    ) {
        PaginationInfo pagination = PaginationInfo.builder()
                .totalItems(totalItems)
                .currentPage(currentPage)
                .pageSize(pageSize)
                .totalPages((int) Math.ceil((double) totalItems / pageSize))
                .hasPrevious(currentPage > 1)
                .hasNext(currentPage < Math.ceil((double) totalItems / pageSize))
                .build();

        return GlobalResponse.<T>builder()
                .success(true)
                .message(message != null ? message : "Datos obtenidos exitosamente")
                .data(data)
                .pagination(pagination)
                .build();
    }

    public static <T> GlobalResponse<T> okPaginated(
            T data,
            int totalItems,
            int currentPage,
            int pageSize
    ) {
        return okPaginated(data, totalItems, currentPage, pageSize, "Datos obtenidos exitosamente");
    }

    // Error responses
    public static <T> GlobalResponse<T> fail(String message) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message)
                .build();
    }

    public static <T> GlobalResponse<T> failWithErrors(String message, Object errors) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message)
                .errors(errors)
                .build();
    }

    public static <T> GlobalResponse<T> validationError(
            String message,
            Map<String, List<String>> validationErrors
    ) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message)
                .errors(validationErrors)
                .build();
    }

    public static <T> GlobalResponse<T> notFound(String message) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message != null ? message : "Recurso no encontrado")
                .build();
    }

    public static <T> GlobalResponse<T> notFound() {
        return notFound("Recurso no encontrado");
    }

    public static <T> GlobalResponse<T> unauthorized(String message) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message != null ? message : "No autorizado")
                .build();
    }

    public static <T> GlobalResponse<T> unauthorized() {
        return unauthorized("No autorizado");
    }

    public static <T> GlobalResponse<T> serverError(String message) {
        return GlobalResponse.<T>builder()
                .success(false)
                .message(message != null ? message : "Error interno del servidor")
                .build();
    }

    public static <T> GlobalResponse<T> serverError() {
        return serverError("Error interno del servidor");
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaginationInfo {
        private Integer totalItems;
        private Integer currentPage;
        private Integer pageSize;
        private Integer totalPages;
        private Boolean hasPrevious;
        private Boolean hasNext;
    }
} {
    
}
