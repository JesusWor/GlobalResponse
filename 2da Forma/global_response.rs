// Framework: Rust (Actix-web/Rocket/Axum)
// Archivo: global_response.rs

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GlobalResponse<T> {
    pub success: bool,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub errors: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub pagination: Option<PaginationInfo>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaginationInfo {
    pub total_items: i32,
    pub current_page: i32,
    pub page_size: i32,
    pub total_pages: i32,
    pub has_previous: bool,
    pub has_next: bool,
}

impl PaginationInfo {
    pub fn new(total_items: i32, current_page: i32, page_size: i32) -> Self {
        let total_pages = (total_items as f32 / page_size as f32).ceil() as i32;
        Self {
            total_items,
            current_page,
            page_size,
            total_pages,
            has_previous: current_page > 1,
            has_next: current_page < total_pages,
        }
    }
}

impl<T> GlobalResponse<T> {
    // Success responses
    pub fn ok(message: impl Into<String>) -> Self {
        Self {
            success: true,
            message: message.into(),
            data: None,
            errors: None,
            pagination: None,
        }
    }

    pub fn ok_with_data(data: T, message: impl Into<String>) -> Self {
        Self {
            success: true,
            message: message.into(),
            data: Some(data),
            errors: None,
            pagination: None,
        }
    }

    pub fn ok_paginated(
        data: T,
        total_items: i32,
        current_page: i32,
        page_size: i32,
        message: impl Into<String>,
    ) -> Self {
        let pagination = PaginationInfo::new(total_items, current_page, page_size);
        Self {
            success: true,
            message: message.into(),
            data: Some(data),
            errors: None,
            pagination: Some(pagination),
        }
    }

    // Error responses
    pub fn fail(message: impl Into<String>) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: None,
            pagination: None,
        }
    }

    pub fn fail_with_errors(message: impl Into<String>, errors: serde_json::Value) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: Some(errors),
            pagination: None,
        }
    }

    pub fn validation_error(
        message: impl Into<String>,
        validation_errors: HashMap<String, Vec<String>>,
    ) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: Some(serde_json::to_value(validation_errors).unwrap()),
            pagination: None,
        }
    }

    pub fn not_found(message: impl Into<String>) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: None,
            pagination: None,
        }
    }

    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: None,
            pagination: None,
        }
    }

    pub fn server_error(message: impl Into<String>) -> Self {
        Self {
            success: false,
            message: message.into(),
            data: None,
            errors: None,
            pagination: None,
        }
    }
}

// Default implementations
impl<T> Default for GlobalResponse<T> {
    fn default() -> Self {
        Self::ok("Operación exitosa")
    }
}