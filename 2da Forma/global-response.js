// Framework: Express.js / Node.js
// Archivo: global-response.js

class PaginationInfo {
  constructor(totalItems, currentPage, pageSize) {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.hasPrevious = currentPage > 1;
    this.hasNext = currentPage < this.totalPages;
  }
}

class GlobalResponse {
  constructor(success, message, data = null, errors = null, pagination = null) {
    this.success = success;
    this.message = message;
    if (data !== null) this.data = data;
    if (errors !== null) this.errors = errors;
    if (pagination !== null) this.pagination = pagination;
  }

  // Success responses
  static ok(message = 'Operación exitosa') {
    return new GlobalResponse(true, message);
  }

  static okWithData(data, message = 'Operación exitosa') {
    return new GlobalResponse(true, message, data);
  }

  static okPaginated(
    data,
    totalItems,
    currentPage,
    pageSize,
    message = 'Datos obtenidos exitosamente'
  ) {
    const pagination = new PaginationInfo(totalItems, currentPage, pageSize);
    return new GlobalResponse(true, message, data, null, pagination);
  }

  // Error responses
  static fail(message) {
    return new GlobalResponse(false, message);
  }

  static failWithErrors(message, errors) {
    return new GlobalResponse(false, message, null, errors);
  }

  static validationError(message, validationErrors) {
    return new GlobalResponse(false, message, null, validationErrors);
  }

  static notFound(message = 'Recurso no encontrado') {
    return new GlobalResponse(false, message);
  }

  static unauthorized(message = 'No autorizado') {
    return new GlobalResponse(false, message);
  }

  static serverError(message = 'Error interno del servidor') {
    return new GlobalResponse(false, message);
  }
}

module.exports = { GlobalResponse, PaginationInfo };