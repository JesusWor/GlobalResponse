# Framework: FastAPI
# Archivo: global_response.py

from typing import Generic, TypeVar, Optional
from pydantic import BaseModel, Field
import math

T = TypeVar('T')

class GlobalResponse(BaseModel, Generic[T]):
    """
    Respuesta estándar para operaciones de API en FastAPI
    """
    success: bool
    message: str = ""
    code: str = ""
    data: Optional[T] = None
    total_rows: int = Field(default=0, ge=0)
    current_page: int = Field(default=0, ge=0)
    total_pages: int = Field(default=0, ge=0)
    page_size: int = Field(default=0, ge=0)

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Operación exitosa",
                "data": {"id": 1, "name": "Ejemplo"}
            }
        }

    @staticmethod
    def ok(message: str = "Operación exitosa") -> 'GlobalResponse[None]':
        """Crea una respuesta exitosa simple"""
        return GlobalResponse(success=True, message=message)

    @staticmethod
    def ok_with_data(
        data: T,
        message: str = "Operación exitosa",
        code: str = ""
    ) -> 'GlobalResponse[T]':
        """Crea una respuesta exitosa con datos"""
        return GlobalResponse(
            success=True,
            data=data,
            message=message,
            code=code
        )

    @staticmethod
    def ok_paginated(
        data: T,
        total_rows: int,
        current_page: int,
        page_size: int,
        message: str = "Operación exitosa",
        code: str = ""
    ) -> 'GlobalResponse[T]':
        """Crea una respuesta exitosa con paginación"""
        total_pages = math.ceil(total_rows / page_size) if page_size > 0 else 0
        
        return GlobalResponse(
            success=True,
            data=data,
            total_rows=total_rows,
            current_page=current_page,
            total_pages=total_pages,
            page_size=page_size,
            message=message,
            code=code
        )

    @staticmethod
    def error(message: str, code: str = "ERROR") -> 'GlobalResponse[None]':
        """Crea una respuesta de error"""
        return GlobalResponse(success=False, message=message, code=code)

    @staticmethod
    def error_with_data(
        data: Optional[T],
        message: str,
        code: str = "ERROR"
    ) -> 'GlobalResponse[T]':
        """Crea una respuesta de error con datos"""
        return GlobalResponse(
            success=False,
            data=data,
            message=message,
            code=code
        )


# Ejemplo de uso en FastAPI
"""
from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    id: int
    name: str

@app.get("/api/users", response_model=GlobalResponse[List[User]])
def get_users():
    users = [User(id=1, name="Juan"), User(id=2, name="María")]
    return GlobalResponse.ok_with_data(users, "Usuarios obtenidos")
"""