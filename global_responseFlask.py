# Framework: Flask
# Archivo: global_response.py

from typing import Generic, TypeVar, Optional, Any
from dataclasses import dataclass, asdict
import math

T = TypeVar('T')

@dataclass
class GlobalResponse(Generic[T]):
    """
    Respuesta estándar para operaciones de API en Flask
    """
    success: bool
    message: str = ""
    code: str = ""
    data: Optional[T] = None
    total_rows: int = 0
    current_page: int = 0
    total_pages: int = 0
    page_size: int = 0

    @staticmethod
    def ok(message: str = "Operación exitosa") -> 'GlobalResponse':
        """Crea una respuesta exitosa simple"""
        return GlobalResponse(
            success=True,
            message=message
        )

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
    def error(message: str, code: str = "ERROR") -> 'GlobalResponse':
        """Crea una respuesta de error"""
        return GlobalResponse(
            success=False,
            message=message,
            code=code
        )

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

    def to_dict(self) -> dict:
        """Convierte la respuesta a diccionario para JSON"""
        result = asdict(self)
        # Eliminar campos vacíos o con valor 0
        return {k: v for k, v in result.items() if v or isinstance(v, bool)}


# Ejemplo de uso en Flask
"""
from flask import Flask, jsonify
from global_response import GlobalResponse

app = Flask(__name__)

@app.route('/api/users')
def get_users():
    users = [{'id': 1, 'name': 'Juan'}, {'id': 2, 'name': 'María'}]
    response = GlobalResponse.ok_with_data(users, "Usuarios obtenidos")
    return jsonify(response.to_dict())

@app.route('/api/users/paginated')
def get_users_paginated():
    users = [{'id': i, 'name': f'User{i}'} for i in range(1, 11)]
    response = GlobalResponse.ok_paginated(
        data=users,
        total_rows=100,
        current_page=1,
        page_size=10
    )
    return jsonify(response.to_dict())
"""