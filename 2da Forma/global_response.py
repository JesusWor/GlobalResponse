# Framework: FastAPI
# Archivo: global_response.py

from typing import Generic, TypeVar, Optional, Any, Dict, List
from pydantic import BaseModel, Field
from math import ceil

T = TypeVar('T')

class PaginationInfo(BaseModel):
    total_items: int = Field(..., description="Total de registros")
    current_page: int = Field(..., description="Página actual")
    page_size: int = Field(..., description="Tamaño de página")
    total_pages: int = Field(..., description="Total de páginas")
    has_previous: bool = Field(..., description="Tiene página anterior")
    has_next: bool = Field(..., description="Tiene página siguiente")

    def __init__(self, total_items: int, current_page: int, page_size: int, **data):
        total_pages = ceil(total_items / page_size) if page_size > 0 else 0
        super().__init__(
            total_items=total_items,
            current_page=current_page,
            page_size=page_size,
            total_pages=total_pages,
            has_previous=current_page > 1,
            has_next=current_page < total_pages,
            **data
        )

class GlobalResponse(BaseModel, Generic[T]):
    success: bool = Field(..., description="Indica si la operación fue exitosa")
    message: str = Field(..., description="Mensaje descriptivo")
    data: Optional[T] = Field(None, description="Datos de respuesta")
    errors: Optional[Any] = Field(None, description="Errores si los hay")
    pagination: Optional[PaginationInfo] = Field(None, description="Información de paginación")

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Operación exitosa",
                "data": None,
                "errors": None,
                "pagination": None
            }
        }

    # Success responses
    @classmethod
    def ok(cls, message: str = "Operación exitosa") -> "GlobalResponse[T]":
        return cls(success=True, message=message)

    @classmethod
    def ok_with_data(cls, data: T, message: str = "Operación exitosa") -> "GlobalResponse[T]":
        return cls(success=True, message=message, data=data)

    @classmethod
    def ok_paginated(
        cls,
        data: T,
        total_items: int,
        current_page: int,
        page_size: int,
        message: str = "Datos obtenidos exitosamente"
    ) -> "GlobalResponse[T]":
        pagination = PaginationInfo(
            total_items=total_items,
            current_page=current_page,
            page_size=page_size
        )
        return cls(success=True, message=message, data=data, pagination=pagination)

    # Error responses
    @classmethod
    def fail(cls, message: str) -> "GlobalResponse[T]":
        return cls(success=False, message=message)

    @classmethod
    def fail_with_errors(cls, message: str, errors: Any) -> "GlobalResponse[T]":
        return cls(success=False, message=message, errors=errors)

    @classmethod
    def validation_error(
        cls,
        message: str,
        validation_errors: Dict[str, List[str]]
    ) -> "GlobalResponse[T]":
        return cls(success=False, message=message, errors=validation_errors)

    @classmethod
    def not_found(cls, message: str = "Recurso no encontrado") -> "GlobalResponse[T]":
        return cls(success=False, message=message)

    @classmethod
    def unauthorized(cls, message: str = "No autorizado") -> "GlobalResponse[T]":
        return cls(success=False, message=message)

    @classmethod
    def server_error(cls, message: str = "Error interno del servidor") -> "GlobalResponse[T]":
        return cls(success=False, message=message)