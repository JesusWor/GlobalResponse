# Framework: Flask
# Archivo: global_response.py

from typing import TypeVar, Generic, Optional, Any, Dict, List
from dataclasses import dataclass, asdict, field
from math import ceil

T = TypeVar('T')

@dataclass
class PaginationInfo:
    total_items: int
    current_page: int
    page_size: int
    total_pages: int = field(init=False)
    has_previous: bool = field(init=False)
    has_next: bool = field(init=False)

    def __post_init__(self):
        self.total_pages = ceil(self.total_items / self.page_size) if self.page_size > 0 else 0
        self.has_previous = self.current_page > 1
        self.has_next = self.current_page < self.total_pages

    def to_dict(self) -> dict:
        return asdict(self)

@dataclass
class GlobalResponse(Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None
    errors: Optional[Any] = None
    pagination: Optional[PaginationInfo] = None

    def to_dict(self) -> dict:
        result = {
            'success': self.success,
            'message': self.message
        }
        if self.data is not None:
            result['data'] = self.data
        if self.errors is not None:
            result['errors'] = self.errors
        if self.pagination is not None:
            result['pagination'] = self.pagination.to_dict()
        return result

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