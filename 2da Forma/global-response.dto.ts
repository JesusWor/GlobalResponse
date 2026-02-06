// Framework: NestJS
// Archivo: global-response.dto.ts

export class GlobalResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: PaginationInfo;

  private constructor(
    success: boolean,
    message: string,
    data?: T,
    errors?: any,
    pagination?: PaginationInfo
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.pagination = pagination;
  }

  // Success responses
  static ok<T>(message: string = 'Operación exitosa'): GlobalResponse<T> {
    return new GlobalResponse<T>(true, message);
  }

  static okWithData<T>(
    data: T,
    message: string = 'Operación exitosa'
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(true, message, data);
  }

  static okPaginated<T>(
    data: T,
    totalItems: number,
    currentPage: number,
    pageSize: number,
    message: string = 'Datos obtenidos exitosamente'
  ): GlobalResponse<T> {
    const pagination = new PaginationInfo(
      totalItems,
      currentPage,
      pageSize
    );
    return new GlobalResponse<T>(true, message, data, undefined, pagination);
  }

  // Error responses
  static fail<T>(message: string): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message);
  }

  static failWithErrors<T>(
    message: string,
    errors: any
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message, undefined, errors);
  }

  static validationError<T>(
    message: string,
    validationErrors: Record<string, string[]>
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message, undefined, validationErrors);
  }

  static notFound<T>(
    message: string = 'Recurso no encontrado'
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message);
  }

  static unauthorized<T>(
    message: string = 'No autorizado'
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message);
  }

  static serverError<T>(
    message: string = 'Error interno del servidor'
  ): GlobalResponse<T> {
    return new GlobalResponse<T>(false, message);
  }
}

export class PaginationInfo {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;

  constructor(totalItems: number, currentPage: number, pageSize: number) {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.hasPrevious = currentPage > 1;
    this.hasNext = currentPage < this.totalPages;
  }
}