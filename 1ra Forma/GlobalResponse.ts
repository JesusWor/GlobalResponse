// Framework: Express.js con TypeScript
// Archivo: GlobalResponse.ts

/**
 * Interfaz para la respuesta estándar de API
 */
export interface IGlobalResponse<T = any> {
    success: boolean;
    message?: string;
    code?: string;
    data?: T;
    totalRows?: number;
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
}

/**
 * Clase para respuestas estándar de API
 */
export class GlobalResponse<T = any> {
    success: boolean = false;
    message: string = '';
    code: string = '';
    data?: T;
    totalRows: number = 0;
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 0;

    /**
     * Crea una respuesta exitosa simple
     */
    static ok(message: string = 'Operación exitosa'): IGlobalResponse<null> {
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
        code: string = ''
    ): IGlobalResponse<T> {
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
        code: string = ''
    ): IGlobalResponse<T> {
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
    static error(message: string, code: string = 'ERROR'): IGlobalResponse<null> {
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
    ): IGlobalResponse<T> {
        return {
            success: false,
            ...(data && { data }),
            message,
            code
        };
    }
}

// Ejemplo de uso en Express con TypeScript
/*
import express, { Request, Response } from 'express';
import { GlobalResponse } from './GlobalResponse';

const app = express();

interface User {
    id: number;
    name: string;
}

app.get('/api/users', (req: Request, res: Response) => {
    const users: User[] = [
        { id: 1, name: 'Juan' },
        { id: 2, name: 'María' }
    ];
    res.json(GlobalResponse.okWithData(users, 'Usuarios obtenidos'));
});

app.get('/api/users/paginated', (req: Request, res: Response) => {
    const users: User[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `User${i + 1}`
    }));
    res.json(GlobalResponse.okPaginated(users, 100, 1, 10));
});
*/