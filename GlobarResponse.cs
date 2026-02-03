// Framework: .NET 6+
// Archivo: GlobalResponse.cs

namespace Common.Models
{
    /// <summary>
    /// Respuesta estándar para operaciones de API
    /// </summary>
    /// <typeparam name="T">Tipo de datos de respuesta</typeparam>
    public class GlobalResponse<T> where T : class
    {
        public bool Success { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public int TotalRows { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }

        // Constructor privado para forzar uso de métodos estáticos
        private GlobalResponse() { }

        /// <summary>
        /// Crea una respuesta exitosa simple
        /// </summary>
        public static GlobalResponse<T> Ok(string message = "Operación exitosa")
        {
            return new GlobalResponse<T>
            {
                Success = true,
                Message = message
            };
        }

        /// <summary>
        /// Crea una respuesta exitosa con datos
        /// </summary>
        public static GlobalResponse<T> Ok(T data, string message = "Operación exitosa", string code = "")
        {
            return new GlobalResponse<T>
            {
                Success = true,
                Data = data,
                Message = message,
                Code = code
            };
        }

        /// <summary>
        /// Crea una respuesta exitosa con paginación
        /// </summary>
        public static GlobalResponse<T> OkPaginated(
            T data, 
            int totalRows, 
            int currentPage, 
            int pageSize,
            string message = "Operación exitosa",
            string code = "")
        {
            return new GlobalResponse<T>
            {
                Success = true,
                Data = data,
                TotalRows = totalRows,
                CurrentPage = currentPage,
                PageSize = pageSize,
                TotalPages = CalculateTotalPages(totalRows, pageSize),
                Message = message,
                Code = code
            };
        }

        /// <summary>
        /// Crea una respuesta de error
        /// </summary>
        public static GlobalResponse<T> Error(string message, string code = "ERROR")
        {
            return new GlobalResponse<T>
            {
                Success = false,
                Message = message,
                Code = code
            };
        }

        /// <summary>
        /// Crea una respuesta de error con datos
        /// </summary>
        public static GlobalResponse<T> Error(T? data, string message, string code = "ERROR")
        {
            return new GlobalResponse<T>
            {
                Success = false,
                Data = data,
                Message = message,
                Code = code
            };
        }

        private static int CalculateTotalPages(int totalRows, int pageSize)
        {
            if (pageSize <= 0) return 0;
            return (int)Math.Ceiling((double)totalRows / pageSize);
        }
    }
}