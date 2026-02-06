using Common.Models;
using System.Text.Json;

public class EjemplosApiResponse
{
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public static void MostrarEjemplos()
    {
        Console.WriteLine("=== EJEMPLOS DE ApiResponse ===\n");

        // 1. Éxito simple
        Ejemplo1_ExitoSimple();

        // 2. Éxito con datos
        Ejemplo2_ExitoConDatos();

        // 3. Éxito con paginación
        Ejemplo3_ExitoConPaginacion();

        // 4. Error simple
        Ejemplo4_ErrorSimple();

        // 5. Error de validación
        Ejemplo5_ErrorValidacion();

        // 6. Error no encontrado
        Ejemplo6_NoEncontrado();

        // 7. Error no autorizado
        Ejemplo7_NoAutorizado();

        // 8. Error interno del servidor
        Ejemplo8_ErrorServidor();

        // 9. Error con excepción
        Ejemplo9_ErrorExcepcion();
    }

    static void Ejemplo1_ExitoSimple()
    {
        var response = ApiResponse<object>.Ok("Usuario eliminado correctamente");
        
        Console.WriteLine("1️⃣ ÉXITO SIMPLE:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": true,
      "message": "Usuario eliminado correctamente",
      "data": null,
      "errors": null,
      "pagination": null
    }
    */

    static void Ejemplo2_ExitoConDatos()
    {
        var usuario = new { Id = 1, Nombre = "Juan Pérez", Email = "juan@example.com" };
        var response = ApiResponse<object>.Ok(usuario, "Usuario obtenido exitosamente");
        
        Console.WriteLine("2️⃣ ÉXITO CON DATOS:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": true,
      "message": "Usuario obtenido exitosamente",
      "data": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
      },
      "errors": null,
      "pagination": null
    }
    */

    static void Ejemplo3_ExitoConPaginacion()
    {
        var productos = new[]
        {
            new { Id = 1, Nombre = "Laptop", Precio = 1200 },
            new { Id = 2, Nombre = "Mouse", Precio = 25 },
            new { Id = 3, Nombre = "Teclado", Precio = 75 }
        };

        var response = ApiResponse<object>.OkPaginated(
            productos,
            totalItems: 50,
            currentPage: 2,
            pageSize: 3
        );
        
        Console.WriteLine("3️⃣ ÉXITO CON PAGINACIÓN:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": true,
      "message": "Datos obtenidos exitosamente",
      "data": [
        { "id": 1, "nombre": "Laptop", "precio": 1200 },
        { "id": 2, "nombre": "Mouse", "precio": 25 },
        { "id": 3, "nombre": "Teclado", "precio": 75 }
      ],
      "errors": null,
      "pagination": {
        "totalItems": 50,
        "currentPage": 2,
        "pageSize": 3,
        "totalPages": 17,
        "hasPrevious": true,
        "hasNext": true
      }
    }
    */

    static void Ejemplo4_ErrorSimple()
    {
        var response = ApiResponse<object>.Fail("No se pudo completar la operación");
        
        Console.WriteLine("4️⃣ ERROR SIMPLE:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": false,
      "message": "No se pudo completar la operación",
      "data": null,
      "errors": null,
      "pagination": null
    }
    */

    static void Ejemplo5_ErrorValidacion()
    {
        var validationErrors = new Dictionary<string, string[]>
        {
            { "Email", new[] { "El formato del email es inválido" } },
            { "Password", new[] { "La contraseña debe tener al menos 8 caracteres", "Debe incluir un número" } },
            { "Telefono", new[] { "El teléfono es requerido" } }
        };

        var response = ApiResponse<object>.ValidationError(
            "Errores de validación en el formulario",
            validationErrors
        );
        
        Console.WriteLine("5️⃣ ERROR DE VALIDACIÓN:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": false,
      "message": "Errores de validación en el formulario",
      "data": null,
      "errors": {
        "Email": ["El formato del email es inválido"],
        "Password": [
          "La contraseña debe tener al menos 8 caracteres",
          "Debe incluir un número"
        ],
        "Telefono": ["El teléfono es requerido"]
      },
      "pagination": null
    }
    */

    static void Ejemplo6_NoEncontrado()
    {
        var response = ApiResponse<object>.NotFound("Usuario con ID 999 no encontrado");
        
        Console.WriteLine("6️⃣ ERROR NO ENCONTRADO:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": false,
      "message": "Usuario con ID 999 no encontrado",
      "data": null,
      "errors": null,
      "pagination": null
    }
    */

    static void Ejemplo7_NoAutorizado()
    {
        var response = ApiResponse<object>.Unauthorized("Token de autenticación inválido o expirado");
        
        Console.WriteLine("7️⃣ ERROR NO AUTORIZADO:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": false,
      "message": "Token de autenticación inválido o expirado",
      "data": null,
      "errors": null,
      "pagination": null
    }
    */

    static void Ejemplo8_ErrorServidor()
    {
        var errorDetails = new
        {
            Code = "DB_CONNECTION_FAILED",
            Detail = "No se pudo conectar a la base de datos"
        };

        var response = ApiResponse<object>.Fail(
            "Error interno del servidor",
            errorDetails
        );
        
        Console.WriteLine("8️⃣ ERROR DEL SERVIDOR:");
        Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
        Console.WriteLine("\n" + new string('-', 80) + "\n");
    }
    /* SALIDA:
    {
      "success": false,
      "message": "Error interno del servidor",
      "data": null,
      "errors": {
        "code": "DB_CONNECTION_FAILED",
        "detail": "No se pudo conectar a la base de datos"
      },
      "pagination": null
    }
    */

    static void Ejemplo9_ErrorExcepcion()
    {
        try
        {
            throw new InvalidOperationException("Operación no válida en el estado actual");
        }
        catch (Exception ex)
        {
            var response = ApiResponse<object>.Exception(ex, includeStackTrace: false);
            
            Console.WriteLine("9️⃣ ERROR CON EXCEPCIÓN:");
            Console.WriteLine(JsonSerializer.Serialize(response, _jsonOptions));
            Console.WriteLine("\n" + new string('-', 80) + "\n");
        }
    }
    /* SALIDA:
    {
      "success": false,
      "message": "Se produjo un error inesperado",
      "data": null,
      "errors": {
        "type": "InvalidOperationException",
        "message": "Operación no válida en el estado actual"
      },
      "pagination": null
    }
    */
}