// Framework: Axum (Rust)
// Archivo: src/models/global_response.rs

use serde::{Deserialize, Serialize};
use std::fmt;

/// Respuesta estándar para operaciones de API en Rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GlobalResponse<T>
where
    T: Serialize,
{
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub message: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub code: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub total_rows: Option<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub current_page: Option<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub total_pages: Option<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub page_size: Option<usize>,
}

impl<T> GlobalResponse<T>
where
    T: Serialize,
{
    /// Crea una respuesta exitosa simple
    /// 
    /// # Ejemplo
    /// ```
    /// let response: GlobalResponse<()> = GlobalResponse::ok("Operación exitosa");
    /// ```
    pub fn ok(message: impl Into<String>) -> Self {
        Self {
            success: true,
            message: Some(message.into()),
            code: None,
            data: None,
            total_rows: None,
            current_page: None,
            total_pages: None,
            page_size: None,
        }
    }

    /// Crea una respuesta exitosa con datos
    /// 
    /// # Ejemplo
    /// ```
    /// let user = User { id: 1, name: "Juan".to_string() };
    /// let response = GlobalResponse::ok_with_data(
    ///     user,
    ///     "Usuario obtenido",
    ///     None::<String>
    /// );
    /// ```
    pub fn ok_with_data(
        data: T,
        message: impl Into<String>,
        code: Option<impl Into<String>>,
    ) -> Self {
        Self {
            success: true,
            message: Some(message.into()),
            code: code.map(|c| c.into()),
            data: Some(data),
            total_rows: None,
            current_page: None,
            total_pages: None,
            page_size: None,
        }
    }

    /// Crea una respuesta exitosa con paginación
    /// 
    /// # Ejemplo
    /// ```
    /// let users = vec![user1, user2];
    /// let response = GlobalResponse::ok_paginated(
    ///     users,
    ///     100,  // total_rows
    ///     1,    // current_page
    ///     10,   // page_size
    ///     "Usuarios obtenidos",
    ///     None::<String>
    /// );
    /// ```
    pub fn ok_paginated(
        data: T,
        total_rows: usize,
        current_page: usize,
        page_size: usize,
        message: impl Into<String>,
        code: Option<impl Into<String>>,
    ) -> Self {
        let total_pages = if page_size > 0 {
            (total_rows as f64 / page_size as f64).ceil() as usize
        } else {
            0
        };

        Self {
            success: true,
            message: Some(message.into()),
            code: code.map(|c| c.into()),
            data: Some(data),
            total_rows: Some(total_rows),
            current_page: Some(current_page),
            total_pages: Some(total_pages),
            page_size: Some(page_size),
        }
    }

    /// Crea una respuesta de error
    /// 
    /// # Ejemplo
    /// ```
    /// let response: GlobalResponse<()> = GlobalResponse::error(
    ///     "Usuario no encontrado",
    ///     "NOT_FOUND"
    /// );
    /// ```
    pub fn error(message: impl Into<String>, code: impl Into<String>) -> Self {
        Self {
            success: false,
            message: Some(message.into()),
            code: Some(code.into()),
            data: None,
            total_rows: None,
            current_page: None,
            total_pages: None,
            page_size: None,
        }
    }

    /// Crea una respuesta de error con datos
    /// 
    /// # Ejemplo
    /// ```
    /// let error_details = ErrorDetails { field: "email".to_string() };
    /// let response = GlobalResponse::error_with_data(
    ///     Some(error_details),
    ///     "Validación fallida",
    ///     "VALIDATION_ERROR"
    /// );
    /// ```
    pub fn error_with_data(
        data: Option<T>,
        message: impl Into<String>,
        code: impl Into<String>,
    ) -> Self {
        Self {
            success: false,
            message: Some(message.into()),
            code: Some(code.into()),
            data,
            total_rows: None,
            current_page: None,
            total_pages: None,
            page_size: None,
        }
    }
}

impl<T> fmt::Display for GlobalResponse<T>
where
    T: Serialize,
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "GlobalResponse {{ success: {}, message: {:?} }}",
            self.success, self.message
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json;

    #[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
    struct TestUser {
        id: u32,
        name: String,
    }

    #[test]
    fn test_ok_response() {
        let response: GlobalResponse<()> = GlobalResponse::ok("Operación exitosa");
        assert!(response.success);
        assert_eq!(response.message, Some("Operación exitosa".to_string()));
        assert!(response.data.is_none());
    }

    #[test]
    fn test_ok_with_data() {
        let user = TestUser {
            id: 1,
            name: "Juan".to_string(),
        };
        let response = GlobalResponse::ok_with_data(
            user.clone(),
            "Usuario obtenido",
            None::<String>,
        );

        assert!(response.success);
        assert_eq!(response.data, Some(user));
    }

    #[test]
    fn test_ok_paginated() {
        let users = vec![
            TestUser { id: 1, name: "Juan".to_string() },
            TestUser { id: 2, name: "María".to_string() },
        ];

        let response = GlobalResponse::ok_paginated(
            users,
            100,
            1,
            10,
            "Usuarios obtenidos",
            None::<String>,
        );

        assert!(response.success);
        assert_eq!(response.total_rows, Some(100));
        assert_eq!(response.current_page, Some(1));
        assert_eq!(response.page_size, Some(10));
        assert_eq!(response.total_pages, Some(10));
    }

    #[test]
    fn test_error_response() {
        let response: GlobalResponse<()> = GlobalResponse::error(
            "Usuario no encontrado",
            "NOT_FOUND",
        );

        assert!(!response.success);
        assert_eq!(response.message, Some("Usuario no encontrado".to_string()));
        assert_eq!(response.code, Some("NOT_FOUND".to_string()));
    }

    #[test]
    fn test_serialization() {
        let user = TestUser {
            id: 1,
            name: "Juan".to_string(),
        };
        let response = GlobalResponse::ok_with_data(
            user,
            "Usuario obtenido",
            Some("SUCCESS"),
        );

        let json = serde_json::to_string(&response).unwrap();
        assert!(json.contains("\"success\":true"));
        assert!(json.contains("\"name\":\"Juan\""));
    }

    #[test]
    fn test_pagination_calculation() {
        let users = vec![TestUser { id: 1, name: "Test".to_string() }];
        
        // 100 items, 10 per page = 10 pages
        let response = GlobalResponse::ok_paginated(
            users.clone(),
            100,
            1,
            10,
            "Test",
            None::<String>,
        );
        assert_eq!(response.total_pages, Some(10));

        // 95 items, 10 per page = 10 pages (ceiling)
        let response = GlobalResponse::ok_paginated(
            users.clone(),
            95,
            1,
            10,
            "Test",
            None::<String>,
        );
        assert_eq!(response.total_pages, Some(10));

        // 0 page size = 0 pages
        let response = GlobalResponse::ok_paginated(
            users,
            100,
            1,
            0,
            "Test",
            None::<String>,
        );
        assert_eq!(response.total_pages, Some(0));
    }

    #[test]
    fn test_skip_serializing_none() {
        let response: GlobalResponse<()> = GlobalResponse::ok("Test");
        let json = serde_json::to_string(&response).unwrap();
        
        // Los campos None no deben aparecer en el JSON
        assert!(!json.contains("total_rows"));
        assert!(!json.contains("current_page"));
        assert!(!json.contains("data"));
    }
}