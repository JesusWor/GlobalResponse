// Framework: Express.js
// Archivo: GlobalResponse.js

/**
 * Clase para respuestas estándar de API
 */
class GlobalResponse {
    constructor() {
        this.success = false;
        this.message = '';
        this.code = '';
        this.data = null;
        this.totalRows = 0;
        this.currentPage = 0;
        this.totalPages = 0;
        this.pageSize = 0;
    }

    /**
     * Crea una respuesta exitosa simple
     */
    static ok(message = 'Operación exitosa') {
        const response = new GlobalResponse();
        response.success = true;
        response.message = message;
        return response.toJSON();
    }

    /**
     * Crea una respuesta exitosa con datos
     */
    static okWithData(data, message = 'Operación exitosa', code = '') {
        const response = new GlobalResponse();
        response.success = true;
        response.data = data;
        response.message = message;
        response.code = code;
        return response.toJSON();
    }

    /**
     * Crea una respuesta exitosa con paginación
     */
    static okPaginated(data, totalRows, currentPage, pageSize, message = 'Operación exitosa', code = '') {
        const response = new GlobalResponse();
        response.success = true;
        response.data = data;
        response.totalRows = totalRows;
        response.currentPage = currentPage;
        response.pageSize = pageSize;
        response.totalPages = pageSize > 0 ? Math.ceil(totalRows / pageSize) : 0;
        response.message = message;
        response.code = code;
        return response.toJSON();
    }

    /**
     * Crea una respuesta de error
     */
    static error(message, code = 'ERROR') {
        const response = new GlobalResponse();
        response.success = false;
        response.message = message;
        response.code = code;
        return response.toJSON();
    }

    /**
     * Crea una respuesta de error con datos
     */
    static errorWithData(data, message, code = 'ERROR') {
        const response = new GlobalResponse();
        response.success = false;
        response.data = data;
        response.message = message;
        response.code = code;
        return response.toJSON();
    }

    /**
     * Convierte a JSON eliminando propiedades vacías
     */
    toJSON() {
        const obj = {};
        Object.keys(this).forEach(key => {
            const value = this[key];
            if (value !== null && value !== '' && value !== 0 && value !== false) {
                obj[key] = value;
            } else if (key === 'success') {
                obj[key] = value;
            }
        });
        return obj;
    }
}

module.exports = GlobalResponse;

// Ejemplo de uso en Express
/*
const express = require('express');
const GlobalResponse = require('./GlobalResponse');

const app = express();

app.get('/api/users', (req, res) => {
    const users = [{ id: 1, name: 'Juan' }, { id: 2, name: 'María' }];
    res.json(GlobalResponse.okWithData(users, 'Usuarios obtenidos'));
});

app.get('/api/users/paginated', (req, res) => {
    const users = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `User${i + 1}` }));
    res.json(GlobalResponse.okPaginated(users, 100, 1, 10));
});

app.use((err, req, res, next) => {
    res.status(500).json(GlobalResponse.error(err.message, 'INTERNAL_ERROR'));
});
*/