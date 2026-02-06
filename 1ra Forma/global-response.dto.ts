// Framework: NestJS
// Archivo: global-response.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para respuesta estándar de API en NestJS
 */
export class GlobalResponseDto<T> {
    @ApiProperty({ description: 'Indica si la operación fue exitosa' })
    success: boolean;

    @ApiPropertyOptional({ description: 'Mensaje descriptivo de la respuesta' })
    message?: string;

    @ApiPropertyOptional({ description: 'Código de respuesta personalizado' })
    code?: string;

    @ApiPropertyOptional({ description: 'Datos de la respuesta' })
    data?: T;

    @ApiPropertyOptional({ description: 'Total de registros' })
    totalRows?: number;

    @ApiPropertyOptional({ description: 'Página actual' })
    currentPage?: number;

    @ApiPropertyOptional({ description: 'Total de páginas' })
    totalPages?: number;

    @ApiPropertyOptional({ description: 'Tamaño de página' })
    pageSize?: number;

    /**
     * Crea una respuesta exitosa simple
     */
    static ok(message: string = 'Operación exitosa'): GlobalResponseDto<null> {
        return {
            success: true,
            message
        };
    }

    /**
     * Crea una respuesta exitosa con datos
     */
    static okWithData<T>(
        data: T,
        message: string = 'Operación exitosa',
        code?: string
    ): GlobalResponseDto<T> {
        return {
            success: true,
            data,
            message,
            ...(code && { code })
        };
    }

    /**
     * Crea una respuesta exitosa con paginación
     */
    static okPaginated<T>(
        data: T,
        totalRows: number,
        currentPage: number,
        pageSize: number,
        message: string = 'Operación exitosa',
        code?: string
    ): GlobalResponseDto<T> {
        const totalPages = pageSize > 0 ? Math.ceil(totalRows / pageSize) : 0;
        
        return {
            success: true,
            data,
            totalRows,
            currentPage,
            totalPages,
            pageSize,
            message,
            ...(code && { code })
        };
    }

    /**
     * Crea una respuesta de error
     */
    static error(message: string, code: string = 'ERROR'): GlobalResponseDto<null> {
        return {
            success: false,
            message,
            code
        };
    }

    /**
     * Crea una respuesta de error con datos
     */
    static errorWithData<T>(
        data: T | null,
        message: string,
        code: string = 'ERROR'
    ): GlobalResponseDto<T> {
        return {
            success: false,
            ...(data && { data }),
            message,
            code
        };
    }
}

// Ejemplo de uso en NestJS
/*
import { Controller, Get } from '@nestjs/common';
import { GlobalResponseDto } from './global-response.dto';

interface User {
    id: number;
    name: string;
}

@Controller('users')
export class UsersController {
    @Get()
    findAll(): GlobalResponseDto<User[]> {
        const users: User[] = [
            { id: 1, name: 'Juan' },
            { id: 2, name: 'María' }
        ];
        return GlobalResponseDto.okWithData(users, 'Usuarios obtenidos');
    }

    @Get('paginated')
    findPaginated(): GlobalResponseDto<User[]> {
        const users: User[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `User${i + 1}`
        }));
        return GlobalResponseDto.okPaginated(users, 100, 1, 10);
    }
}
*/